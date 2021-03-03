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

function render(user){
    console.log("render")
    document.getElementById("productCardCart").innerHTML=""
    document.getElementById("productCard").innerText=""
    document.getElementById("customerInfo").innerText=""
    document.getElementById("shippingInfo").innerText=""

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

//ordercard

    /* orders.forEach(order => { */

    let renderCardOrder = document.createElement("div")
    

    let orderNum = document.createElement("h4")
    orderNum.innerText = "Beställningsnummer" + " #" //+ order.orderID
    orderNum.style.marginLeft = "10%"
    orderNum.style.marginTop = "30px"

    let table = document.createElement("table")
    table.style.marginLeft = "10%"

    let tableHeadRow = document.createElement("tr")
    
    let orderProd = document.createElement("th")
    orderProd.innerText = "Produkt"
    orderProd.fontSize = "20px"

    let orderTotQuant = document.createElement("th")
    orderTotQuant.innerText = "Antal"
    orderTotQuant.fontSize = "20px"

    let orderTotPrice = document.createElement("th")
    orderTotPrice.innerText = "Totalsumma"
    orderTotPrice.fontSize = "20px"

    let orderDate = document.createElement("th")
    orderDate.innerText = "Beställningsdatum"

    let orderStat = document.createElement("th")
    orderStat.innerText = "Order Status"


    renderCardOrder.append(orderHeadText,orderNum)
    table.append(orderProd,orderTotQuant, orderTotPrice, orderDate, orderStat)
    table.append(tableHeadRow)
    renderCardOrder.append(table)

    document.getElementById("customerInfo").appendChild(renderCardOrder);


    /* orderItems.forEach((orderItem) => {   */
    
    let tdProdName = document.createElement("td")
    tdProdName.innerText = "F4B-FRILUFT Bärsystem-30"

    let tdOrdQuant = document.createElement("td")
    tdOrdQuant.innerText = "100"

    let tableProductRow = document.createElement("tr")

    let tbOrderPrice = document.createElement("td")
    tbOrderPrice.innerText = "pris"//order.totalPrice + " kr"

    let tdOrderDate = document.createElement("td")
    tdOrderDate.innerText = "date" //order.date

    let tdOrdStat = document.createElement("td")
    tdOrdStat.innerText = "Skickad"


    //loopa över order.orderItems för bild/quant
    
    let renderCard = document.createElement("div")
    renderCard.classList.add("card", "mx-3", "my-3", "py-2")
    renderCard.style.width = "15%"
    renderCard.style.height = "auto"
    renderCard.style.margin = "2px"

    let orderBody = document.createElement("div");
    orderBody.classList.add("row")
    orderBody.style.maxWidth = "65%"

    /* console.log(order.orderItems)
    order.orderItems.forEach((orderItem) => { */

        /* let quantityToSave = orderItem.quantity
        let orderID = orderItem.orderID

    orderItem.product.forEach((product) => { */

    let cardBodyOrder = document.createElement("div")
    cardBodyOrder.classList.add("card-body")
    cardBodyOrder.style.maxWidth = "150px"
    cardBodyOrder.style.margin = "5px"

    let orderImage = document.createElement("img")
    orderImage.classList.add("card-img-top", "img-fluid")
    orderImage.style.background = "purple"
    orderImage.style.width = "auto"
    orderImage.style.height = "100%"
    /* orderImage.src = "./pictures/" + product.image */
    orderImage.style.maxWidth = "100px"
    orderImage.style.maxHeight = "100px"

    let orderTitle = document.createElement("p")
    orderTitle.classList.add("card-title")
    orderTitle.innerText = "title"//product.name
    orderTitle.style.fontWeight = "bold"
    orderTitle.style.fontSize = "11px"

    let orderQuant = document.createElement("p")
    orderQuant.classList.add("card-text")
    orderQuant.innerText = "Antal: " //+ quantityToSave
    orderQuant.style.marginTop = "10px"
    orderQuant.style.fontSize = "12px"

    /* cardBodyOrder.append(orderImage, orderTitle, orderQuant) */
    orderBody.append(cardBodyOrder)
/* })

}) */
    let lineTwo = document.createElement("hr")
    lineTwo.style.borderTop = "2px solid rgb(28, 58, 28)"
    lineTwo.style.width = "58%"
    lineTwo.style.marginLeft = "10%"


    tableProductRow.append(tdProdName,tdOrdQuant, tbOrderPrice, tdOrderDate, tdOrdStat)
    table.append(tableProductRow)
    
    /* renderCardOrder.append(orderBody) */
    renderCardOrder.append(lineTwo)
/* }); */
}


function loginModal(){
    document.getElementById("modalpop").innerHTML = "";
    console.log("LoginModal")
    
    let renderModal = document.createElement("div")
    renderModal.id="myModal"
    renderModal.classList.add("modal")
    renderModal.style.minWidth="180px"
    renderModal.tabIndex="-1"
    
    
    let modaldialog = document.createElement("div")
    modaldialog.classList.add=("modal-dialog")
    
    let modalContent = document.createElement("div")
    modalContent.classList.add("modal-content","modal-sm")
    modalContent.style.marginTop ="100px"
    modalContent.style.Width="180px"
    
    //header of modal
    let header = document.createElement("div")
    header.classList.add("modal-header")
    
    //the body of modal
    let modalbody = document.createElement("div")
    modalbody.classList.add("modal-body")
    
    //footer of modal
    let modalfooter = document.createElement("div")
    modalfooter.classList.add("modal-footer")
    
    // in header
    let title = document.createElement("h3")
    title.innerText = "Logga in"
    
    let closeModal = document.createElement("button")
    closeModal.classList.add("close")
    closeModal.innerText="Stäng"
    closeModal.addEventListener("click", ()=>{
        $('#myModal').modal('hide')
    })
    
    // in body
    let userInput = document.createElement("input")
    userInput.id = "username"
    userInput.classList.add("form-group", "m-2")
    userInput.placeholder ="Användarnamn"
    
    let passwordInput = document.createElement("input")
    passwordInput.id = "password"
    passwordInput.classList.add("form-group", "m-2")
    passwordInput.type="password"
    passwordInput.placeholder ="Lösenord"
    
    //in footer
    let loginbtn = document.createElement("button")
    loginbtn.id="loginbtn"
    loginbtn.classList.add("btn","btn-primary")
    loginbtn.style.backgroundColor ="rgb(28, 58, 28)"
    loginbtn.innerText = "Logga in"
    loginbtn.addEventListener("click", loginUser/*  ()=>{
        window.location.href ="login.html"
    } */)
    
    let createaccbtn = document.createElement("button")
    createaccbtn.id="createaccbtn"
    createaccbtn.classList.add("btn","btn-primary")
    createaccbtn.style.backgroundColor ="rgb(28, 58, 28)"
    createaccbtn.innerText ="Registrera"
    createaccbtn.addEventListener("click",()=>{
        $('#myModal').modal('toggle')
        renderAccountCreation()
        
    })
    
    
    
    header.append(title)
    header.append(closeModal)
    
    modalbody.append(userInput)
    modalbody.append(passwordInput)
    
    modalfooter.append(loginbtn)
    modalfooter.append(createaccbtn)
    
    modalContent.append(header)
    modalContent.append(modalbody)
    modalContent.append(modalfooter)
    
    modaldialog.append(modalContent)
    renderModal.append(modaldialog)
    document.getElementById("modalpop").append(renderModal);
    $('#myModal').modal('show')
    
}
