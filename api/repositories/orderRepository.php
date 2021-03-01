<?php
session_start();
require_once ("../handlers/databaseHandler.php");
require ("../classes/orderClass.php");


function sendOrder($order){
$db = new Database;
return $db->runQuery("INSERT INTO orders (userID, date, status) VALUES (:userID, :date, :status);", $order);

};

function addOrderItem($orderItem){
$db= new Database;
return $db->runQuery("INSERT INTO orderitems (orderID, productID, price, quantity) VALUES (:orderID, :productID, :price, :quantity);", $orderItem);

}


function getOrder(){
    $userID = $_SESSION["id"];
    $db= new Database;
    $response = $db->fetchQuery("SELECT * FROM orders WHERE userID = '$userID'");
    return $response;
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
        "status"=>1
    ];
    
    $orderSent=sendOrder($orderToSave);
   
    
    
    foreach ($cart["cartitems"] as $item) {
        
        $product= $item["product"];
        $orderItemInstance = new OrderItem($product, $orderSent["index"], $item["quantity"]);
        $orderItems = [
            "orderID"=>$orderSent["index"],
            "productID"=>$item["product"][0]["id"],
            "price"=>$item["product"][0]["id"],
            "quantity"=>$item["quantity"]
        ];
        addOrderItem($orderItems); 
        array_push($orderItemList, $orderItemInstance);
        
    }
   
    
    $order = new Order($orderItemList, $orderSent["index"], $_SESSION["id"], $cart["totalPrice"], $cart["totalWeight"]);
    return $order;
    };





?>