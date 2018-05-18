<?php

namespace App\Controllers;

class CommentController
{
    private $db;

    public function __construct(\PDO $pdo)
    {
        $this->db = $pdo;
    }

     // Get the 20 latest comments
    public function getTwenty()
    {
        $getTwenty = $this->db->prepare (
           'SELECT * FROM comments  
            ORDER BY commentID DESC
            LIMIT :commentsLimit
           ');
        $getTwenty->bindParam(':commentsLimit', $limit , \PDO::PARAM_INT);
        $getTwenty->execute();
        return $getTwenty->fetchAll();
    }

    // Get one comment
    public function getOne($commentID)
    {
        $getOne = $this->db->prepare('SELECT * FROM comments WHERE commentID = :commentID');
        $getOne->execute([':commentID' => $commentID]);
        return $getOne->fetch();
    }

     // Delete comment
    public function deleteComment($commentID)
    {
        $deleteComment = $this->db->prepare('DELETE FROM comments WHERE commentID = :commentID');
        $deleteComment->execute([':commentID' => $commentID]);
    }

    public function add($entry)
    {
        
        $addEntry = $this->db->prepare(
            'INSERT INTO entries 
            (title, content, userID)
            VALUES (:title, :content, :userID)'
        );

        /**
         * Insert the value from the parameter into the database
         */
        $addEntry->execute([
            ':title'   => $_POST['title'],
            ':content' => $_POST['content'],
            ':userID'  => $_POST['userID']
            ]);

        /**
         * A INSERT INTO does not return the created object. If we want to return it to the user
         * that has posted the todo we must build it ourself or fetch it after we have inserted it
         * We can always get the last inserted row in a database by calling 'lastInsertId()'-function
         */
        return [
          'userID'    => (int)$this->db->lastInsertId(),
          'title'     => $entry['title'],
          'content'   => $entry['content']
        ];
    }

   



    

}
