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
}

class Customer extends User {
    function __construct()
    {
        
    }
}

?>