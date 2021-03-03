<?php

try {

    if(isset($_SERVER["REQUEST_METHOD"])) {
        
        require("../repositories/adminRepository.php");
        require("../classes/cartItem.php");

        if($_SERVER["REQUEST_METHOD"] == "GET") {

            if($_GET["action"] == "listNewsletter") {
                //GET LIST OF USERS WITH NEWSLETTER (ADMIN)
            } else if($_GET["action"] == "getListPending") {
                //GET LIST OF PENDING ADMINS (ADMIN)
                echo json_encode(getListPending());
            } else if($_GET["action"] == "getListAdmin") {
                //GET LIST OF ADMINS (ADMIN)
                echo json_encode(getListAdmin());
            } else if($_GET["action"] == "getListNewsletter") {
                //GET LIST OF USERS WITH NEWSLETTER (ADMIN)
                echo json_encode(getListNewsletter());
            } else if($_GET["action"] == "getListOrders") {
                //GET LIST OF SHIPPED/COMPLETE ORDERS (DEPENDING ON STATUS)(ADMIN)
                echo json_encode(getListOrders($_GET["status"]));
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

            } else if($_POST["action"] == "approveAdmin") {
                //GIVE SPECIFIC USER ADMIN RIGHTS (ADMIN)
                $id = json_decode($_POST["userID"], true);
                
                echo json_encode(approveAdmin($id));
                
            } else if($_POST["action"] == "denyAdmin") {
                //GIVE SPECIFIC USER ADMIN RIGHTS (ADMIN)
                $id = json_decode($_POST["userID"], true);
                
                echo json_encode(denyAdmin($id));
                
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
                
                $product=json_decode($_POST["product"], true);
                
                echo json_encode(addProduct($product));


            } else if($_POST["action"] == "submitNewsletter") {
                //SENDS NEWSLETTER TO REGISTERED USERS, AND SAVES NEWSLETTER IN DATABASE (ADMIN)

                 $newsletter = [
                    "title"=>$_POST["title"],
                    "text"=>$_POST["text"],
                    "date"=>date("Y-m-d H:i:s"),
                ];

                echo json_encode(submitNewsletter($newsletter));

            } else if($_POST["action"] == "approveOrder") {
                //CHANGES STATUS OF ORDER TO 2 (SHIPPED) OF ORDER WITH MATCHING ID($_POST["id"]) (ADMIN)

                $id = json_decode($_POST["id"], true);
                
                /* echo json_encode($id); */
                echo json_encode(approveOrder($id));

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
