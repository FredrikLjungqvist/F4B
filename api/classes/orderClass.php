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

    
    function __construct($orderItems, $orderID, $userID, $totalPrice, $totalWeight) {
        $this->orderItems = $orderItems;
        $this->orderID = $orderID;
        $this->totalPrice = $totalPrice;
        $this->userID=$userID;
        $this->totalWeight = $totalWeight;
        $this->date=date("Y-m-d H:i:s");
    }

} 
?>