<?php


class cartItem{
    function __construct($product, $quantity) {
        
        $this->product=$product;
        $this->quantity = $quantity;
        
    } 
    
}



class cart{
    function __construct($cartItem){
        $this->cartitems=$cartItem;
        $this->totalPrice=$this->totalPrice();
        $this->totalWeight=$this->totalWeight();
    }
    public $cartitems;
    public $totalPrice;
    public $totalWeight;
    
    public function totalPrice(){
        $sum = array_reduce($this->cartitems, function($i, $obj)
        {
            return $i +=$obj->product[0]->price * $obj->quantity;
        });
        
        return (int )$sum;
    }
    
    function totalWeight(){
        $sum = array_reduce($this->cartitems, function($i, $obj)
        {
            return $i +=$obj->product[0]->weight;
        });
        return (int )$sum;
    }
    
}







//cartitem has product + quant;
//cart is array of cartitems;
//method is in cart class, as sum etc.

?>