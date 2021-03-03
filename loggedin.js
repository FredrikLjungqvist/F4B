document.getElementById("userpages").addEventListener("click",loginCheck)
document.getElementById("logout").addEventListener("click", logout)
async function loginCheck(){
    console.log("loginCheck")
    
    let url = new URL("http://localhost/api/recievers/userReciever.php")
        
    let params = {action: "loginCheck"}
    url.search = new URLSearchParams(params)

    let response = await makeRequest(url, "GET")
    console.log(response)
    if (response.username && response.role == "admin") {
        console.log(response)

        renderAdmin(response.username)
    }else if (response.username && response.role == "user") {
        console.log("user finns")
        render(response.username)

    } else {
        console.log("ingen user")
        showLogin()
    }
}

async function getUser() {

    let url = new URL("http://localhost/api/recievers/userReciever.php")
    let params ={action: "getUser"}
    url.search = new URLSearchParams(params)
    let user = await makeRequest(url, "GET")
    return user
}



async function registerUser(){
    console.log("registerUser")

    let userCreation = {
        role:"user",
        username: document.getElementById("usernameToSave").value,
        password: document.getElementById("passwordToSave").value,
        firstName: document.getElementById("firstnameinput").value,
        lastName: document.getElementById("lastnamnInput").value,
        email: document.getElementById("inputEmail4").value,
        mobilePhone: document.getElementById("phoneInput").value,
        country: document.getElementById("countryInput").value,
        
        city: document.getElementById("inputCity").value,
        address1: document.getElementById("inputAddress").value,
        address2: document.getElementById("adresstwoInput").value,
        zipCode: document.getElementById("inputZip").value
    }

    const body = new FormData()
    
    body.append("userCreation", JSON.stringify(userCreation))

    let response = await makeRequest("./api/recievers/userReciever.php", "POST", body)
    console.log(response)
}

async function loginUser(){
    console.log("loginUser")
    $('#myModal').modal('hide')
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const body = new FormData()
    body.append("username", username)
    body.append("password", password)

    let response = await makeRequest("./api/recievers/userReciever.php", "POST", body)
    console.log(response)
    if(response ==="loginerror"){
        alert("Felaktigt användarnamn eller lösenord")
        return
    } else{
        initsite()
    }
    
}

function hidelogin(){
    console.log("hidelogin")
    document.getElementById("loginPopUp").style.display="none"
    document.getElementById("logout").style.display="block"
    document.getElementById("userpages").style.display="block"
}
function showLogin(){
    console.log("Showlogin")
    document.getElementById("loginPopUp").style.display="block"
    document.getElementById("logout").style.display="none"
    document.getElementById("userpages").style.display="none"
}

async function logout() {
    console.log("Logout")
    document.getElementById("logout").style.display="none"
    document.getElementById("productCard").innerHTML=""
    let url = new URL("http://localhost/api/recievers/userReciever.php")
    
    let params = {action: "logout"}
    url.search = new URLSearchParams(params)
    
    let response = await makeRequest(url, "GET")
    console.log(response)
    document.getElementById("productCardCart").innerHTML = ""
    document.getElementById("customerInfo").innerHTML = ""
    document.getElementById("productCardOrder").innerHTML = ""
    document.getElementById("shippingInfo").innerHTML = ""
    initsite()
}

async function render(user){
    console.log("render")
    document.getElementById("productCardCart").innerHTML=""
    document.getElementById("productCard").innerText=""
    document.getElementById("customerInfo").innerText=""
    document.getElementById("shippingInfo").innerText=""
    document.getElementById("productCardOrder").innerText=""
    
    let renderCardOrder = document.createElement("div")
    
    let houseimage = document.createElement("img")
    houseimage.append("img-fluid")
    houseimage.src = "./pictures/vandring2.png"
    houseimage.style.maxWidth = "100%"
    houseimage.style.height = "auto"
    houseimage.style.marginTop = "5%"
    
    
    let renderCardDiv = document.createElement("div")
    renderCardDiv.style.width = "100%"
    
    let houseHeadtitle = document.createElement("h1")
    houseHeadtitle.innerText = "Välkommen " + user
    houseHeadtitle.style.padding = "5%"
    houseHeadtitle.style.marginTop = "-16%"
    houseHeadtitle.style.color = "white"
    
    productCard.append(houseimage, renderCardDiv)
    renderCardDiv.append(houseHeadtitle)
    document.getElementById("productCard").appendChild(renderCardDiv);
    hidelogin()
    
    
    let orderHeadText = document.createElement("h2")
    orderHeadText.innerText = "Tidigare beställningar"
    orderHeadText.style.marginLeft = "10%"
    orderHeadText.style.marginTop = "30px"
    
    renderCardOrder.append(orderHeadText)
    document.getElementById("productCard").append(renderCardOrder)
    //ordercard
    
    let orders = await getOrders()
    console.log(orders)
    orders.forEach(order => { 
        console.log(order)
        
        
        
        let orderNum = document.createElement("h4")
        orderNum.innerText = "Beställningsnummer" + " #" + order.orderID
        
        
        let table = document.createElement("table")
        table.style.marginLeft = "10%"
        
        let tableHeadRow = document.createElement("tr")
        
        let orderProd = document.createElement("th")
        orderProd.innerText = "Produkt"
        orderProd.fontSize = "20px"
        
        let orderTotQuant = document.createElement("th")
        orderTotQuant.innerText = "Antal"
        orderTotQuant.fontSize = "20px"
        
        let recivedbtn = document.createElement("input")
        recivedbtn.type = "checkbox"
        recivedbtn.style.width="100px"
        recivedbtn.classList.add("btn")
        recivedbtn.innertext ="Tagit Mottagen Order"

        let orderTotPrice = document.createElement("h5")
        orderTotPrice.style.marginLeft = "10%"
        orderTotPrice.style.marginTop = "30px"
        orderTotPrice.innerText = "Totalsumma"
        orderTotPrice.fontSize = "20px"
        
        let orderDate = document.createElement("h5")
        orderDate.style.marginLeft = "10%"
        orderDate.style.marginTop = "30px"
        orderDate.innerText = order.date//"Beställningsdatum"
        
        let orderStat = document.createElement("th")
        orderStat.innerText = "Order Status"
        
       /*  let quantityToSave = orderItem.quantity
        let orderID = orderItem.orderID */
        
        
        renderCardOrder.append(orderNum,orderDate,orderTotPrice)
        table.append(orderProd,orderTotQuant, orderStat,recivedbtn)
        table.append(tableHeadRow)
        renderCardOrder.append(table)
        
        document.getElementById("customerInfo").appendChild(renderCardOrder);
        
        let tableProductRow = document.createElement("tr")
        
        let tbOrderPrice = document.createElement("td")
        tbOrderPrice.innerText = order.totalPrice + " kr"
        
        let tdOrderDate = document.createElement("td")
        tdOrderDate.innerText = order.date
        
        let tdOrdStat = document.createElement("td")
        tdOrdStat.innerText = order.orderStatus
        
        order.orderItems.forEach(orderItem => {  
            
            let tdProdName = document.createElement("td")
            tdProdName.innerText = orderItem.product[0].name
            
            let tdOrdQuant = document.createElement("td")
            tdOrdQuant.innerText = orderItem.quantity
 
        tableProductRow.append(tdProdName,tdOrdQuant, tbOrderPrice, tdOrderDate, tdOrdStat)
        table.append(tableProductRow)
    
    
        })

        let lineTwo = document.createElement("hr")
        lineTwo.style.borderTop = "2px solid rgb(28, 58, 28)"
        lineTwo.style.width = "58%"
        lineTwo.style.marginLeft = "10%"

        renderCardOrder.append(lineTwo)
        
     })
}    
   