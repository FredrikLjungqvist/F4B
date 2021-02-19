<?php


class cartItem{
    function __construct($product, $quantity) {
        
        $this->product=$product;
        $this->quantity = $quantity;
        
    } 
    
     function getProduct($productID){
        $db = new Database();
    $productlist =  $db->fetchQuery("SELECT * FROM products WHERE prodID = $productID");
    return productClassItem($productlist);
    }
    
    
    public $quantity;

}



class cart{
    function __construct($cartItem){
        $this->cartitem=$cartItem;
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