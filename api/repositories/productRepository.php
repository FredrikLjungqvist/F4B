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
        $productInstance = new Product((int) $product["ID"], (int) $product["categoryID"], $product["prodDescription"], 
        $product["prodPicture"], $product["prodName"], (int) $product["unitPrice"],(int) $product["unitWeight"], (int) $product["unitInStock"]);
        
        array_push($productList, $productInstance); 
       
    }   
    return $productList;
}
    
//add new
function addProduct($product){
    $db = new Database();
    return $db->runQuery("INSERT INTO cartitem (userID,prodID, quantity) VALUES ( :userID, :prodID, :quantity);", $product);
}
function addOneQunatity($product){
    $userID = $product["userID"];
    $prodID = $product["prodID"];
    $db = new Database();
    return $db->fetchQuery( "UPDATE cartitem SET quantity = quantity + 1 WHERE prodID = $prodID AND userID = $userID");
}
/* ;INSERT INTO product (productname, price, weight, type) VALUES (:productname, :price, :weight, :type) */
function getcartItem($userID){
    $db = new Database();
    return $db->fetchQuery("SELECT prodID FROM cartitem WHERE userID = $userID");
}

function getCart($userID){
    
    $db = new Database();
    return $db->fetchQuery("SELECT * FROM cartitem WHERE userID = $userID");
}

function makeOrderItem($response){
$orderItemList = [];
foreach ($response as $item) {
    $product = getProduct($item["prodID"]);
    $orderItemInstance = new cartItem($product, $item["quantity"]);
    array_push($orderItemList, $orderItemInstance);
}
$cart = new cart($orderItemList);

return $cart;
};


//delet all
function deleteAllProducts(){
    $db = new Database();

}

//get specific category
function getCategory($category){
    $db = new Database();
    $productList =  $db->fetchQuery("SELECT * FROM products WHERE categoryID = $category");
    return productClassItem($productList);
}

//get specific product
function getProduct($product){
    $db = new Database();
    $productlist =  $db->fetchQuery("SELECT * FROM products WHERE ID = $product");
    return productClassItem($productlist);
}

//get number of products in cart
function getCartCounter($userID) {
    $db = new Database();
    return $db->fetchQuery("SELECT SUM(quantity) AS quant FROM cartitem WHERE userID = $userID");

}

?>
