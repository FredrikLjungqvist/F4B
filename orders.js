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
    let orderText = document.createElement("h2")
    orderText.style.padding = "20px"
    orderText.innerText = "Mina ordrar"
    orderText.style.justifyContent = "center"

    /* orders.forEach((orders) => { */

        let renderCardOrder = document.createElement("div")

        let orderNum = document.createElement("h5")
        orderNum.style.padding = "20px"
        orderNum.innerText = "Beställningsnummer" + " #3446757686"

        let table = document.createElement("table")

        let tableHeadRow = document.createElement("tr")
        
        let tableHeadName = document.createElement("th")
        tableHeadName.innerText = "Produkt"
        tableHeadName.style.padding = "10px"

        
        let tableTotalPrice = document.createElement("th")
        tableTotalPrice.innerText = "Totalsumma"

        let orderDate = document.createElement("th")
        orderDate.innerText = "Beställningsdatum"

        let tableOrderStat = document.createElement("th")
        tableOrderStat.innerText = "Order Status"


        /* let tableHeadQuant = document.createElement("th")
        tableHeadQuant.innerText = "Antal" */

        /* image.src = "./pictures/" + product.image
        image.style.maxHeight = "150px" */
    
        renderCardOrder.append(orderText, orderNum)
        table.append(tableHeadName,tableTotalPrice, orderDate, tableOrderStat)
        table.append(tableHeadRow)
        renderCardOrder.append(table)
    

        document.getElementById("productCardOrder").appendChild(renderCardOrder);
    
        /* orders.orderItem.forEach((orderItem) => { */
            
           let tableProductRow = document.createElement("tr")
           
            let tableDescName = document.createElement("td")
            tableDescName.innerText = "F4B-FRILUFT Bärsystem-30"

            let tableDescPrice = document.createElement("td")
            tableDescPrice.innerText = "1233kr"

            let tabOrderDate = document.createElement("td")
            tabOrderDate.innerText = "2021-03-12"

            let tabOrdStat = document.createElement("td")
            tabOrdStat.innerText = "Skickad"

            let image = document.createElement("img")
            image.classList.add("card-img-top", "img-fluid")    
            image.style.width = "150px"
            image.style.height = "200px"
            image.style.background = "rgb(28, 58, 28)"
           

            let line = document.createElement("hr")
            line.style.borderTop = "3px solid rgb(28, 58, 28)"
            
            let tableDescQuantity = document.createElement("td")
            tableDescQuantity.innerText = "10"

            tableProductRow.append(tableDescName, tableDescPrice, tabOrderDate, tabOrdStat,)
            table.append(tableProductRow)
            table.append(image)
            table.append(line)

            /* let tableDescQuantity = document.createElement("td")
            tableDescQuantity.innerText = "10" */
            
        /* }) */


     /*   }); */
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