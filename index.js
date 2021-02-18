window.addEventListener("load", initsite)
function initsite()
{
    /* getProduct("30002") */
    /* getCategory("3") */
     getAllProducts() 

}


async function getAllProducts() {
    var url = new URL("http://localhost/api/recievers/productReciever.php")
    
    var params = {action: "getAllProducts"} 
    
    url.search = new URLSearchParams(params);
    console.log(url)

    let products = await makeRequest(url, "GET")
    console.log(products)

//Function will get the list of products and render them onto page 
    products.forEach((product => {
    
    let renderCard = document.createElement("div");
    renderCard.className ="card";

    let cardBody = document.createElement("div");
    cardBody.className ="card-Body"

    let title = document.createElement("div");
    title.innerText = product.name//placera productens namn här från databasen

    let image = document.createElement("img")
    image.className ="img"
    image.style.width = "50px" //Instead of a picture for now
    image.style.height ="50px"//Instead of a picture for now
    image.style.backgroundColor ="purple"//Instead of a picture for now
    image.innerText="tomt på bilder just nu"

    let cardText = document.createElement("p")
    cardText.innerText = product.price + " kr" //placera productens beskrivning här från databasen
    cardText.className = "card-text"

    let cardWeight = document.createElement("p")
    cardWeight.innerText = product.weight + " g"
    cardWeight.className = "card-weight"

    let addbutton = document.createElement("button")
    addbutton.innerText ="Add button"
    addbutton. data = product
    addbutton.addEventListener("click",addProductToCart) /* () =>{ //addera korrekt function för knappens click
        alert ("you clicked the button");
    }); */
  
    cardBody.append(title)
    cardBody.append(image)
    cardBody.append(cardText)
    cardBody.append(cardWeight)
    cardBody.append(addbutton)
    renderCard.append(cardBody) // the body of content appends here

    document.getElementById("productCard"/*ID DÄR PRODUKT KORT SKAL RENDERAS*/).appendChild(renderCard);
  
    }))

}



async function getCategory(category) {
    //FETCHES ARRAY OF PRODUCTS CONTAINED IN A CATEGORY. categoryID SET IN PARAMETER.

    var url = new URL("http://localhost/api/recievers/productReciever.php")
    
    var params = {action: "getCategory", categoryID: category} 
    url.search = new URLSearchParams(params);

let products = await makeRequest(url, "GET")
console.log(products)

}

async function getProduct(product) {
    //FETCHES SPECIFIC PRODUCT. prodID SET IN PARAMETER.

    var url = new URL("http://localhost/api/recievers/productReciever.php")
    
    var params = {action: "getProduct", productID: product} 
    url.search = new URLSearchParams(params);

let products = await makeRequest(url, "GET")
console.log(products)

}


async function addProductToCart(){

    const cartItemCheck = await makeRequest("http://localhost/api/recievers/productReciever.php", "GET")
    console.log(cartItemCheck)
    const UserIDNumber = Math.floor(Math.random() * 10);
    
    const product = {
        userID:UserIDNumber,
        prodID:this.data.id,
        quantity:UserIDNumber  /* this.data.id++ */
        }
    console.log(product)

    let body = new FormData()
    body.append("action", "addProductToCart")
    body.append("product", JSON.stringify(product))

    const result = await makeRequest("http://localhost/api/recievers/productReciever.php", "POST",body)
    console.log(result)
    
    /* var url = new URL("http://localhost/api/recievers/productReciever.php")
    var params = {action: "addProductToCart", productID: cartItem} 
    url.search = new URLSearchParams(params); */


    /* cartItem = await makeRequest(url, "POST", body) */

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
