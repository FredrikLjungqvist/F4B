<?php
require("../classes/productClass.php");
class cartItem{
    function __construct($product, $quantity) {
        $this->product = $product;
        $this->quantity = $quantity;
        
}

    public $productId;
    public $quantity;

}

class cart{
    function __construct(){
        $this->cart=[];
    }
    
    function totalPrice($array){
        $sum = array_reduce($array, function($i, $obj)
 {
     return $i +=$obj->product->price;
 });
 
     return $sum;
         
    }
}







//cartitem has product + quant;
//cart is array of cartitems;
//method is in cart class, as sum etc.

?>