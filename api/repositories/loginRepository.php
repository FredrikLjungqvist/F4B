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

function loginUser($username){
    
    $db = new Database();
    $response = $db->fetchQuery("SELECT * FROM user WHERE name = $username");
    return $response;
    
    /* if( $response == !$username){
        return "tom array";

    }else {
        return $response;
    } */
}

?>