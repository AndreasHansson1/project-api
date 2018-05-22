<?php

namespace App\Controllers;

class UserController
{
    private $db;

    public function __construct(\PDO $pdo)
    {
        $this->db = $pdo;
    }

    public function getAll()
    {
        $getAll = $this->db->prepare('SELECT * FROM users');
        $getAll->execute();
        return $getAll->fetchAll();
    }

    public function getOne($userID)
    {
        $getOne = $this->db->prepare('SELECT * FROM users WHERE userID = :userID');
        $getOne->execute([':userID' => $userID]);
        return $getOne->fetch();
    }

    public function add($user)
    {
        
        $addOne = $this->db->prepare(
            'INSERT INTO users (username, password, createdAt) VALUES (:username, :password, :createdAt)'
        );

        $addOne->execute([
                    ':username'  => $user['username'],
                    ':password'  => $user['password'],
                    ':createdAt'  => $user['createdAt']
                    ]);

        return [
          'userID'          => (int)$this->db->lastInsertId(),
          'username'     => $user['username'],
          'completed'   => false
        ];
    }
}
