<?php
require("../handlers/databaseHandler.php");
//get all
function getAllProducts(){
    $db = new Database();
    return $db->fetchQuery("SELECT * FROM products");
}

function productClassItem($products) {
    require("../classes/productClass.php");
    $productList = [];

    foreach($products as $product) { 
        $product = new Product($products["prodID"], $products["categoryID"], $products["prodDescription"], 
        $products["prodPicture"], $products["prodName"], $products["unitPrice"], $products["unitWeight"], 
        $products["unitInStock"]);
        
        array_push($productList, $product);
        var_dump($productList);
        return $productList;
    }
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

//get specific category
function getCategory($category){
    $db = new Database();
    return $db->fetchQuery("SELECT * FROM products WHERE categoryID = $category");
}

//get specific product
function getProduct($product){
    $db = new Database();
    return $db->fetchQuery("SELECT * FROM products WHERE prodID = $product");
}


?>