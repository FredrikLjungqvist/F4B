<?php
require ("../handlers/databaseHandler.php");

function sendOrder($order){
$db = new Database;
return $db->runQuery("INSERT INTO orders (userID, date, status) VALUES (:userID, :date, :status)", $order);

};


?>