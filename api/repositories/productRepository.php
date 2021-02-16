<?php
require("../handlers/databaseHandler.php");
//get all
function getAllProducts(){
    $db = new Database();
    return $db->fetchQuery("SELECT * FROM products");
}

//add new
function addProduct($product){
    $db = new Database();
    
    return $db->runQuery("INSERT INTO product (productname, price, weight, type) VALUES (:productname, :price, :weight, :type);", $product);
}

function getCart($userID){
    
    $db = new Database();
    return $db->fetchQuery("SELECT * FROM cartItems WHERE userID=$userID");
}


//delet all
function deleteAllProducts(){
    $db = new Database();

}


?>