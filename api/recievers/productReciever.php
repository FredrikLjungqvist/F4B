<?php

try {

    if(isset($_SERVER["REQUEST_METHOD"])) {
        
        require("../repositories/productRepository.php");
        

        if($_SERVER["REQUEST_METHOD"] == "GET") {

           

            if($_GET["action"] == "getAllProducts") {
                //ECHOS BACK LIST OF ALL PRODUCTS
                
               
               
                echo json_encode(getAllProducts());

                

            } else if($_GET["action"] == "getCategory") {
                //ECHOS BACK LIST OF ALL PRODUCTS IN SPECIFIC CATEGORY
                echo json_encode(getCategory($_GET["categoryID"]));
                exit;

            } else if($_GET["action"] == "getcartitem") {
                //ECHOS BACK CARTITEM FROM SPECIFIC USERID
                $userID = json_decode($_GET["userID"]);
                    echo json_encode(getcartItem($userID));
                /* echo json_encode(getcartItem($_GET["userID"])); */
                exit;

            } else if($_GET["action"] == "getProduct") {
                //ECHOS BACK SPECIFIC PRODUCT
                echo json_encode(getProduct($_GET["productID"]));
                exit;

            } else if($_GET["action"] == "getCartCounter") {
                
                
                $userID = $_GET["userID"];
                echo json_encode(getCartCounter($userID));
                exit;

                
                //GET PRODUCTS IN CART
            } else if($_GET["action"] == "listNewsletter") {
                //GET LIST OF USERS WITH NEWSLETTER (ADMIN)
            }

        } else if($_SERVER["REQUEST_METHOD"] == "POST") {
            if($_POST["action"] == "addProductToCart") {
                    $product = json_decode($_POST["product"],true);
                    echo json_encode(addProduct($product));
                    exit;
                    //ADD NEW PRODUCT TO CART
            }else if ($_POST["action"] == "addQty") {
                $product = json_decode($_POST["product"],true);
                echo json_encode(addOneQunatity($product));
                exit;
                    //ADD QUANTITY FOR PRODUCT TO CART
                

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
