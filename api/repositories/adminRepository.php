<?php

require("../handlers/databaseHandler.php");
require("../classes/productClass.php");

function adminUpdate($product){
    
    $db = new Database();
    return $db->runQuery("UPDATE products SET unitInStock = :quantity WHERE ID = :prodID", $product);
}




function setCategory($input){

    $db = new Database();
    return $db->runQuery("INSERT INTO productcat (productID, categoryID) VALUES (:productID, :categoryID);", $input);

}



?>