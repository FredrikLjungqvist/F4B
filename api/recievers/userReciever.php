<?php
require ("../repositories/loginRepository.php");
if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($_POST["usernameToSave"] && $_POST["passwordToSave"]) {
                $password =  password_hash($password, PASSWORD_DEFAULT);
                $userinfo = [
                    "name"=>$_POST["usernameToSave"],
                    "password"=> password_hash($_POST["passwordToSave"], PASSWORD_DEFAULT)
                ];

                var_dump(addUser($userinfo));
                
                exit;
            
            }else if ($_POST["username"] && $_POST["password"]) {
               $user = loginUser($_POST["username"]);
                print_r($user);
            }
            
    }

?>