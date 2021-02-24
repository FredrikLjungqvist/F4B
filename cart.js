function initCart() {
    document.getElementById("productCardCart").innerHTML=""
    document.getElementById("productCard").innerHTML=""
    getCart()
}

function renderCart(cart) {
    document.getElementById("productCardCart").innerHTML=""
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
          renderCardCart.style.height = "5.5rem"
          renderCardCart.style.margin = "5px"
      
          let image = document.createElement("img")
          image.classList.add("card-img-top")
          image.style.marginTop = "-25px"
          image.style.maxWidth = "10%"
          image.style.maxHeight = "150px"
          image.style.backgroundColor = "purple"
          
          let cardBodyCart = document.createElement("div")
          cardBodyCart.classList.add("card-body", "d-flex","flex-nowrap", "justify-content-around")
          cardBodyCart.style.padding = "2rem"
      
          let title = document.createElement("h6");
          title.classList.add("card-title","d-flex","p-0", "align-items-center")
          title.innerText = value.name + "  " //placera productens namn här från databasen
          title.style.maxWidth = "130px"
          title.style.maxHeight = "15px"
      
          let cardText = document.createElement("p")
          cardText.classList.add("card-text","d-flex", "p-0")
          cardText.innerText = " Pris: " + value.price + " kr " + "  " //placera productens beskrivning här från databasen
          cardText.style.maxWidth = "130px"
          cardText.style.maxHeight = "15px"
      
          let cardWeight = document.createElement("p")
          cardWeight.classList.add("card-text","d-flex","p-0")
          cardWeight.innerText = " Vikt: " + value.weight + " g "//placera productens beskrivning här från databasen
          cardWeight.style.maxWidth = "130px"
          cardWeight.style.maxHeight = "15px"

          let cardQuant = document.createElement("p")
          cardQuant.classList.add("card-text","d-flex","p-0")
          cardQuant.innerText = " Antal: " + cartItem.quantity + " st"
          title.style.maxWidth = "130px"
          title.style.maxHeight = "15px"

          let cardTotWeight = document.createElement("p")
          cardTotWeight.classList.add("card-text","d-flex","p-0")
          cardTotWeight.innerText = "Sum vikt: " + value.weight * cartItem.quantity + " g"
          cardTotWeight.style.maxWidth = "130px"
          cardTotWeight.style.maxHeight = "15px"

          let cardTotal = document.createElement("p")
          cardTotal.classList.add("card-text","d-flex","p-0")
          cardTotal.innerText = "Sum pris: " + value.price * cartItem.quantity + " kr"
          cardTotal.style.maxWidth = "130px"
          cardTotal.style.maxHeight = "15px"

          let iconCross = document.createElement("i")
          iconCross.classList = "fa fa-close"

          let deleteBtn = document.createElement("button")
          deleteBtn.classList.add("btn", "text-grey", "p-0")
          deleteBtn.style.background = "white"
          deleteBtn.style.maxWidth = "12px"
          deleteBtn.style.maxHeight = "12px"
          
       /*    addbutton.data = product
          addbutton.addEventListener("click", addProductToCart) () =>{
              alert ("you clicked the button"); 
            });  */
      
      cardBodyCart.append(image, title, cardText, cardWeight, cardQuant, cardTotWeight, cardTotal, deleteBtn)
      deleteBtn.append(iconCross)
      renderCardCart.append(cardBodyCart)
      
      document.getElementById("productCardCart").appendChild(renderCardCart);
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
    document.getElementById("productCardCart").appendChild(totalDiv);
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
