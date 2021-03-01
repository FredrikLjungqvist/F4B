<?php
session_start();
require ("../handlers/databaseHandler.php");
require ("../classes/orderClass.php");

function sendOrder($order){
$db = new Database;
return $db->runQuery("INSERT INTO orders (userID, date, status) VALUES (:userID, :date, :status);", $order);

};

function addOrderItem($orderItem){
$db= new Database;
return $db->runQuery("INSERT INTO orderitems (orderID, productID, price, weight) VALUES (:orderID, :productID, :price, :weight);", $orderItem);

}


function getOrder($order){
    $db= new Database;
    $response = $db->fetchQuery("SELECT * FROM orders WHERE id = '$order'");
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
    /* $order->orderID=$orderSent["index"]; */
    
    
    foreach ($cart["cartitems"] as $key => $item) {
        
        
        $orderItemInstance = new OrderItem($item["product"][0]["id"],$orderSent["index"], $item["quantity"],$item["product"][0]["price"] );
        /* $orderItem=array($key => , ); */
        array_push($orderItemList, $orderItemInstance);
    }
    
   /*  array_map('addOrderItem', $cart["cartitems"]); */
    
    $order = new Order($orderItemList, $orderSent["index"], $_SESSION["id"], $cart["totalPrice"], $cart["totalWeight"]);
    return $order;
    };





?>