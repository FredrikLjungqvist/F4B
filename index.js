window.addEventListener("load", initsite)
function initsite(){
   
    document.getElementById("productCard").innerHTML = "";
    document.getElementById("productCardCart").innerHTML = "";
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
        renderCard.classList.add("card", "mx-3", "my-3", "py-2")
        renderCard.style.width = "15%"
        renderCard.style.height = "auto"
        renderCard.style.margin = "2px"

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "text-center")
        
        let image = document.createElement("img")
        image.classList.add("card-img-top", "img-fluid")    
        image.style.width = "auto"
        image.style.height = "80%"
        image.src = "./pictures/" + product.image
        image.style.maxHeight = "150px"

        let title = document.createElement("h6")
        title.classList.add("card-title")
        title.innerText = product.name

        let cardText = document.createElement("p")
        cardText.classList.add("card-text")
        cardText.innerText = product.price + " kr" + " " + product.weight + " g"
        let cardWeight = document.createElement("p")
        cardWeight.classList.add("card-text")

        let addbutton = document.createElement("button")
        addbutton.innerText = "Lägg i varukorgen"
        addbutton.classList.add("btn", "text-white")
        addbutton.style.background = "rgb(28, 58, 28)"

        addbutton.data = product
        addbutton.addEventListener("click", addProductToCart) /* () =>{
            alert ("you clicked the button");
    }); */
    
    cardBody.append(image)
    cardBody.append(title)
    cardBody.append(cardText)
    cardBody.append(cardWeight)
    cardBody.append(addbutton)
    renderCard.append(cardBody)

    document.getElementById("productCard").appendChild(renderCard);
  
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
    console.log("updateCartCounter")
    document.getElementById("cartCounter").innerText = ""
    let url = new URL("http://localhost/api/recievers/productReciever.php")
        
    let params = {action: "getCartCounter", userID: userID}
    console.log(params)
    url.search = new URLSearchParams(params)
    console.log(url)

    let cartItem = await makeRequest(url, "GET")

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
    console.log(productID)
    let cartItemlist = []
    const userID = 1 // för inställd userID
    var url = new URL("http://localhost/api/recievers/productReciever.php")
    
    var params = {action: "getcartitem", userID: userID} 
    url.search = new URLSearchParams(params);
    cartItemlist = await makeRequest(url, "GET")
    

    	for (let i = 0; i < cartItemlist.length; i++) {
            const checkID = cartItemlist[i].prodID;

            if (checkID == productID){
                
                const product = {
                    userID:userID,
                    prodID:productID  
                } 

                let body = new FormData()
                body.append("action", "addQty")
                body.append("product", JSON.stringify(product))
            
                const result = await makeRequest("http://localhost/api/recievers/productReciever.php", "POST",body)

                console.log(result)
                updateCartCounter(1)
                return

            } else if(checkID != productID){
                
            }
        }
        addNewProduct(1)
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
            console.log(result)
            updateCartCounter(1)
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
