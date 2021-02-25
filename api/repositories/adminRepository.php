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
?>