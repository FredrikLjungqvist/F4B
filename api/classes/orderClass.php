<?php
class OrderItem{
    function __construct($product, $orderID, $quantity) {
        $this->product = $product;
        $this->orderID = $orderID;  
        $this->quantity = $quantity; 
         
    }

    public $quantity;
}

class Order{
    
    public $orderItems;
    public $date; 
    public $totalPrice;
    public $totalWeight;

    
    function __construct($orderItems, $orderID, $userID, $totalPrice, $date, $orderStatus) {
        $this->orderItems = $orderItems;
        $this->orderID = $orderID;
        $this->totalPrice = $totalPrice;
        $this->userID=$userID;
        $this->orderStatus = $orderStatus;
        $this->date=$date; 
    }

} 
?>