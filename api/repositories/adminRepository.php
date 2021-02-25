<?php

require("../handlers/databaseHandler.php");
require("../classes/productClass.php");

function adminUpdate($product){
    
    $db = new Database();
    return $db->runQuery("UPDATE products SET unitInStock = :quantity WHERE ID = :prodID", $product);
}


function addProduct($product){
    
    $db = new Database();
    return $db->runQuery("INSERT INTO products (prodName, prodDescription, categoryID, unitPrice, unitWeight, unitInStock, prodPicture) VALUES (:name, :description, :category, :price, :weight, :qty, :img);", $product);

}


?>