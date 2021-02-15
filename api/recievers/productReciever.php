<?php

try {

    if(isset($_SERVER["REQUEST_METHOD"])) {

        /* require(""); */

        if($_SERVER["REQUEST_METHOD"] == "GET") {
            
            if($_GET["action"] == "getAllProducts") {
                // GET ALL PRODUCTS
            } else if($_GET["action"] == "getCategory") {
                //GET SPECIFIC CATEGORY
            } else if($_GET["action"] == "getProduct") {
                //GET SPECIFIC PRODUCT
            } else if($_GET["action"] == "getCart") {
                //GET PRODUCTS IN CART
            } else if($_GET["action"] == "listNewsletter") {
                //GET LIST OF USERS WITH NEWSLETTER (ADMIN)
            }

        } else if($_SERVER["REQUEST_METHOD"] == "POST") {

            if($_POST["action"] == "addProductToCart") {
                //ADD PRODUCT TO CART
            } else if($_POST["action"] == "removeProductFromCart") {
                //DELETE PRODUCT FROM CART
            } else if($_POST["action"] == "clearCart") {
                //CLEARS CART
            } else if($_POST["action"] == "sendNewsletter") {
                //SENDS NEWSLETTER TO REGISTERED USERS, AND SAVES NEWSLETTER IN DATABASE (ADMIN)
            } else if($_POST["action"] == "authAdmin") {
                //GIVE SPECIFIC USER ADMIN RIGHTS (ADMIN)
            } else if($_POST["action"] == "setCategory") {
                //SET CATEGORY FOR SPECIFIC PRODUCT (ADMIN)
            } else if($_POST["action"] == "deleteProduct") {
                //DELETE PRODUCT (ADMIN)
            } else if($_POST["action"] == "addProduct") {
                //ADD PRODUCT (ADMIN)
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