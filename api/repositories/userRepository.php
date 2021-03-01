<?php
    require("../handlers/databaseHandler.php");
    require("../classes/userClass.php");

    //get customer info from db user 
    function getcustomer($userId) { 
        $db = new Database();
        return $db->fetchQuery("SELECT * FROM user WHERE id = $userId");
    }

    
    function customerItem($customers) {

        $customerList = [];

        foreach($customers as $customer) {
           $customerInstance = new customer($customer["id"], $customer["firstName"], $customer["lastName"], $customer["address1"], $customer["address2"],
           $customer["zipCode"], $customer["city"], $customer["country"], $customer["email"], $customer["mobilePhone"]);
            
            array_push($customerList, $customerInstance);
        }
        return $customerList; 
    }

?>