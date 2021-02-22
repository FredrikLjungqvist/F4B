window.addEventListener("load", initsite)
function initsite(){
   
   
    /* getProduct("30002") */
    /* getCategory("3") */
    getAllProducts()
    updateCartCounter(1)
}

function renderProducts(products) {
    //Function will get the list of products and render them onto page
    document.getElementById("productCard").innerHTML = "";
    
    products.forEach((product => {
    
        let renderCard = document.createElement("div")
        renderCard.className = "card text-center";

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body")

        let image = document.createElement("img")
        image.classList.add("card-img-top")
        image.style.width = "160px" //Instead of a picture for now
        image.style.height ="160px"//Instead of a picture for now
        image.style.backgroundColor = "purple"//Instead of a picture for now
        image.innerText="tomt på bilder just nu"

        let title = document.createElement("h5");
        title.classList.add("card-title")
        title.innerText = product.name//placera productens namn här från databasen

        let cardText = document.createElement("p")
        cardText.classList.add("card-text",)
        cardText.innerText = product.price + " kr"//placera productens beskrivning här från databasen
        
        let cardWeight = document.createElement("p")
        cardWeight.classList.add("card-text",)
        cardWeight.innerText = product.weight + " g"//placera productens beskrivning här från databasen

        let addbutton = document.createElement("button")
        addbutton.innerText = "Lägg i varukorgen"
        addbutton.classList.add("btn", "text-white")

        addbutton.data = product
        addbutton.addEventListener("click", addProductToCart) /* () =>{
            alert ("you clicked the button");
    }); */
    
    cardBody.append(image)
    cardBody.append(title)
    cardBody.append(cardText)
    cardBody.append(cardWeight)
    cardBody.append(addbutton)
    renderCard.append(cardBody) // the body of content appends here

    document.getElementById("productCard"/*ID DÄR PRODUKT KORT SKAL RENDERAS*/).appendChild(renderCard);
  
    }))
}

async function getAllProducts() {
    var url = new URL("http://localhost/api/recievers/productReciever.php")
    var params = {action: "getAllProducts"} 
    url.search = new URLSearchParams(params);

    let products = await makeRequest(url, "GET")
    renderProducts(products)
}


async function updateCartCounter(userID) {
    let url = new URL("http://localhost/api/recievers/productReciever.php")
        
    let params = {action: "getCartCounter", userID: userID}
    console.log(params)
    url.search = new URLSearchParams(params)
    console.log(url)

    let cartItem = await makeRequest(url, "GET")
    /* console.log(cartItem) */

    document.getElementById("cartCounter").innerText = cartItem[0].quant
      
}



async function getCategory(category) {
    //FETCHES ARRAY OF PRODUCTS CONTAINED IN A CATEGORY. categoryID SET IN PARAMETER.

    var url = new URL("http://localhost/api/recievers/productReciever.php")
    
    var params = {action: "getCategory", categoryID: category} 
    url.search = new URLSearchParams(params);

let products = await makeRequest(url, "GET")
renderProducts(products)

}

async function getProduct(product) {
    //FETCHES SPECIFIC PRODUCT. prodID SET IN PARAMETER.

    var url = new URL("http://localhost/api/recievers/productReciever.php")
    
    var params = {action: "getProduct", productID: product } 
    url.search = new URLSearchParams(params);

let products = await makeRequest(url, "GET")
console.log(products)

}


async function addProductToCart(){
    
    const productID = this.data.id
    let cartItemlist = []
    userID = 1 // för inställd userID
    var url = new URL("http://localhost/api/recievers/productReciever.php")
    
    var params = {action: "getcartitem", userID: userID} 
    url.search = new URLSearchParams(params);
    cartItemlist = await makeRequest(url, "GET")
    

    	for (let i = 0; i < cartItemlist.length; i++) {
            const checkID = cartItemlist[i].prodID;

            console.log(checkID)
            if (checkID == productID){
               

                let body = new FormData()
                body.append("action", "addQty")
            
                const result = await makeRequest("http://localhost/api/recievers/productReciever.php", "POST",body)
               
            return

            } else if(checkID != productID){
                
            }
        }
        addNewProduct()
        async function addNewProduct(){
            const product = {
                userID:userID,
                prodID:productID,
                quantity:1    
            } 
            let body = new FormData()
            body.append("action", "addProductToCart")
            body.append("product", JSON.stringify(product))
            
            const result = await makeRequest("http://localhost/api/recievers/productReciever.php", "POST",body)
            
            
            
            var url = new URL("http://localhost/api/recievers/productReciever.php")
            var params = {action: "addProductToCart", productID: product} 
            url.search = new URLSearchParams(params);
            return
        }
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
