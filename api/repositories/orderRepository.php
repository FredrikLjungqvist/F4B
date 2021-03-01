<?php
session_start();
require ("../handlers/databaseHandler.php");
require ("../classes/orderClass.php");

function sendOrder($order){
$db = new Database;
return $db->runQuery("INSERT INTO orders (userID, date, status) VALUES (:userID, :date, :status);", $order);

};

function getOrder($order){
    $db= new Database;
    $response = $db->fetchQuery("SELECT * FROM orders WHERE id = '$order'");
    return $response;
}


function makeOrder($cart){

    $orderItemList = [];
    foreach ($cart["cartitems"] as $item) {
        
        $orderItemInstance = new OrderItem($item["product"][0]["id"],NULL , $item["quantity"],$item["product"][0]["price"] );
        array_push($orderItemList, $orderItemInstance);
    }
    
    $order = new Order($orderItemList, NULL, $_SESSION["id"], $cart["totalPrice"], $cart["totalWeight"]);
    $orderToSave = [
        "userID"=>(int)$order->userID,
        "date"=>$order->date,
        "status"=>1
    ];
   $orderSent=sendOrder($orderToSave);
   $order->orderID=$orderSent["index"];

    return $order;
    };





?>