<?php


require ("../classes/userClass.php");
require ("../handlers/databaseHandler.php");
function addUser($userinfo){
   
    
    
   /*  $password =  password_hash($password, PASSWORD_DEFAULT); */
    $db = new Database();
    return $db->runQuery("INSERT INTO user (name, password, role, firstName, lastName, address1, address2, zipCode, city, country, email, mobilePhone,pendingAdmin) VALUES ( :username, :password, :role, :firstName, :lastName, :address1, :address2, :zipCode, :city, :country, :email, :mobilePhone, 0);", $userinfo);
}

function loginUser($username, $password){
    
    $db = new Database();
    

    /* $response = $db->fetchQuery("SELECT * FROM user WHERE name = :username", ["username" => $username]); */
     $response = $db->fetchQuery("SELECT * FROM user WHERE name = '$username'"); 
   
    
     $hashed_password = $db->fetchQuery("SELECT password FROM user WHERE name = '$username'");
    
    
     if( $response[0]["name"] == $username){
         if(password_verify($password, $hashed_password[0]["password"])) {
              
             
             
             $_SESSION["loggedin"] = true;
             $_SESSION["id"] = $response[0]["id"];
             $_SESSION["username"] = $response[0]["name"];  
             $_SESSION["role"] = $response[0]["role"];
             
             return $_SESSION["username"] . " " . $_SESSION["role"];

        }else{
            return "fel password";
        } 
        return "det gick";

    }else {
        return "fel användarnamn";
    } 
}

?>