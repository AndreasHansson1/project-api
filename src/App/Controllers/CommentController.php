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

    public function add($comment)
    {
        $addComment = $this->db->prepare(
            'INSERT INTO comments 
            (content, createdAt)
            VALUES (:content, :createdAt)'
        );

        $addComment->execute([
            ':content' => $comment['content'],
            ':createdAt' => $comment['createdAt']
            ]);

        return [
          'userID'    => (int)$this->db->lastInsertId(),
          'content'   => $comment['content'],
          'createdAt' => $comment['createdAt']
        ];
    }

   



    

}
