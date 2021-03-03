<?php
require ("../repositories/orderRepository.php");
try {

    if(isset($_SERVER["REQUEST_METHOD"])) {

        /* require(""); */

        if($_SERVER["REQUEST_METHOD"] == "GET") {
            
            if($_GET["action"] == "listOrder") {
                
                echo json_encode(getOrder());
            } else if($_GET["action"] == "listPreviousOrders") {
                //GET ORDER HISTORY
            } else if($_GET["action"] == "listAllOrders") {
                //GET LIST OF ALL ORDERS IN DATABASE (ADMIN)
            }

        } else if($_SERVER["REQUEST_METHOD"] == "POST") {

            if($_POST["action"] == "sendOrder") {
                $cart=json_decode($_POST["cart"], true);
                echo json_encode(makeOrder($cart));
            } else if($_POST["action"] == "orderReceived") {
                //MARKS ORDER AS RECEIVED
                $orderID=json_decode($_POST["ID"], true);

                echo json_encode(orderReceived($orderID));

            }

        } else {
            throw new ErrorException("Method not found...", 500);
        }

    } else {
        throw new ErrorException("Endpoint not found...", 404);
    }

} catch(Exception $e) {
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}

?>