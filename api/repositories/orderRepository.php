<?php
session_start();
require_once ("../handlers/databaseHandler.php");
require ("../classes/orderClass.php");
require ("../repositories/productRepository.php");


function sendOrder($order){
$db = new Database;
return $db->runQuery("INSERT INTO orders (userID, date, status, price) VALUES (:userID, :date, :status, :price);", $order);

};

function addOrderItem($orderItem){
$db= new Database;
return $db->runQuery("INSERT INTO orderitems (orderID, productID, price, quantity) VALUES (:orderID, :productID, :price, :quantity);", $orderItem);

}


function getOrder(){
    $userID = $_SESSION["id"];
    $db= new Database;
    $response = $db->fetchQuery("SELECT * FROM orders WHERE userID = '$userID'");
    
    $orders=[];
    foreach ($response as $order) {
        $orderItems = getOrderDetails($order["ID"]);
        $orderItemList=[];
            
        foreach ($orderItems as $orderItem){
                $product=getProduct($orderItem["productID"]);
                $orderItemInstance = new OrderItem($product, $orderItem["orderID"], $orderItem["quantity"]);
                
                    
                
                array_push($orderItemList, $orderItemInstance);
                
            }
        $order = new Order($orderItemList, $order["ID"], $_SESSION["id"], $order["price"], $order["date"], NULL);
        array_push($orders, $order);
    
    }
    return $orders;


}

function getOrderDetails($orderID){
$db= new Database;
$response = $db->fetchQuery("SELECT * FROM orderitems WHERE orderID = '$orderID'");
return $response;
}


function makeOrder($cart){

    
    $orderItemList = [];
    $orderToSave = [
        "userID"=>$_SESSION["id"],
        "date"=>date("Y-m-d H:i:s"),
        "status"=>1,
        "price"=>$cart["totalPrice"]
    ];
    
    $orderSent=sendOrder($orderToSave);
   
    
    
    foreach ($cart["cartitems"] as $item) {
        
        updateStock($item["product"][0]["id"], $item["quantity"]);

        $product= $item["product"];
        $orderItemInstance = new OrderItem($product, $orderSent["index"], $item["quantity"]);
        $orderItems = [
            "orderID"=>$orderSent["index"],
            "productID"=>$item["product"][0]["id"],
            "price"=>$item["product"][0]["price"],
            "quantity"=>$item["quantity"]
            
        ];
        addOrderItem($orderItems); 
        array_push($orderItemList, $orderItemInstance);
        
    }
   
    
    $order = new Order($orderItemList, $orderSent["index"], $_SESSION["id"], $cart["totalPrice"],date("Y-m-d H:i:s"), $cart["totalWeight"]);
    $cartItems=[
        "userID"=>$_SESSION["id"]
    ];
    deleteCartItems($cartItems);
    return $order;
};

function deleteCartItems($userID) {
    $db = new Database();
    return $db->runQuery("DELETE FROM cartitem WHERE userID = :userID;", $userID);
}

function updateStock($productID, $quantity){
$product=[
    "quantity"=>$quantity,
    "prodID"=>$productID
];
$db= new Database;
return $db->runQuery("UPDATE products SET unitInStock = unitInStock - :quantity WHERE ID = :prodID", $product);

}


?>