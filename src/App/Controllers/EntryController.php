<?php

namespace App\Controllers;

class EntryController
{
    private $db;

    /**
     * Dependeny Injection (DI): http://www.phptherightway.com/#dependency_injection
     * If this class relies on a database-connection via PDO we inject that connection
     * into the class at start. If we do this TodoController will be able to easily
     * reference the PDO with '$this->db' in ALL functions INSIDE the class
     * This class is later being injected into our container inside of 'App/container.php'
     * This results in we being able to call '$this->get('Todos')' to call this class
     * inside of our routes.
     */
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
        /**
         * Default 'completed' is false so we only need to insert the 'content'
         */
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

    // Get the 20:th latest entries
    public function getTwenty()
    {
        $getTwenty = $this->db->prepare (
           'SELECT * FROM entries  
            ORDER BY entryID DESC
            LIMIT 20
           ');
        $getAll->execute();
        return $getAll->fetchAll();
    }

    // Delete entry
    public function deleteEntry($entryID)
    {
        $deleteEntry = $this->db->prepare('DELETE FROM entries WHERE entryID = :entryID');
        $deleteEntry->execute([':entryID' => $entryID]);
    }



    

}
