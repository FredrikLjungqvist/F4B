<?php

class User {
    function __construct($id, $password, $logginStatus, $registerDate)
    {
        
        $this->id = $id;
        $this->password = $password;
        $this->logginStatus = $logginStatus;
        $this->registerDate = $registerDate;

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