function initCart() {
    
    getCart()
}

function renderCart() {
    document.getElementById("productCard").innerHTML=""
    console.log(getCart())


}

async function getCart() {
    var url = new URL("http://localhost/api/recievers/productReciever.php")
    var params = {action: "getCart", userID: 1} 
    url.search = new URLSearchParams(params);

    let products = await makeRequest(url, "GET")
    console.log(products)
}