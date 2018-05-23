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
        $hashed = password_hash($_POST["password"], PASSWORD_DEFAULT); 
        $addOne->execute([
                    ':username'  => $user['username'],
                    ':password'  => $hashed,
                    ':createdAt' => $user['createdAt']
                    ]);

        return [
          'userID'       => (int)$this->db->lastInsertId(),
          'username'     => $user['username'],
          'completed'    => false
        ];
    }

    public function login() {
        if (password_verify($_POST["password"], $user["password"])) {
            // Empty fields in form not allowed
            if(isset($_POST["username"]) && $_POST["password"]!=""){
            // Redirect to welcome page on sucessfull login
            header('Location: views/index.php');
            } else {
                echo 'No empty fields allowed!';
            }
            // We must also store information in the session that we can
            // check in the other files 'index.php' for example
            $_SESSION["loggedIn"] = true;
            $_SESSION["username"] = $user["username"];
            $_SESSION["userID"] = $user["userID"];
            
        } else {
            echo 'Error';
        }

    }


}
