window.addEventListener("load", initsite)

function initOrder() {
    document.getElementById("productCardOrder").innerHTML = "";
    document.getElementById("productCard").innerHTML = "";
    document.getElementById("productCardCart").innerHTML = "";

    /* const order = await request("./api/recievers/orderReciever.php", "GET")
    console.log(order) */
    renderOrders()

}

async function renderOrders() {
    document.getElementById("productCardOrder").innerHTML = "";
    let order = await orderCart()
    console.log(order)

    /* if (!orders) {
        let emptyOrder = document.createElement("h3")
        emptyOrder.innerText = "Inga ordrar gjorda..."
        mainElement.appendChild(emptyOrder)
    } */

    let imagePic = document.createElement("img")
    imagePic.append("img-fluid")
    imagePic.src = "./pictures/hikingBoot.png"
    imagePic.style.maxWidth = "50%"
    imagePic.style.height = "auto"

    let imagePicTwo = document.createElement("img")
    imagePicTwo.append("img-fluid")
    imagePicTwo.src = "./pictures/fjällräven.png"
    imagePicTwo.style.maxWidth = "50%"
    imagePicTwo.style.height = "auto"

    let orderHeadText = document.createElement("h2")
    orderHeadText.innerText = "Din beställning"
    orderHeadText.style.padding = "20px"
    orderHeadText.style.justifyContent = "center"


    //order
    let renderCardOrder = document.createElement("div")

    let orderNum = document.createElement("h4")
    orderNum.style.padding = "20px"
    orderNum.innerText = "Beställningsnummer" + " #" + order.orderID

    let table = document.createElement("table")

    let tableHeadRow = document.createElement("tr")

    let orderTotPrice = document.createElement("th")
    orderTotPrice.innerText = "Totalsumma"
    orderTotPrice.fontSize = "20px"

    let orderDate = document.createElement("th")
    orderDate.innerText = "Beställningsdatum"

    let orderStat = document.createElement("th")
    orderStat.innerText = "Order Status"


    renderCardOrder.append(imagePic, imagePicTwo, orderHeadText, orderNum)
    table.append(orderTotPrice, orderDate, orderStat)
    table.append(tableHeadRow)
    renderCardOrder.append(table)

    document.getElementById("productCardOrder").appendChild(renderCardOrder);


    /* orderItems.forEach((orderItem) => {   */

    let tableProductRow = document.createElement("tr")

    let tbOrderPrice = document.createElement("td")
    tbOrderPrice.innerText = order.totalPrice + " kr"

    let tdOrderDate = document.createElement("td")
    tdOrderDate.innerText = order.date

    let tdOrdStat = document.createElement("td")
    tdOrdStat.innerText = "Skickad"


    //loopa över order.orderItems för bild/quant
    
    let renderCard = document.createElement("div")
    renderCard.classList.add("card", "mx-3", "my-3", "py-2")
    renderCard.style.width = "15%"
    renderCard.style.height = "auto"
    renderCard.style.margin = "2px"

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body")

    /* order.orderItems.forEach((orderItem) => { */
    let orderImage = document.createElement("img")
    orderImage.classList.add("card-img-top", "img-fluid")
    orderImage.style.width = "140px"
    orderImage.style.height = "140px"
    /* orderImage.src = "./pictures/" + product.image */
    orderImage.style.maxHeight = "150px"
    orderImage.style.background = "rgb(28, 58, 28)"
/* }) */
    let orderTitle = document.createElement("p")
    orderTitle.classList.add("card-title")
    orderTitle.innerText = "F4B-FRILUFT Bärsystem-30"
    orderTitle.style.fontWeight = "bold"
    orderTitle.style.fontSize = "11px"

   
    let orderQuant = document.createElement("p")
    orderQuant.classList.add("card-text")
    orderQuant.innerText = "Antal:"
    orderQuant.style.marginTop = "10px"
    orderQuant.style.fontSize = "12px"
//kör foorloop för bild
/* }) */
    let line = document.createElement("hr")
    line.style.borderTop = "2px solid rgb(28, 58, 28)"
    line.style.width = "58%"
    line.style.marginLeft = "0px"


    tableProductRow.append(tbOrderPrice, tdOrderDate, tdOrdStat)
    table.append(tableProductRow)
    cardBody.append(orderImage, orderTitle, orderQuant)
    renderCardOrder.append(cardBody)
    renderCardOrder.append(line)

}

/* async function getOrder(order) {
    var url = new URL("http://localhost/api/recievers/productReciever.php")
    var params = {action: "getOrder", userID: 1} 
    url.search = new URLSearchParams(params);

    let order = await makeRequest(url, "GET")
    console.log(order)
    renderOrders(order)
    return order
} */

async function makeRequest(url, method, body) {
    // Using fetch to send REST method and body (if set) to set path. Returns response or error
    try {
        const response = await fetch(url, { method, body })
        return response.json()

    } catch (error) {
        console.log("det belv fel" + error)
    }
}