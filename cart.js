function initCart() {
    
    getCart()
}

function renderCart(cart) {
    document.getElementById("productCard").innerHTML=""

    
    
    cart.cartitems.forEach((cartItem => {
      cartItem.product.forEach(value => {
          
        let renderCardCart = document.createElement("div")
        renderCardCart.className = "card", "mb-3", "align-items-center";

        let rowDiv = document.createElement("div")
        rowDiv.classList.add("row", "g-0")

        let colDiv = document.createElement("div")
        colDiv.classList.add("col","md-4")

        let image = document.createElement("img")
        image.classList.add("card-img-top", "img-fluid")     
        image.style.width = "5%"
        image.style.height = "5%"
        image.src = "./pictures/" + value.image

        let colDivTwo = document.createElement("div");
        colDivTwo.classList.add("col", "md-8")

        let cardBodyCart = document.createElement("div")
        cardBodyCart.classList.add("card-body")

        let title = document.createElement("h5");
        title.classList.add("card-title")
        title.innerText = value.name //placera productens namn här från databasen

        let cardText = document.createElement("p")
        cardText.classList.add("card-text")
        cardText.innerText = value.price + " kr"//placera productens beskrivning här från databasen
        
        let cardWeight = document.createElement("p")
        cardWeight.classList.add("card-text",)
        cardWeight.innerText = value.weight + " g"//placera productens beskrivning här från databasen

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
