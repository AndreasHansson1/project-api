<?php

namespace App\Controllers;

class EntryController
{
    private $db;

    public function __construct(\PDO $pdo)
    {
        $this->db = $pdo;
    }

    public function getAll()
    {
        $getAll = $this->db->prepare('SELECT * FROM entries');
        $getAll->execute();
        return $getAll->fetchAll();
    }

    public function getOne($entryID)
    {
        $getOne = $this->db->prepare('SELECT * FROM entries WHERE entryID = :entryID');
        $getOne->execute([':entryID' => $entryID]);
        return $getOne->fetch();
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

    // Get the 20 latest entries
    public function getTwenty()
    {
        $getTwenty = $this->db->prepare (
           'SELECT * FROM entries  
            ORDER BY entryID DESC
            LIMIT 20');

        $getTwenty->execute();
        return $getTwenty->fetchAll();
    }

    // Delete entry
    public function deleteEntry($entryID)
    {
        $deleteEntry = $this->db->prepare('DELETE FROM entries WHERE entryID = :entryID');
        $deleteEntry->execute([':entryID' => $entryID]);
    }

    // Search for entry
     public function searchEntry()
     {
        $search = $this->db->prepare(
           'SELECT * FROM entries 
            WHERE UPPER(title) 
            LIKE :query ORDER BY title');

        $query = "%".$args['query']."%";
        $search->bindParam("query", $query);
        $search->execute();
        return $search->fetchAll();
    }



    

}
