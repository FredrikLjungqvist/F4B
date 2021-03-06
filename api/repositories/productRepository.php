<?php
require_once ("../handlers/databaseHandler.php");
require_once ("../classes/productClass.php");
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
    
    $db = new Database();
    return $db->runQuery( "UPDATE cartitem SET quantity = quantity + 1 WHERE prodID = :prodID AND userID = :userID", $product);
}

function getcartItem($userID){
    $db = new Database();
    return $db->fetchQuery("SELECT prodID FROM cartitem WHERE userID = $userID");
}

function getCart($userID){
    
    $db = new Database();
    return $db->fetchQuery("SELECT * FROM cartitem WHERE userID = $userID");
}

function makeCartItem($response){
$cartItemList = [];
foreach ($response as $item) {
    $product = getProduct($item["prodID"]);
    $cartItemInstance = new cartItem($product, $item["quantity"]);
    array_push($cartItemList, $cartItemInstance);
}
$cart = new cart($cartItemList);

return $cart;
};


//delet all
function deleteCartItem($cartItem) {
    $db = new Database();
    return $db->runQuery("DELETE FROM cartitem WHERE prodID = :prodID AND userID = :userID;", $cartItem);
}

function getCategories(){
    $db= new Database;
    $categories=$db->fetchQuery("SELECT * FROM category");
    return $categories;
}
function getCategoryProduct($id){
    $db = new Database;
    $products= $db->fetchQuery("SELECT * FROM productcategory WHERE id = $id");
    return $products;
}


//get specific category
function getCategory($category){
    $db = new Database();
    $productList =  $db->fetchQuery("SELECT productID FROM productcategory WHERE categoryID = $category");
    $productToGet=[];
    foreach ($productList as $product) {
        array_push($productToGet, getProduct($product["productID"]));
           

        
    }
    
    return $productToGet;
     
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
    $quantity=$db->fetchQuery("SELECT SUM(quantity) as qty FROM cartitem WHERE userID = $userID");
    
    return $quantity;

}

?>
