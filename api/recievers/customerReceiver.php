<?php

try {

    if(isset($_SERVER["REQUEST_METHOD"])) {

        require("../repositories/userRepository.php");
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $user=json_decode($_POST["user"], true);
            echo json_encode(orderNewslette($user));
            exit;
        }
        
        if($_SERVER["REQUEST_METHOD"] == "GET") {

            if($_GET["action"] == "getCustomer") {
            
                //kundnfo hämta här:
                echo json_encode(getCustomer());
                exit;
              
            }else if($_GET["action"] == "getShipper") {

                echo json_encode(getShipper());
                exit;


            } else {
            echo json_encode("Funkar inte...");
            exit;
            }

    
    
        } else {
            throw new ErrorException("Endpoint not found...", 404);
        }
    }

}catch(Exception $e) {
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}

?>