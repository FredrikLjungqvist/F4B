window.addEventListener("load", initsite)

function initOrder() {
    document.getElementById("productCardOrder").innerHTML = "";
    document.getElementById("productCard").innerHTML = "";
    document.getElementById("productCardCart").innerHTML = "";

    renderOrders()
}

async function getOrders() {

    let url = new URL("http://localhost/api/recievers/orderReciever.php")
    var params = { action: "listOrder" }
    url.search = new URLSearchParams(params)

    let response = await makeRequest(url, "GET")
    return response
}

//renderar ut "orderkortet"/text på sidan
async function renderOrders(response) {
    document.getElementById("productCardOrder").innerHTML = "";
    document.getElementById("productCard").innerHTML = "";
    document.getElementById("productCardCart").innerHTML = "";
    document.getElementById("customerInfo").innerHTML = "";
    document.getElementById("shippingInfo").innerHTML = "";
    let orderlist = getOrders()
    let order = response

    let imagePic = document.createElement("img")
    imagePic.append("img-fluid")
    imagePic.src = "./pictures/hikingBoot.png"
    imagePic.style.maxWidth = "50%"
    imagePic.style.height = "auto"
    imagePic.style.marginTop = "10px"

    let imagePicTwo = document.createElement("img")
    imagePicTwo.append("img-fluid")
    imagePicTwo.src = "./pictures/fjällräven.png"
    imagePicTwo.style.maxWidth = "50%"
    imagePicTwo.style.height = "auto"
    imagePicTwo.style.marginTop = "10px"

    let orderHeadText = document.createElement("h2")
    orderHeadText.innerText = "Din beställning"
    orderHeadText.style.padding = "20px"
    orderHeadText.style.justifyContent = "center"

    //här börjar "orderkortet"
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

    let confirmBtn = document.createElement("button")
    confirmBtn.innerText = "Shoppa Vidare!"
    confirmBtn.classList.add("btn", "text-white")
    confirmBtn.style.background = "rgb(28, 58, 28)"
    confirmBtn.addEventListener("click", () => {
        alert("Bra JOBBAT! Nu blir du snygg och lätt i naturen!")
        initsite()
    })

    renderCardOrder.append(imagePic, imagePicTwo, orderHeadText, orderNum)
    table.append(orderTotPrice, orderDate, orderStat)
    table.append(tableHeadRow)
    renderCardOrder.append(table)

    document.getElementById("productCardOrder").appendChild(renderCardOrder);
    document.getElementById("productCardOrder").appendChild(confirmBtn);

    //loopar över table-datan
    let tableProductRow = document.createElement("tr")

    let tbOrderPrice = document.createElement("td")
    tbOrderPrice.innerText = order.totalPrice + " kr"

    let tdOrderDate = document.createElement("td")
    tdOrderDate.innerText = order.date

    let tdOrdStat = document.createElement("td")
    tdOrdStat.innerText = "Skickad"

    let renderCard = document.createElement("div")
    renderCard.classList.add("card", "mx-3", "my-3", "py-2")
    renderCard.style.width = "15%"
    renderCard.style.height = "auto"
    renderCard.style.margin = "2px"

    let orderBody = document.createElement("div");
    orderBody.classList.add("row")
    orderBody.style.maxWidth = "65%"

    console.log(order.orderItems)
    order.orderItems.forEach((orderItem) => {

        let quantityToSave = orderItem.quantity
        let orderID = orderItem.orderID

        //loopar över bild/antal
        orderItem.product.forEach((product) => {

            let cardBodyOrder = document.createElement("div")
            cardBodyOrder.classList.add("card-body")
            cardBodyOrder.style.maxWidth = "150px"
            cardBodyOrder.style.margin = "5px"

            let orderImage = document.createElement("img")
            orderImage.classList.add("card-img-top", "img-fluid")
            orderImage.style.width = "auto"
            orderImage.style.height = "100%"
            orderImage.src = "./pictures/" + product.image
            orderImage.style.maxWidth = "100px"
            orderImage.style.maxHeight = "100px"

            let orderTitle = document.createElement("p")
            orderTitle.classList.add("card-title")
            orderTitle.innerText = product.name
            orderTitle.style.fontWeight = "bold"
            orderTitle.style.fontSize = "11px"


            let orderQuant = document.createElement("p")
            orderQuant.classList.add("card-text")
            orderQuant.innerText = "Antal: " + quantityToSave
            orderQuant.style.marginTop = "10px"
            orderQuant.style.fontSize = "12px"

            cardBodyOrder.append(orderImage, orderTitle, orderQuant)
            orderBody.append(cardBodyOrder)
        })

    })
    let line = document.createElement("hr")
    line.style.borderTop = "2px solid rgb(28, 58, 28)"
    line.style.width = "58%"
    line.style.marginLeft = "0px"

    tableProductRow.append(tbOrderPrice, tdOrderDate, tdOrdStat)
    table.append(tableProductRow)

    renderCardOrder.append(orderBody)
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
