<?php

require("../handlers/databaseHandler.php");
require("../classes/productClass.php");

function adminUpdate($product){
    
    $db = new Database();
    return $db->runQuery("UPDATE products SET unitInStock = :quantity WHERE ID = :prodID", $product);
}

function adminDelete($product){
    $db = new Database();
    return $db->runQuery("DELETE FROM products WHERE ID = :ID", $product);
}



function setCategory($input){

    $db = new Database();
    return $db->runQuery("INSERT INTO productcat (productID, categoryID) VALUES (:productID, :categoryID);", $input);

function addProduct($product){
    
    $db = new Database();
    return $db->runQuery("INSERT INTO products (prodName, prodDescription, categoryID, unitPrice, unitWeight, unitInStock, prodPicture) VALUES (:name, :description, :category, :price, :weight, :qty, :img);", $product);

}



?>
?>
