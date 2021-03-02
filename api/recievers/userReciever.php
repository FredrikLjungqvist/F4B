<?php
require ("../repositories/loginRepository.php");
session_start();
if($_SERVER["REQUEST_METHOD"] == "POST") {
    
            if(isset($_POST["userCreation"])) {
                
                $userinfo = json_decode($_POST["userCreation"], true);
                $userinfo["password"] = password_hash($userinfo["password"], PASSWORD_DEFAULT);
                echo json_encode(adduser($userinfo));
                /* echo json_encode(addUser($userinfo)); */
                exit;
            
            }elseif (isset($_POST["username"]) && isset($_POST["password"])) {
                $user = $_POST["username"];
                $pass = $_POST["password"];
                $check= loginUser($user, $pass);
                if($check === "fel password"||$check === "fel användarnamn"){
                    echo json_encode("loginerror");
                    exit;
                }else{
                    echo json_encode($check);
                    exit;
                }
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