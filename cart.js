function initCart() {
    
    getCart()
}

function renderCart(cart) {
    document.getElementById("productCard").innerHTML=""
    
    /* if(!cart) {
        let emptyCart = document.createElement(h3)
        emptyCart.innerText = "Det finns inga produkter i varukorgen"
        productCard.appendChild(emptyCart)
    }
     */
    cart.cartitems.forEach((cartItem => {
      cartItem.product.forEach(value => {
          
        let renderCardCart = document.createElement("div")
        renderCardCart.className = "card";
        renderCardCart.style.width = "80%"
        renderCardCart.style.height = "6rem"
        renderCardCart.style.margin = "5px"

        let image = document.createElement("img")
        image.classList.add("card-img-top")
        image.style.marginTop = "-25px"
        image.style.width = "80px" //Instead of a picture for now
        image.style.height = "80px"//Instead of a picture for now
        image.style.backgroundColor = "purple"//Instead of a picture for now
        image.innerText= "tomt på bilder just nu"
        
        let cardBodyCart = document.createElement("div")
        cardBodyCart.classList.add("card-body", "d-flex","flex-nowrap")
        cardBodyCart.style.padding = "2rem"

        let title = document.createElement("h5");
        title.classList.add("card-title","d-flex","p-0")
        title.innerText = value.name + "  " //placera productens namn här från databasen

        let cardText = document.createElement("p")
        cardText.classList.add("card-text","d-flex", "p-0")
        cardText.innerText = " Pris: " + value.price + " kr " + "  " //placera productens beskrivning här från databasen
        

        let cardWeight = document.createElement("p")
        cardWeight.classList.add("card-text","d-flex","p-0")
        cardWeight.innerText = " Vikt: " + value.weight + " g "//placera productens beskrivning här från databasen
        
        let cardQuant = document.createElement("p")
        cardQuant.classList.add("card-text","d-flex","p-0")
        cardQuant.innerText = " Antal: " + value.weight + " st"

       /*  let addbutton = document.createElement("button")
        addbutton.innerText = "Lägg i varukorgen"
        addbutton.classList.add("btn", "text-white")

        addbutton.data = product
        addbutton.addEventListener("click", addProductToCart) /* () =>{
            alert ("you clicked the button");
    }); */ 

    cardBodyCart.append(image)
    cardBodyCart.append(title)
    cardBodyCart.append(cardText)
    cardBodyCart.append(cardWeight)
    cardBodyCart.append(cardQuant)
    /* cardBody.append(addbutton) */
    renderCardCart.append(cardBodyCart) // the body of content appends here

    document.getElementById("productCard"/*ID DÄR PRODUKT KORT SKAL RENDERAS*/).appendChild(renderCardCart);
});
    }))

}

async function getCart() {
    var url = new URL("http://localhost/api/recievers/productReciever.php")
    var params = {action: "getCart", userID: 1} 
    url.search = new URLSearchParams(params);

    let cart = await makeRequest(url, "GET")
    console.log(cart)
    renderCart(cart)
}

async function makeRequest(url, method, body) {
    // Using fetch to send REST method and body (if set) to set path. Returns response or error
    try {
        const response = await fetch(url, {method,body})
        return response.json()
    
    } catch (error) {
        console.log("det belv fel"+error)
    }
}
