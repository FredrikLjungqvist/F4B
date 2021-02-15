<?php
class Orderitem{
    function __construct($productId, $quantity) {
        $this->productId = $productId;
        $this->quantity = $quantity;    
    }

    public $product;
    public $quantity;
}

class Order{
    function __construct($orderItems) {
        $this->orderItems = $orderItems;
    }
} 
1?>