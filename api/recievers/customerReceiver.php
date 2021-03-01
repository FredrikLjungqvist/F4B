<?php

try {

    if(isset($_SERVER["REQUEST_METHOD"])) {

        require("../repositories/userRepository.php");

        
        if($_SERVER["REQUEST_METHOD"] == "GET") {

            if($_GET["action"] == "getCustomer") 
            
                //kundnfo hämta här:
                echo json_encode(getCustomer($_GET["Id"]));
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