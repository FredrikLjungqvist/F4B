<?php
require ("../repositories/loginRepository.php");
session_start();
if($_SERVER["REQUEST_METHOD"] == "POST") {
    
            if(isset($_POST["usernameToSave"]) && isset($_POST["passwordToSave"])) {
                $password = $_POST["passwordToSave"];
                $password_hash = password_hash($password, PASSWORD_DEFAULT);
                $userinfo = [
                    "name"=>$_POST["usernameToSave"],
                    "password"=> password_hash($_POST["passwordToSave"], PASSWORD_DEFAULT),
                    "isAdmin"=>1
                ];

                echo json_encode(addUser($userinfo));
                
                exit;
            
            }elseif (isset($_POST["username"]) && isset($_POST["password"])) {
                $user = $_POST["username"];
                $pass = $_POST["password"];
                echo json_encode(loginUser($user, $pass));
                exit;
            }
            
    }

if($_SERVER["REQUEST_METHOD"] == "GET"){
    if($_GET["action"] == "logout"){
        
        
        $_SESSION = array();
        session_destroy();
        echo json_encode("");
        exit;
    } elseif ($_GET["action"] == "loginCheck") {
        
        if(isset($_SESSION["loggedin"]))
        {
           
            $response = $_SESSION;
            echo json_encode($response);
            exit;
        }else{
            echo json_encode("finns ingen");
            exit;
        }
    }
     
}

?>