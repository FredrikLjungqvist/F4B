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


    /* orders.forEach((orders) => { */

        orderBox = document.createElement("div")
    
        let table = document.createElement("table")

        let tableHeaderRow = document.createElement("tr")

        let tableHeadName = document.createElement("th")
        tableHeadName.innerText = "Name"

        let tableHeadPrice = document.createElement("th")
        tableHeadPrice.innerText = "Price"

        let tableHeadWeight = document.createElement("th")
        tableHeadWeight.innerText = "Weight"

        let tableHeadQuantity = document.createElement("th")
        tableHeadQuantity.innerText = "Quantity"
        table.append(tableHeadName, tableHeadPrice, tableHeadWeight, tableHeadQuantity)
        table.append(tableHeaderRow)

    
        /* orders.orderItem.forEach((orderItem) => { */
            
           let tableProductRow = document.createElement("tr")
           
            let tableDescName = document.createElement("td")
            tableDescName.innerText = "orderName"

            let tableDescPrice = document.createElement("td")
            tableDescPrice.innerText = "orderPrice" + " kr"
            
            let tableDescWeight = document.createElement("td")
            tableDescWeight.innerText = "OrderWeight"

            let tableDescQuantity = document.createElement("td")
            tableDescQuantity.innerText = orderItem.quantity

            tableProductRow.append(tableDescName, tableDescPrice, tableDescWeight, tableDescQuantity)
            table.append(tableProductRow)
        /* }) */


        mainElement.append(table)
/*         });
}
 */




async function makeRequest(url, method, body) {
    // Using fetch to send REST method and body (if set) to set path. Returns response or error
    try {
        const response = await fetch(url, {method,body})
        return response.json()
    
    } catch (error) {
        console.log("det belv fel"+error)
    }
}