<?php
class OrderItem{
    function __construct($productID, $orderID, $quantity, $price) {
        $this->productID = $productID;
        $this->quantity = $quantity; 
        $this->orderID = $orderID;  
        $this->price = $price; 
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