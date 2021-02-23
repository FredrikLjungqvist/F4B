<?php

class User {
    function __construct($id, $username, $password)
    {
        
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
        /* $this->logginStatus = $logginStatus;
        $this->registerDate = $registerDate; */

    }
}
class Admin extends User {
    
    function __construct()
    {
        
    }

function getOrders(){

}
function sendNewsLetter(){

}
function addProduct(){

}
function deletProduct(){

}
function changeCategory(){

}
function makeAdmin(){

}

}


class Customer extends User {
    
   public $firstName;
    
   public $lastName;
   public $email;
   public $phone;
   public $adress;
   public  $zip;
   public $city;
   public $country;
    
    function __construct()
    {
        
    }
}

?>