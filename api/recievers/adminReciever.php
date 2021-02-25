<?php

try {

    if(isset($_SERVER["REQUEST_METHOD"])) {
        
        require("../repositories/adminRepository.php");
        require("../classes/cartItem.php");

        if($_SERVER["REQUEST_METHOD"] == "GET") {

            if($_GET["action"] == "listNewsletter") {
                //GET LIST OF USERS WITH NEWSLETTER (ADMIN)
            }

        } else if($_SERVER["REQUEST_METHOD"] == "POST") {

            if($_POST["action"] == "updateStock") {
                //UPDATE PRODUCTS "IN STOCK" VALUE (ADMIN)
                $product = [
                    "prodID"=>$_POST["prodid"],
                    "quantity"=>$_POST["qty"]
                ];
            
                echo json_encode(adminUpdate($product));
                exit;

            }else if($_POST["action"] == "authAdmin") {
                //GIVE SPECIFIC USER ADMIN RIGHTS (ADMIN)
                
            } else if($_POST["action"] == "setCategory") {
                //SET CATEGORY FOR SPECIFIC PRODUCT (ADMIN)
                $input = [
                    "productID"=>$_POST["productID"],
                    "categoryID"=>$_POST["categoryID"]
                ];

                /* echo json_encode($input); */
                echo json_encode(setCategory($input));
                exit;

            } else if($_POST["action"] == "deleteProduct") {
                //DELETE PRODUCT (ADMIN)

                    $product = json_decode($_POST["product"],true);
                    echo json_encode(adminDelete($product));
                    exit;

            } else if($_POST["action"] == "addProduct") {
                //ADD PRODUCT (ADMIN) // add image later

            } else if($_POST["action"] == "sendNewsletter") {
                //SENDS NEWSLETTER TO REGISTERED USERS, AND SAVES NEWSLETTER IN DATABASE (ADMIN)
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
