<?php

try {

    if(isset($_SERVER["REQUEST_METHOD"])) {
        
        require("../repositories/productRepository.php");
        require("../classes/cartItem.php");

        if($_SERVER["REQUEST_METHOD"] == "GET") {

           

            if($_GET["action"] == "getAllProducts") {
                //ECHOS BACK LIST OF ALL PRODUCTS
                
               
               
                echo json_encode(getAllProducts());

                

            } else if($_GET["action"] == "getCategories") {
                //ECHOS BACK LIST OF ALL PRODUCTS IN SPECIFIC CATEGORY
                echo json_encode(getCategories());
                exit;
            
            } else if($_GET["action"] == "getCategory") {
                //ECHOS BACK LIST OF ALL PRODUCTS IN SPECIFIC CATEGORY
                echo json_encode(getCategory($_GET["categoryID"]));
                exit;
            
            }else if($_GET["action"] == "getCart") {
                //ECHOS BACK CARTITEM FROM SPECIFIC USERID
                
                
                $cart = makeCartItem(getCart($_GET["userID"]));
                
                echo json_encode($cart);
                
                
                exit;

            
            } else if($_GET["action"] == "getcartitem") {
                //ECHOS BACK CARTITEM FROM SPECIFIC USERID
                $userID = json_decode($_GET["userID"]);
                    echo json_encode(getcartItem($userID));
               
                exit;

            } else if($_GET["action"] == "getProduct") {
                //ECHOS BACK SPECIFIC PRODUCT
                echo json_encode(getProduct($_GET["productID"]));
                exit;

            } else if($_GET["action"] == "getCartCounter") {
                //get number of products in cart
                $userID = $_GET["userID"];
                echo json_encode(getCartCounter($userID));
                exit;

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
                

            } else if ($_POST["action"] == "deleteAll") {

                $entity = [
                    "prodID"=>$_POST["prodID"],
                    "userID"=>$_POST["userID"]
                ];
            
                echo json_encode(deleteCartItem($entity));

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
