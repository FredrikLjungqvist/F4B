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
          renderCardCart.style.width = "82%"
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
          cardBodyCart.classList.add("card-body", "d-flex","flex-nowrap", "justify-content-around")
          cardBodyCart.style.padding = "2rem"
      
          let title = document.createElement("h6");
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
          cardQuant.innerText = " Antal: " + cartItem.quantity + " st"

          let cardTotal = document.createElement("p")
          cardTotal.classList.add("card-text","d-flex","p-0")
          cardTotal.innerText = "Sum pris: " + value.price * cartItem.quantity + " kr"

          let cardTotWeight = document.createElement("p")
          cardTotWeight.classList.add("card-text","d-flex","p-0")
          cardTotWeight.innerText = "Sum vikt: " + value.weight * cartItem.quantity + " g"
      
          let deleteBtn = document.createElement("button")
          deleteBtn.innerText = "x"
          deleteBtn.classList.add("btn", "text-white")
          deleteBtn.style.background = "rgb(28, 58, 28)"
          deleteBtn.style.height = "2rem"
       /*    addbutton.data = product
          addbutton.addEventListener("click", addProductToCart) () =>{
              alert ("you clicked the button"); 
            });  */
      
      cardBodyCart.append(image)
      cardBodyCart.append(title)
      cardBodyCart.append(cardText)
      cardBodyCart.append(cardWeight)
      cardBodyCart.append(cardQuant)
      cardBodyCart.append(cardTotal)
      cardBodyCart.append(cardTotWeight)
      
      cardBodyCart.append(deleteBtn)
      renderCardCart.append(cardBodyCart) // the body of content appends here
      
      document.getElementById("productCard").appendChild(renderCardCart);
      });
      
    }))

    let totalDiv = document.createElement("div")
    totalDiv.classList.add("card")

    let totalDivTwo = document.createElement("div")
    totalDivTwo.classList.add("card-body")
    
    let totalText = document.createElement("h5")
    totalText.innerText = "Total Vikt: " + cart.totalWeight + " g"

    let totalTextTwo = document.createElement("h5")
    totalTextTwo.innerText = "Total Pris: " + cart.totalPrice + " kr"

    let buyBtn = document.createElement("button")
    buyBtn.innerText = "Gå till betalning"
    buyBtn.classList.add("btn", "text-white")
    buyBtn.style.background = "rgb(28, 58, 28)"
    buyBtn.style.width = "200px"

    totalDiv.append(totalDivTwo)
    totalDiv.append(totalText)
    totalDiv.append(totalTextTwo)
    totalDiv.append(buyBtn)
    document.getElementById("productCard").appendChild(totalDiv);
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
