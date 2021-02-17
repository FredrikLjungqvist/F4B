<?php
class cartItem{
    function __construct($productId, $quantity, $price, $weight) {
        $this->productId = $productId;
        $this->quantity = $quantity;
        $this->price = $price;
        $this->weight = $weight;
}

    public $productId;
    public $quantity;

    function totalPrice($price){
        
}


}

//cartitem has product + quant;
//cart is array of cartitems;
//method is in cart class, as sum etc.

?>