<?php
namespace App\Controllers;
session_start();

class EntryController
{
    private $db;

    public function __construct(\PDO $pdo)
    {
        $this->db = $pdo;
    }

    public function getAll($limit)
    {
        $getAll = $this->db->prepare('SELECT * FROM entries LIMIT :entriesLimit');
        $getAll->bindParam(':entriesLimit', $limit , \PDO::PARAM_INT);
        $getAll->execute();
        return $getAll->fetchAll();
    }

    public function getOne($entryID)
    {
        $getOne = $this->db->prepare('SELECT * FROM entries WHERE entryID = :entryID');
        $getOne->execute([':entryID' => $entryID]);
        return $getOne->fetch();
    }

    // Add new entry. Use session later to use the right userID I guess?
    public function add($entry)
    {
        // $userID = $_SESSION['userID'];

        $addEntry = $this->db->prepare(
            'INSERT INTO entries 
            (title, content, createdBy)
            VALUES (:title, :content, :createdBy)'
        );

        $addEntry->execute([
            ':title'        => $entry['title'],
            ':content'      => $entry['content'],
            ':createdBy'    => $entry['createdBy']
            ]);

        return [
          'createdBy'    => (int)$this->db->lastInsertId(),
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
     public function searchEntry($search)
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

    // Edit Entry
    public function editEntry($edit)
    {

        $editEntry = $this->db->prepare(
            'UPDATE entries 
    --    SET entryID     = :entryID,
          SET   title  = :title, 
             content   = :content  
       WHERE entryID   = :entryID'
        );

        $editEntry->bindParam(':title', $title);
        $editEntry->bindParam(':content', $content);

        $editEntry->execute([
            // ':entryID' => $_GET['entryID'],
            // ':entryID' => $edit['entryID'],
            ':title'   => $edit['title'],
            ':content' => $edit['content']
            ]);

        return [
          'entryID'   => (int)$this->db->lastInsertId(),
          'title'     => $edit['title'],
          'content'   => $edit['content']
        ];

    }
}
