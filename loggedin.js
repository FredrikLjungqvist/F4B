document.getElementById("userpages").addEventListener("click", loginCheck)
document.getElementById("logout").addEventListener("click", logout)

async function loginCheck() {
    let url = new URL("http://localhost/api/recievers/userReciever.php")

    let params = { action: "loginCheck" }
    url.search = new URLSearchParams(params)

    let response = await makeRequest(url, "GET")

    if (response.username && response.role == "admin") {

        hidelogin()

        renderAdmin(response.username)
    } else if (response.username && response.role == "user") {

        hidelogin()
        render(response.username)

    } else {
        
        showLogin()
    }
}

async function loginCheckStart() {

    let url = new URL("http://localhost/api/recievers/userReciever.php")

    let params = { action: "loginCheck" }
    url.search = new URLSearchParams(params)

    let response = await makeRequest(url, "GET")
    
    if (response.username && response.role == "admin") {

        hidelogin()

    } else if (response.username && response.role == "user") {

        hidelogin()

    } else {
        showLogin()

    }
}

async function getUser() {

    let url = new URL("http://localhost/api/recievers/userReciever.php")
    let params = { action: "getUser" }
    url.search = new URLSearchParams(params)
    let user = await makeRequest(url, "GET")
    return user
}

async function registerUser() {

    let userCreation = {
        role: "user",
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
}

async function loginUser() {
    /* hidelogin()  */
    $('#myModal').modal('hide')
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const body = new FormData()
    body.append("username", username)
    body.append("password", password)

    let response = await makeRequest("./api/recievers/userReciever.php", "POST", body)
    if (response === "loginerror") {


        alert("Felaktigt användarnamn eller lösenord")
        return
    }
    initsite()
}

function hidelogin() {
    document.getElementById("loginPopUp").style.display = "none"
    document.getElementById("logout").style.display = "block"
    document.getElementById("userpages").style.display = "block"
}
function showLogin() {
    document.getElementById("loginPopUp").style.display = "block"
    document.getElementById("logout").style.display = "none"
    document.getElementById("userpages").style.display = "none"
}

async function logout() {
    document.getElementById("logout").style.display = "none"
    document.getElementById("productCard").innerHTML = ""
    let url = new URL("http://localhost/api/recievers/userReciever.php")

    let params = { action: "logout" }
    url.search = new URLSearchParams(params)

    let response = await makeRequest(url, "GET")
    document.getElementById("productCardCart").innerHTML = ""
    document.getElementById("customerInfo").innerHTML = ""
    document.getElementById("productCardOrder").innerHTML = ""
    document.getElementById("shippingInfo").innerHTML = ""
    initsite()
}

async function orderReceived() {

    const ID = {
        ID: this.data
    }

    const body = new FormData()
    body.append("action", "orderReceived")
    body.append("ID", JSON.stringify(ID))

    let response = await makeRequest("./api/recievers/orderReciever.php", "POST", body)
    loginCheck()
}

async function askAdmin() {
    let id = {
        id: await getUser()
    }
    const body = new FormData()
    body.append("action", "becomeAdmin")
    body.append("id", JSON.stringify(id))

    let response = await makeRequest("./api/recievers/adminReciever.php", "POST", body)
  
}


async function render(user) {

    document.getElementById("productCardCart").innerHTML = ""
    document.getElementById("productCard").innerText = ""
    document.getElementById("customerInfo").innerText = ""
    document.getElementById("shippingInfo").innerText = ""
    document.getElementById("productCardOrder").innerText = ""

    let url = new URL("http://localhost/api/recievers/userReciever.php")

    let params = { action: "loginCheck" }
    url.search = new URLSearchParams(params)

    let response = await makeRequest(url, "GET")

    let renderCardOrder = document.createElement("div")


    let houseimage = document.createElement("img")
    houseimage.append("img-fluid")
    houseimage.src = "./pictures/vandring2.png"
    houseimage.style.maxWidth = "100%"
    houseimage.style.height = "auto"
    houseimage.style.marginTop = "5%"


    let renderCardDiv = document.createElement("div")
    renderCardDiv.style.width = "100%"

    let houseHeadtitle = document.createElement("p")
    houseHeadtitle.innerText = "Välkommen " + response.username
    houseHeadtitle.style.padding = "5%"
    houseHeadtitle.style.marginTop = "-16%"
    houseHeadtitle.style.color = "white"
    houseHeadtitle.style.fontSize = "3vw"

    productCard.append(houseimage, renderCardDiv)
    renderCardDiv.append(houseHeadtitle)
    document.getElementById("productCard").appendChild(renderCardDiv);


    let orderHeadText = document.createElement("h2")
    orderHeadText.innerText = "Tidigare beställningar"
    orderHeadText.style.marginLeft = "10%"
    orderHeadText.style.marginTop = "30px"

    let Adminviewbtn = document.createElement("button")
    Adminviewbtn.id = "Adminviewbtn"
    Adminviewbtn.style.marginLeft = "10%"
    Adminviewbtn.style.marginTop = "5px"
    Adminviewbtn.classList.add("btn", "btn-secondary")
    Adminviewbtn.innerText = "Admin vy"
    Adminviewbtn.addEventListener("click", renderAdmin)

    let AdminAskbtn = document.createElement("button")
    AdminAskbtn.id = "AdminAskbtn"
    AdminAskbtn.style.marginLeft = "10%"
    AdminAskbtn.style.marginTop = "5px"
    AdminAskbtn.classList.add("btn", "btn-secondary")
    AdminAskbtn.innerText = "begäran om att bli admin"
    AdminAskbtn.addEventListener("click", askAdmin)


    let orderStatusCheck = document.createElement("h6")
    orderStatusCheck.innerText = "1 = underbehandling | 2 = skickad | 3 = mottagen"
    orderStatusCheck.style.marginLeft = "10%"
    orderStatusCheck.style.marginTop = "10px"
    orderStatusCheck.style.fontSize = "11px"

    if (response.role == "admin") {

        renderCardOrder.append(Adminviewbtn, orderHeadText, orderStatusCheck)
    } else if (response.role == "user") {

        renderCardOrder.append(AdminAskbtn, orderHeadText, orderStatusCheck)
    } else {
        alert("något gick fel, är du verkligen en användare?")
    }

    document.getElementById("productCard").append(renderCardOrder)

    let orders = await getOrders()

    orders.forEach(order => {
        
        let ordertable = document.createElement("div")
        ordertable.style.marginLeft = "10%"
        orderStatusCheck.style.marginBottom = "50px"
        ordertable.classList.add("d-flex", "flex-wrap", "m")


        let orderNum = document.createElement("h6")
        orderNum.innerText = "Ordernummer" + " #" + order.orderID

        let table = document.createElement("div")
        table.style.marginLeft = "10%"
        table.classList.add("d-flex", "flex-wrap", "flex-column")

        let tableHeadRow = document.createElement("div")

        let orderProd = document.createElement("h6")
        orderProd.style.marginTop = "20px"
        orderProd.innerText = "Produkt"

        let orderTotPrice = document.createElement("h6")
        orderTotPrice.style.marginLeft = "10px"
        orderTotPrice.style.marginRight = "10px"
        orderTotPrice.innerText = "Totalsumma: " + order.totalPrice + " kr"


        let orderDate = document.createElement("h6")
        orderDate.style.marginLeft = "10px"
        orderDate.innerText = order.date

        let orderStat = document.createElement("h6")
        orderStat.innerText = "Status " + order.orderStatus

        if (order.orderStatus == 2) {

            let receivedBtn = document.createElement("button")
            receivedBtn.innerText = "Mottagen"
            receivedBtn.classList.add("btn", "text-white", "mx-3")
            receivedBtn.style.background = "rgb(28, 58, 28)"
            receivedBtn.addEventListener("click", orderReceived)
            receivedBtn.data = order.orderID

            ordertable.append(orderNum, orderDate, orderTotPrice, orderStat, receivedBtn)
        } else {
            ordertable.append(orderNum, orderDate, orderTotPrice, orderStat)
        }

        table.append(orderProd)
    
        renderCardOrder.append(ordertable)

        table.append(orderProd)
        table.append(tableHeadRow)
        renderCardOrder.append(table)

        document.getElementById("productCardOrder").appendChild(renderCardOrder);

        let tableProductRow = document.createElement("div")
        tableProductRow.classList.add("d-flex", "flex-wrap", "flex-column")



        order.orderItems.forEach(orderItem => {

            let tdProdName = document.createElement("p")
            tdProdName.innerText = orderItem.product[0].name + " - " + orderItem.quantity + "st"

            tableProductRow.append(tdProdName)
            table.append(tableProductRow)

        })

        let lineTwo = document.createElement("hr")
        lineTwo.style.borderTop = "2px solid rgb(28, 58, 28)"
        lineTwo.style.width = "58%"
        lineTwo.style.marginLeft = "10%"

        renderCardOrder.append(lineTwo)

    })
}

