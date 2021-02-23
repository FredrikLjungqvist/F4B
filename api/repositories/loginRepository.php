<?php


require ("../classes/userClass.php");
require ("../handlers/databaseHandler.php");
function addUser($userinfo){
   
    $user1 =[ 
                "name"=>"Pelle",
                "password"=> 123
    ];
    
   /*  $password =  password_hash($password, PASSWORD_DEFAULT); */
    $db = new Database();
    return $db->runQuery("INSERT INTO user (name, password) VALUES (:name, :password);", $userinfo);
}

function loginUser($username, $password){
    
    $db = new Database();
    $response = $db->fetchQuery("SELECT name FROM user WHERE name = '$username'");
    var_dump($response);
    
    
     $hashed_password = $db->fetchQuery("SELECT password FROM user WHERE name = '$username'");
    var_dump($hashed_password); 
    var_dump($password);
    
     if( $response[0]["name"] == $username){
         if(password_verify($password, $hashed_password[0]["password"])) {
            return "rätt password";
        }else{
            return "fel password";
        } 
        return "det gick";

    }else {
        return "fel användarnamn";
    } 
}

?>