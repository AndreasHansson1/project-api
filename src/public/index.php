<?php
if (session_status() == PHP_SESSION_NONE) {
    session_set_cookie_params(3600);
    session_start();
}

/**
 * Require the autoload script, this will automatically load our classes
 * so we don't have to require a class everytime we use a class. Evertime
 * you create a new class, remember to runt 'composer update' in the terminal
 * otherwise your classes may not be recognized.
 */
require_once '../../vendor/autoload.php';

/**
 * Here we are creating the app that will handle all the routes. We are storing
 * our database config inside of 'settings'. This config is later used inside of
 * the container inside 'App/container.php'
 */

$container = require '../App/container.php';
$app = new \Slim\App($container);
$auth = require '../App/auth.php';
require '../App/cors.php';


/********************************
 *          ROUTES              *
 ********************************/


$app->get('/', function ($request, $response, $args) {
    /**
     * This fetches the 'index.php'-file inside the 'views'-folder
     */
    return $this->view->render($response, 'index.php');
});

// ADD NEW USER
$app->post('/register', function ($request, $response, $args) {
       
    $body = $request->getParsedBody();
    $newUser = $this->users->add($body);
    return $response->withJson($newUser);
});


$app->post('/login', function ($request, $response, $args) {
   
   $body = $request->getParsedBody();
   $fetchUserStatement = $this->db->prepare('SELECT * FROM users WHERE username = :username');
   $fetchUserStatement->execute([
       ':username' => $body['username']
   ]);
   $user = $fetchUserStatement->fetch();
   if (password_verify($body['password'], $user['password'])) {
       $_SESSION['loggedIn'] = true;
       $_SESSION['userID'] = $user['id'];
       return $response->withJson([ $user['id'], $user['username'] ]);
   }
   return $response->withJson(['error' => 'wrong password']);
});

/**
 * Basic implementation, implement a better response
 */
$app->get('/logout', function ($request, $response, $args) {
    session_destroy();
    return $response->withJson('Success');
});


/**
 * The group is used to group everything connected to the API under '/api'
 * This was done so that we can check if the user is authed when calling '/api'
 * but we don't have to check for auth when calling '/signin'
 */
$app->group('/api', function () use ($app) {

    // GET ALL USERS -- localhost:3000/api/users
    $app->get('/users', function ($request, $response, $args) {
        $allUsers = $this->users->getAll();
        return $response->withJson($allUsers);
    });

    // GET ALL ENTRIES -- localhost:3000/api/entries
    $app->get('/entries', function ($request, $response, $args) {
        $params = $request->getQueryParams();
        $limit = (int) $params["limit"];
        $allEntries = $this->entries->getAll($limit);
  
        return $response->withJson($allEntries);
    });

    // GET SINGLE USER
    $app->get('/users/{userID}', function ($request, $response, $args) {
        $userID = $args['userID'];
        $singleUser = $this->users->getOne($userID);
        return $response->withJson($singleUser);
    });

     // GET SINGLE ENTRY
    $app->get('/entries/{entryID}', function ($request, $response, $args) {
        $entryID = $args['entryID'];
        $singleEntry = $this->entries->getOne($entryID);
        return $response->withJson($singleEntry);
    });

    // POST ENTRY
    $app->post('/entries', function ($request, $response, $args) { 
       
        $body = $request->getParsedBody();
        $newEntry = $this->entries->add($body);
        return $response->withJson($newEntry);
    });

    // GET 20 LATEST ENTRIES
    $app->get('/twenty', function ($request, $response, $args) {
        $twentyEntries = $this->entries->getTwenty();
        return $response->withJson($twentyEntries);
    });

    // DELETE ENTRY
    $app->delete('/entries/{entryID}', function ($request, $response, $args) {
        $entryID = $args['entryID'];
        $this->entries->deleteEntry($entryID);
        echo 'Deleted Entry';
    });

    // SEARCH FOR ENTRY
    $app->get('/entries/search/{query}', function ($request, $response, $args) {
        $search = $args['query'];
        $searchEntry = $this->entries->searchEntry($search);
        return $response->withJson($searchEntry);
    });

    // GET 20 LATEST COMMENTS
    $app->get('/comments', function ($request, $response, $args) {
        $params = $request->getQueryParams();
        $limit = (int) $params["limit"];
        $twentyComments = $this->comments->getTwenty($limit);
        return $response->withJson($twentyComments);
    });

     // GET SINGLE COMMENT
    $app->get('/comments/{commentID}', function ($request, $response, $args) {
        $commentID = $args['commentID'];
        $singleComment = $this->comments->getOne($commentID);
        return $response->withJson($singleComment);
    });

     // DELETE COMMENT
    $app->delete('/comments/{commentID}', function ($request, $response, $args) {
        $commentID = $args['commentID'];
        $this->comments->deleteComment($commentID);
        echo 'Deleted Comment';
    });

    // EDIT ENTRY
    $app->patch('/entries/edit/{entryID}', function ($request, $response, $args) {
        $entryID = $args['entryID'];
        $title = $request->getParam('title');
        $content = $request->getParam('content'); 
        $body = $request->getParsedBody();
        $editEntry = $this->entries->editEntry($body, $entryID);
        return $response->withJson($editEntry);
    });

    // POST COMMENT
    $app->post('/comments', function ($request, $response, $args) { 
        
        $body = $request->getParsedBody();
        $newComment = $this->comments->addComment($body);
        return $response->withJson($newComment);
    });

    // GET ALL ENTRIES FROM A USER
    $app->get('/users/{id}/entries', function ($request, $response, $args) {
    $allEntriesByUser = $this->entries->allEntriesByUserID($args['id']);
    return $response->withJson($allEntriesByUser);
    });

    // GET ALL COMMENTS ATTACHED TO AN ENTRY
    $app->get('/entries/{id}/comments', function ($request, $response, $args) {
    $allCommentsByEntry = $this->comments->allCommentsByEntryID($args['id']);
    return $response->withJson($allCommentsByEntry);
    });

});
// add($auth);

$app->run();
