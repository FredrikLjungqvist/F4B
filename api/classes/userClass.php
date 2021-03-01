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
    public $address1;
    public $address2;
    public $zipCode;
    public $city;
    public $country;
    public $email;
    public $mobilephone;

    function __construct($id, $firstName, $lastName, $address1, $address2, $zipCode, $city, $country, $email, $mobilephone) {
        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->address1 = $address1;
        $this->address2 = $address2;
        $this->zipCode = $zipCode;
        $this->city = $city;
        $this->country = $country;
        $this->email = $email;
        $this->mobilePhone = $mobilephone;
    }

    
}
    


?>