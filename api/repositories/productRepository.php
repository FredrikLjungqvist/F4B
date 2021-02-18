<?php
require("../handlers/databaseHandler.php");
require("../classes/productClass.php");
//get all
function getAllProducts(){
    $db = new Database();
    $productlist = $db->fetchQuery("SELECT * FROM products");
    return productClassItem($productlist);

}

function productClassItem($products) {
    
    $productList = [];
    
    foreach($products as $product) { 
        $productInstance = new Product( (int)$product["ID"], $product["categoryID"], $product["prodDescription"], 
        $product["prodPicture"], $product["prodName"], $product["unitPrice"], $product["unitWeight"], 
        $product["unitInStock"]);
        
        array_push($productList, $productInstance); 
       
    }   
    return $productList;
}
    
//add new
function addProduct($product){
    $db = new Database();
    return $db->runQuery("INSERT INTO cartitem (userID,prodID, quantity) VALUES ( :userID, :prodID, :quantity);", $product);
}
/* ;INSERT INTO product (productname, price, weight, type) VALUES (:productname, :price, :weight, :type) */
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