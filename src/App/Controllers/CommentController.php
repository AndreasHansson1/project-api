<?php
namespace App\Controllers;
if (session_status() == PHP_SESSION_NONE) {
    session_set_cookie_params(3600);
    session_start();
}

//namespace App\Controllers;

class CommentController
{
    private $db;

    public function __construct(\PDO $pdo)
    {
        $this->db = $pdo;
    }

     // Get the 20 latest comments
    public function getTwenty($limit)
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

    public function addComment($comment)
    {
        $addComment = $this->db->prepare(
            'INSERT INTO comments 
            (content, createdAt, entryID, createdBy)
            VALUES (:content, :createdAt, :entryID, :createdBy)'
        );
        $userID = 13;
        $addComment->execute([
            ':content' => $comment['content'],
            ':createdAt' => $comment['createdAt'],
            ':entryID' => $comment['entryID'],
            // ':createdBy' => $_SESSION['userID'],
            ':createdBy' => $userID
            ]);

        return [
          'userID'    => (int)$this->db->lastInsertId(),
          'content'   => $comment['content'],
          'createdAt' => $comment['createdAt']
        ];
    }

    public function allCommentsByEntryID($id)
    {
        $allCommentsByEntryID = $this->db->prepare(
        "SELECT comments.content
        FROM comments
        INNER JOIN entries ON entries.entryID = comments.entryID
        WHERE entries.entryID = :entryID");
        $allCommentsByEntryID->execute([
          ":entryID" => $id
        ]);
        $allCommentsByEntry = $allCommentsByEntryID->fetchAll();
        return $allCommentsByEntry;
    }

   



    

}
