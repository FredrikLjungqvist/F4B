window.addEventListener("load", initsite)

function initOrder() {
    document.getElementById("productCardOrder").innerHTML = "";
    document.getElementById("productCard").innerHTML = "";
    document.getElementById("productCardCart").innerHTML = "";

    /* const orders = await request("./api/recievers/orderReciever.php", "GET")
    console.log(orders) */
    renderOrders()

}

function renderOrders() {
    document.getElementById("productCardOrder").innerHTML = "";

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

    let orderText = document.createElement("h2")
    orderText.style.padding = "20px"
    orderText.innerText = "Mina beställningar"
    orderText.style.justifyContent = "center"

    /* orders.forEach((orders) => { */

    let renderCardOrder = document.createElement("div")

    let orderNum = document.createElement("h4")
    orderNum.style.padding = "20px"
    orderNum.innerText = "Beställningsnummer" + " #3446757686"

    let table = document.createElement("table")

    let tableHeadRow = document.createElement("tr")

    /* let tableHeadName = document.createElement("th")
    tableHeadName.innerText = "Produkt"
    tableHeadName.style.padding = "10px" */


    let tableTotalPrice = document.createElement("th")
    tableTotalPrice.innerText = "Totalsumma"
    tableTotalPrice.fontSize = "20px"

    let orderDate = document.createElement("th")
    orderDate.innerText = "Beställningsdatum"

    let tableOrderStat = document.createElement("th")
    tableOrderStat.innerText = "Order Status"


    renderCardOrder.append(imagePic, imagePicTwo, orderText, orderNum)
    table.append(tableTotalPrice, orderDate, tableOrderStat)
    table.append(tableHeadRow)
    renderCardOrder.append(table)



    document.getElementById("productCardOrder").appendChild(renderCardOrder);

    /* orders.orderItem.forEach((orderItem) => { */

    let tableProductRow = document.createElement("tr")

    /* let tableDescName = document.createElement("td")
    tableDescName.innerText = "F4B-FRILUFT Bärsystem-30" */

    let tableDescPrice = document.createElement("td")
    tableDescPrice.innerText = "1233kr"

    let tabOrderDate = document.createElement("td")
    tabOrderDate.innerText = "2021-03-12"

    let tabOrdStat = document.createElement("td")
    tabOrdStat.innerText = "Skickad"

    /*  let image = document.createElement("img")
      image.classList.add("card-img-top", "img-fluid", "d-flex")    
      image.style.width = "150px"
      image.style.height = "200px"
      image.style.background = "rgb(28, 58, 28)" */


    let line = document.createElement("hr")
    line.style.borderTop = "2px solid rgb(28, 58, 28)"
    line.style.width = "58%"
    line.style.marginLeft = "0px"

    
    tableProductRow.append(tableDescPrice, tabOrderDate, tabOrdStat)
    table.append(tableProductRow)
    cardBody.append(image)
    cardBody.append(title)
    cardBody.append(cardText)
    renderCardOrder.append(cardBody)
    renderCardOrder.append(line)

    /* let tableDescQuantity = document.createElement("td")
    tableDescQuantity.innerText = "10" */

    /* let tableHeadQuant = document.createElement("th")
tableHeadQuant.innerText = "Antal" */

    /* image.src = "./pictures/" + product.image
    image.style.maxHeight = "150px" */

    /* }) */


    /*   }); */
}


//dessa rader ska upp
let renderCard = document.createElement("div")
renderCard.classList.add("card", "mx-3", "my-3", "py-2")
renderCard.style.width = "15%"
renderCard.style.height = "auto"
renderCard.style.margin = "2px"

let cardBody = document.createElement("div");
cardBody.classList.add("card-body")

let image = document.createElement("img")
image.classList.add("card-img-top", "img-fluid")
image.style.width = "140px"
image.style.height = "140px"
/* image.src = "./pictures/" + product.image */
image.style.maxHeight = "150px"
image.style.background = "rgb(28, 58, 28)"

let title = document.createElement("p")
title.classList.add("card-title")
title.innerText = "F4B-FRILUFT Bärsystem-30"
title.style.fontWeight = "bold"
title.style.fontSize = "11px"

let cardText = document.createElement("p")
cardText.classList.add("card-text")
cardText.innerText = "Antal: 10"
cardText.style.marginTop = "10px"
cardText.style.fontSize = "12px"




async function makeRequest(url, method, body) {
    // Using fetch to send REST method and body (if set) to set path. Returns response or error
    try {
        const response = await fetch(url, { method, body })
        return response.json()

    } catch (error) {
        console.log("det belv fel" + error)
    }
}