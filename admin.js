

async function updateqty() {
    console.log("updateqty")

    let prodid = document.getElementById("prodIDinput").value
    let qty = document.getElementById("qtyinput").value
    console.log(prodid + qty)

    if (window.confirm("Vill du uppdatera detta?")) {
        
    
        const body = new FormData()

        body.append("action", "updateStock")
        body.append("prodid", prodid)
        body.append("qty", qty)

        let response = await makeRequest("./api/recievers/adminReciever.php", "POST", body)
        console.log(response)
            
        prodid.value = 0
        qty.value = 0

        renderAdmin()
    } else {
        prodid.value = 0
        qty.value = 0
        renderAdmin()
    }
    
}

async function setCategory() {
    console.log("setCategory")

    let productID = document.getElementById("productidset").value
    let categoryID = document.getElementById("prodcategoryset").value
    console.log(productID + " " + categoryID)

    if (window.confirm("Vill du uppdatera detta?")) {
        const body = new FormData()
        body.append("action", "setCategory")
        body.append("productID", productID)
        body.append("categoryID", categoryID)

        let response = await makeRequest("./api/recievers/adminReciever.php", "POST", body)
        console.log(response)
            
        productID.value = 0
        categoryID.value = 0
        renderAdmin()
    } else {
        productID.value = 0
        categoryID.value = 0
        renderAdmin()
    }
}

async function addProduct() {
    console.log(addProduct)
   
    let product = {
        description : document.getElementById("descInput").value,
        name : document.getElementById("setName").value,
        category : document.getElementById("setcategory").value,
        price : document.getElementById("setUnitPrice").value,
        weight : document.getElementById("setWeight").value,
        qty : document.getElementById("newqtyinput").value,
        img : document.getElementById("imagefile").value
    }

    if (window.confirm("Vill du uppdatera detta?")) {
        const body = new FormData()
        body.append("action", "addProduct")
        body.append("product", JSON.stringify(product))

        let response = await makeRequest("./api/recievers/adminReciever.php", "POST", body)
        console.log(response)
          
        descInput.value = 0
        setName.value = 0
        setcategory.value = 0
        setUnitPrice.value = 0
        setWeight.value = 0
        newqtyinput.value = 0
        imagefile.value = 0

        renderAdmin()
    } else {
        descInput.value = 0
        setName.value = 0
        setcategory.value = 0
        setUnitPrice.value = 0
        setWeight.value = 0
        newqtyinput.value = 0
        imagefile.value = 0

        renderAdmin()
    }
}

async function deleteProduct(){
    console.log("deleteProduct")

    let deleteproductinput = document.getElementById("deleteprod").value
    let deleteprod = deleteproductinput

    if (window.confirm("Är du säker på att du vill ta bort produkten?")) {
        const product ={
            ID:deleteprod
        }
        let body = new FormData()
        body.append("action", "deleteProduct")
        body.append("product", JSON.stringify(product))
        
        const result = await makeRequest("http://localhost/api/recievers/adminReciever.php", "POST",body)
        console.log(result)
        
        deleteproductinput.value = 0
        deleteprod.value = 0

        renderAdmin()
    } else {
        deleteproductinput.value = 0
        deleteprod.value = 0

        renderAdmin()
    }
}

async function approveAdmin() {
    console.log("approveAdmin")

    if (window.confirm("Är du säker på att du vill göra detta?")) {
        const userID = {
            id : this.data 
        }
    
        const body = new FormData()
        body.append("action", "approveAdmin")
        body.append("userID", JSON.stringify(userID))
    
        let response = await makeRequest("./api/recievers/adminReciever.php", "POST", body)
        console.log(response)

        renderAdmin()
    } else {
        renderAdmin()
    }
}

//
async function denyAdmin() {
    console.log("denyAdmin")

    if (window.confirm("Är du säker på att du vill göra detta?")) {
        const userID = {
            id : this.data 
        }
    
        const body = new FormData()
        body.append("action", "denyAdmin")
        body.append("userID", JSON.stringify(userID))
    
        let response = await makeRequest("./api/recievers/adminReciever.php", "POST", body)
        console.log(response)
        renderAdmin()
    } else {
        renderAdmin()
    }
}

async function newsletter() {
    console.log("newsletter")

    let productCard = document.getElementById("productCard")
    productCard.innerHTML = ""

    let renderCard = document.createElement("div")
    renderCard.style.margin ="auto"
    renderCard.classList.add =("card text-center");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center","rounded")
    cardBody.style.width ="400px"

    let cardText = document.createElement("h4")
    cardText.innerText = "Newsletter"

    let backBtn = document.createElement("button")
    backBtn.id="backBtn"
    backBtn.style.marginBottom = "15px"
    backBtn.innerText = "Back"
    backBtn.classList.add("btn","btn-block", "btn-secondary")
    backBtn.addEventListener("click", loginCheck)

    let newsletterListBtn = document.createElement("button")
    newsletterListBtn.id="newsletterListBtn"
    newsletterListBtn.style.marginBottom = "15px"
    newsletterListBtn.innerText = "Users with newsletter"
    newsletterListBtn.classList.add("btn","btn-block", "btn-secondary")
    newsletterListBtn.addEventListener("click", listNewsletter)

    let addNewsletterBtn = document.createElement("button")
    addNewsletterBtn.id="addNewsletterBtn"
    addNewsletterBtn.style.marginBottom = "15px"
    addNewsletterBtn.innerText = "Add newsletter"
    addNewsletterBtn.classList.add("btn","btn-block", "btn-secondary")
    addNewsletterBtn.addEventListener("click", addNewsletter)

    productCard.append(renderCard)
    renderCard.append(cardBody)
    cardBody.append(cardText, backBtn, newsletterListBtn, addNewsletterBtn)
         
}

async function listNewsletter() {
    console.log("listNewsletter")

    let productCard = document.getElementById("productCard")
    productCard.innerHTML = ""

    let renderCard = document.createElement("div")
    renderCard.style.margin ="auto"
    renderCard.classList.add =("card text-center");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center","rounded")
    cardBody.style.width ="400px"

    let cardText = document.createElement("h4")
    cardText.innerText = "List of users with newsletter"

    let backBtn = document.createElement("button")
    backBtn.id="backBtn"
    backBtn.style.marginBottom = "15px"
    backBtn.innerText = "Back"
    backBtn.classList.add("btn-block", "btn-secondary")
    backBtn.addEventListener("click", newsletter)

    let divListNewsletter = document.createElement("div")
    divListNewsletter.classList.add ("col","card","text-center");
    divListNewsletter.style.marginBottom = "30px"
    divListNewsletter.style.padding="20px"
    divListNewsletter.style.background ="rgb(28, 58, 28)"

    productCard.append(renderCard)
    renderCard.append(cardBody)
    cardBody.append(cardText, backBtn, divListNewsletter)

    getListNewsletter()

    async function getListNewsletter() {
        console.log("getListNewsletter")
        
        let url = new URL("http://localhost/api/recievers/adminReciever.php")
        
        let params = {action: "getListNewsletter"}
        url.search = new URLSearchParams(params)
        
        let response = await makeRequest(url, "GET")
        
        response.forEach(row => {

            let divNewsletterRows = document.createElement("div")
            divNewsletterRows.style.display = "flex"
            divNewsletterRows.style.borderBottom = "solid black 1px"
            divNewsletterRows.style.backgroundColor = "white"
            
            let NewsletterRow = document.createElement("p")
            NewsletterRow.innerText = "ID: " + row.ID + ", Name: " + row.name + ", Email: " + row.email_adress

            divNewsletterRows.append(NewsletterRow)
            divListNewsletter.append(divNewsletterRows)

        });
    }

}

async function addNewsletter() {
    let productCard = document.getElementById("productCard")
    productCard.innerHTML = ""

    let renderCard = document.createElement("div")
    renderCard.style.margin ="auto"
    renderCard.classList.add =("card text-center");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center","rounded")
    cardBody.style.width ="400px"

    let cardText = document.createElement("h4")
    cardText.innerText = "Add newsletter"

    let backBtn = document.createElement("button")
    backBtn.id="backBtn"
    backBtn.style.marginBottom = "15px"
    backBtn.innerText = "Back"
    backBtn.classList.add("btn-block", "btn-secondary")
    backBtn.addEventListener("click", newsletter)

    let divTitleNewsletter = document.createElement("div")
    divTitleNewsletter.classList.add ("col","card","text-center");
    divTitleNewsletter.style.marginBottom = "30px"
    divTitleNewsletter.style.padding="20px"
    divTitleNewsletter.style.background ="rgb(28, 58, 28)"

    let titleNewsletter = document.createElement("div")
    titleNewsletter.innerText = "Titel:"
    titleNewsletter.style.color = "white"
    
    let titleInput = document.createElement("input")
    titleInput.id = "titleInput"

    divTitleNewsletter.append(titleNewsletter, titleInput)

    let divTextNewsletter = document.createElement("div")
    divTextNewsletter.classList.add ("col","card","text-center");
    divTextNewsletter.style.marginBottom = "30px"
    divTextNewsletter.style.padding="20px"
    divTextNewsletter.style.background ="rgb(28, 58, 28)"

    let textNewsletter = document.createElement("div")
    textNewsletter.innerText = "Text:"
    textNewsletter.style.color = "white"
    
    let textInput = document.createElement("textarea")
    textInput.rows = 20

    let submitBtn = document.createElement("button")
    submitBtn.id="submitBtn"
    submitBtn.style.marginBottom = "15px"
    submitBtn.innerText = "Submit newsletter"
    submitBtn.classList.add("btn-block", "btn-secondary")
    submitBtn.addEventListener("click", submitNewsletter)

    divTextNewsletter.append(textNewsletter, textInput)

    productCard.append(renderCard)
    renderCard.append(cardBody)
    cardBody.append(cardText, backBtn, divTitleNewsletter, divTextNewsletter, submitBtn)

    async function submitNewsletter(){
        console.log("submitNewsletter")
        
       if (window.confirm("Vill du skicka detta?")) {
        let title = titleInput.value
        let text = textInput.value

        let body = new FormData()
        body.append("action", "submitNewsletter")
        body.append("title", title)
        body.append("text", text)
        
        const result = await makeRequest("http://localhost/api/recievers/adminReciever.php","POST", body)
        console.log(result)
        
        titleInput.value = 0
        textInput.value = 0

        addNewsletter()

        } 
    }
}

async function orders() {
    console.log("orders")

    let productCard = document.getElementById("productCard")
    productCard.innerHTML = ""

    let renderCard = document.createElement("div")
    renderCard.style.margin ="auto"
    renderCard.classList.add =("card text-center");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center","rounded")
    cardBody.style.width ="400px"

    let cardText = document.createElement("h4")
    cardText.innerText = "Orders"

    let backBtn = document.createElement("button")
    backBtn.id="backBtn"
    backBtn.style.marginBottom = "15px"
    backBtn.innerText = "Back"
    backBtn.classList.add("btn-block", "btn-secondary")
    backBtn.addEventListener("click", loginCheck)

    let orderApproveBtn = document.createElement("button")
    orderApproveBtn.id="orderApproveBtn"
    orderApproveBtn.style.marginBottom = "15px"
    orderApproveBtn.innerText = "Orders to approve"
    orderApproveBtn.classList.add("btn-block", "btn-secondary")
    orderApproveBtn.addEventListener("click", approveOrders)

    let ordersShippedBtn = document.createElement("button")
    ordersShippedBtn.id="ordersShippedBtn"
    ordersShippedBtn.style.marginBottom = "15px"
    ordersShippedBtn.innerText = "Shipped orders"
    ordersShippedBtn.classList.add("btn-block", "btn-secondary")
    ordersShippedBtn.addEventListener("click", listShippedOrders)

    let ordersCompleteBtn = document.createElement("button")
    ordersCompleteBtn.id="ordersCompleteBtn"
    ordersCompleteBtn.style.marginBottom = "15px"
    ordersCompleteBtn.innerText = "Complete orders"
    ordersCompleteBtn.classList.add("btn-block", "btn-secondary")
    ordersCompleteBtn.addEventListener("click", listCompleteOrders)

    productCard.append(renderCard)
    renderCard.append(cardBody)
    cardBody.append(cardText, backBtn, orderApproveBtn, ordersShippedBtn, ordersCompleteBtn)
}

async function approveOrders() {
    console.log("approveOrders")

    let productCard = document.getElementById("productCard")
    productCard.innerHTML = ""

    let renderCard = document.createElement("div")
    renderCard.style.margin ="auto"
    renderCard.classList.add =("card text-center");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center","rounded")
    cardBody.style.width ="400px"

    let cardText = document.createElement("h4")
    cardText.innerText = "Orders to approve"

    let backBtn = document.createElement("button")
    backBtn.id="backBtn"
    backBtn.style.marginBottom = "15px"
    backBtn.innerText = "Back"
    backBtn.classList.add("btn-block", "btn-secondary")
    backBtn.addEventListener("click", orders)

    let divListOrders = document.createElement("div")
    divListOrders.classList.add ("col","card","text-center");
    divListOrders.style.marginBottom = "30px"
    divListOrders.style.padding="20px"
    divListOrders.style.background ="rgb(28, 58, 28)"

    productCard.append(renderCard)
    renderCard.append(cardBody)
    cardBody.append(cardText, backBtn, divListOrders)

    getListOrders(1)

    async function getListOrders(status) {
        console.log("getListOrders")
        
        let url = new URL("http://localhost/api/recievers/adminReciever.php")
        
        let params = {action: "getListOrders", status: status}
        url.search = new URLSearchParams(params)
        
        let response = await makeRequest(url, "GET")
        
        response.forEach(row => {

            let divOrderRows = document.createElement("div")
            divOrderRows.style.display = "flex"
            divOrderRows.style.backgroundColor = "white"
            divOrderRows.style.borderBottom = "solid black 1px"
            
            let orderRow = document.createElement("p")
            orderRow.innerText = "ID: " + row.ID + ", userID: " + row.userID + ", date: " + row.date + ", status: " + row.status  

            let approveButton = document.createElement("button")
            approveButton.classList.add("btn-warning")
            approveButton.innerText = "Approve"
            approveButton.addEventListener("click", approveOrder)
            approveButton.data = row.ID

            divOrderRows.append(orderRow, approveButton)
            divListOrders.append(divOrderRows)

        });
    }

}

async function approveOrder() {
    console.log("approveOrder")

    if (window.confirm("Är du säker?")) {
        const id = {
            id : this.data 
        }
    
        const body = new FormData()
        body.append("action", "approveOrder")
        body.append("ID", JSON.stringify(id))
    
        let response = await makeRequest("./api/recievers/adminReciever.php", "POST", body)
        console.log(response)
        approveOrders()
    } else {
        approveOrders()
    }
}

async function listShippedOrders() {
    console.log("listShippedOrders")

    let productCard = document.getElementById("productCard")
    productCard.innerHTML = ""

    let renderCard = document.createElement("div")
    renderCard.style.margin ="auto"
    renderCard.classList.add =("card text-center");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center","rounded")
    cardBody.style.width ="400px"

    let cardText = document.createElement("h4")
    cardText.innerText = "List of shipped orders"

    let backBtn = document.createElement("button")
    backBtn.id="backBtn"
    backBtn.style.marginBottom = "15px"
    backBtn.innerText = "Back"
    backBtn.classList.add("btn-block", "btn-secondary")
    backBtn.addEventListener("click", orders)

    let divListOrders = document.createElement("div")
    divListOrders.classList.add ("col","card","text-center");
    divListOrders.style.marginBottom = "30px"
    divListOrders.style.padding="20px"
    divListOrders.style.background ="rgb(28, 58, 28)"

    productCard.append(renderCard)
    renderCard.append(cardBody)
    cardBody.append(cardText, backBtn, divListOrders)

    getListOrders(2)

    async function getListOrders(status) {
        console.log("getListOrders")
        
        let url = new URL("http://localhost/api/recievers/adminReciever.php")
        
        let params = {action: "getListOrders", status: status}
        url.search = new URLSearchParams(params)
        
        let response = await makeRequest(url, "GET")
        
        response.forEach(row => {

            let divOrderRows = document.createElement("div")
            divOrderRows.style.display = "flex"
            divOrderRows.style.backgroundColor = "white"
            divOrderRows.style.borderBottom = "solid black 1px"
            
            let orderRow = document.createElement("p")
            orderRow.innerText = "ID: " + row.ID + ", userID: " + row.userID + ", date: " + row.date + ", status: " + row.status  

            divOrderRows.append(orderRow)
            divListOrders.append(divOrderRows)

        });
    }

}

async function listCompleteOrders() {
    console.log("listCompleteOrders")

    let productCard = document.getElementById("productCard")
    productCard.innerHTML = ""

    let renderCard = document.createElement("div")
    renderCard.style.margin ="auto"
    renderCard.classList.add =("card text-center");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center","rounded")
    cardBody.style.width ="400px"

    let cardText = document.createElement("h4")
    cardText.innerText = "List of complete orders"

    let backBtn = document.createElement("button")
    backBtn.id="backBtn"
    backBtn.style.marginBottom = "15px"
    backBtn.innerText = "Back"
    backBtn.classList.add("btn-block", "btn-secondary")
    backBtn.addEventListener("click", orders)

    let divListOrders = document.createElement("div")
    divListOrders.classList.add ("col","card","text-center");
    divListOrders.style.marginBottom = "30px"
    divListOrders.style.padding="20px"
    divListOrders.style.background ="rgb(28, 58, 28)"

    productCard.append(renderCard)
    renderCard.append(cardBody)
    cardBody.append(cardText, backBtn, divListOrders)

    getListOrders(3)

    async function getListOrders(status) {
        console.log("getListOrders")
        
        let url = new URL("http://localhost/api/recievers/adminReciever.php")
        
        let params = {action: "getListOrders", status: status}
        url.search = new URLSearchParams(params)
        
        let response = await makeRequest(url, "GET")
        
        response.forEach(row => {

            let divOrderRows = document.createElement("div")
            divOrderRows.style.display = "flex"
            divOrderRows.style.backgroundColor = "white"
            divOrderRows.style.borderBottom = "solid black 1px"
            
            let orderRow = document.createElement("p")
            orderRow.innerText = "ID: " + row.ID + ", userID: " + row.userID + ", date: " + row.date + ", status: " + row.status  

            divOrderRows.append(orderRow)
            divListOrders.append(divOrderRows)

        });
    }

}

async function renderAdmin(){
    console.log("renderAdmin")

    document.getElementById("productCardCart").innerHTML=""
    document.getElementById("productCard").innerText=""
    document.getElementById("customerInfo").innerText=""
    document.getElementById("shippingInfo").innerText=""
    document.getElementById("productCardOrder").innerText=""
    

    let url = new URL("http://localhost/api/recievers/userReciever.php")
        
    let params = {action: "loginCheck"}
    url.search = new URLSearchParams(params)

    let response = await makeRequest(url, "GET")

    
    let logoutbtn = document.createElement("button")
    logoutbtn.id="logoutbtn"
    logoutbtn.innerText = "logout"
    logoutbtn.classList.add("btn-secondary")
    logoutbtn.addEventListener("click", logout)

    
    let ordersBtn = document.createElement("button")
    ordersBtn.id="ordersBtn"
    ordersBtn.style.marginBottom = "15px"
    ordersBtn.innerText = "orders"
    ordersBtn.classList.add("btn","btn-secondary","mx-2")
    ordersBtn.addEventListener("click", orders)
    document.getElementById("productCard").innerHTML= ""
    
    let newsletterBtn = document.createElement("button")
    newsletterBtn.id="logoutbtn"
    newsletterBtn.style.marginBottom = "15px"
    newsletterBtn.innerText = "newsletter"
    newsletterBtn.classList.add("btn","btn-secondary","mx-2")
    newsletterBtn.addEventListener("click", newsletter)
    document.getElementById("productCard").innerHTML= ""
    
    //Customer view button
    let customerviewbtn =document.createElement("button")
    customerviewbtn.id="customerviewbtn"
    customerviewbtn.classList.add("btn","btn-secondary","mx-2")
    customerviewbtn.style.marginBottom = "15px"
    customerviewbtn.innerText ="Kund vy"
    customerviewbtn.addEventListener("click", render)

    let renderCard = document.createElement("div")
    renderCard.style.margin="auto"
    renderCard.classList.add =("d-flex");

    let cardBody = document.createElement("div");
    cardBody.style.justifyContent="space-evenly"
    cardBody.classList.add("text-center","flex-wrap")

    let cardupdatecategory = document.createElement("div")
    cardupdatecategory.classList.add ("col","card","text-center");
    cardupdatecategory.style.marginBottom = "30px"
    cardupdatecategory.style.padding="20px"
    cardupdatecategory.style.background ="rgb(28, 58, 28)"
    
    let cardupdate = document.createElement("div")
    cardupdate.classList.add("col","card", "text-center","rounded");
    cardupdate.style.flexDirection ="column"
    cardupdate.style.marginBottom = "30px"
    cardupdate.style.padding="20px"
    cardupdate.style.background ="rgb(28, 58, 28)"

    let carddelete = document.createElement("div")
    carddelete.classList.add ("card","text-center","rounded");
    carddelete.style.marginBottom = "30px"
    carddelete.style.padding="20px"
    carddelete.style.background ="rgb(28, 58, 28)"

    let cardupload = document.createElement("div")
    cardupload.classList.add = ("col","card","text-center","rounded");
    cardupload.style.display ="flex"
    cardupload.style.flexDirection ="column"
    cardupload.style.marginBottom = "30px"
    cardupload.style.padding="20px"
    cardupload.style.background ="rgb(28, 58, 28)"

    //admin
    let adminApprove = document.createElement("div")
    adminApprove.classList.add("col","card", "text-center","rounded")
    adminApprove.style.marginBottom = "30px"
    adminApprove.style.padding="20px"
    adminApprove.style.background ="rgb(28, 58, 28)"

    let headerAdminApprove = document.createElement("h3")
    headerAdminApprove.style.textAlign="left"
    headerAdminApprove.innerText = "Pending admins:"
    headerAdminApprove.style.color = "white"
    adminApprove.append(headerAdminApprove)

    let listAdmin = document.createElement("div")
    listAdmin.classList.add("col","card", "text-center","rounded")
    listAdmin.style.marginBottom = "30px"
    listAdmin.style.padding="20px"
    listAdmin.style.background ="rgb(28, 58, 28)"

    let headerListAdmin = document.createElement("h3")
    headerListAdmin.style.textAlign="left"
    headerListAdmin.innerText = "Admins:"
    headerListAdmin.style.color = "white"
    listAdmin.append(headerListAdmin)

    let cardText = document.createElement("h4")
    cardText.classList.add("col-12")
    cardText.innerText ="Välkommen Admin " + response.username

    //Update Input

    let prodIDtitle = document.createElement("h3")
    prodIDtitle.style.color="white"
    prodIDtitle.style.textAlign="left"
    prodIDtitle.innerText="Change in stock"
    
    let prodIDinput = document.createElement("input")
    prodIDinput.id = "prodIDinput"
    prodIDinput.style.width="100%"
    prodIDinput.placeholder = "productID"

    let qtyinput = document.createElement("input")
    qtyinput.id ="qtyinput"
    qtyinput.placeholder = "quantity"

    let addqtybtn = document.createElement("button")
    addqtybtn.id="addqtybtn"
    addqtybtn.innerText = "UPDATE"
    addqtybtn.classList.add("btn","btn-warning")
    addqtybtn.addEventListener("click", updateqty)

    //Set category

    let productidtitle = document.createElement("h3")
    productidtitle.style.color="white"
    productidtitle.style.textAlign="left"
    productidtitle.innerText="Set category of product"

    let productidset = document.createElement("input")
    productidset.id = "productidset"
    productidset.placeholder = "productID"

    let prodcategoryset = document.createElement("input")
    prodcategoryset.id ="prodcategoryset"
    prodcategoryset.placeholder = "categoryID"

    let addcategorybtn = document.createElement("button")
    addcategorybtn.id="addcategorybtn"
    addcategorybtn.innerText = "Add Category"
    addcategorybtn.classList.add("btn","btn-warning")
    addcategorybtn.innerText = "UPDATE"
    addcategorybtn.addEventListener("click", setCategory)

    //Upload Input

    let uploadttitle = document.createElement("h3")
    uploadttitle.style.color="white"
    uploadttitle.style.textAlign="left"
    uploadttitle.innerText="Create a new product"

    let descInput = document.createElement("textarea")
    descInput.style.width = "100%"
    descInput.style.height = "50px"
    descInput.id = "descInput"
    descInput.placeholder = "description"
    
    let setName = document.createElement("input")
    setName.id ="setName"
    setName.placeholder = "name"
    
    let setcategory = document.createElement("input")
    setcategory.id ="setcategory"
    setcategory.placeholder = "category"
    
    let setUnitPrice = document.createElement("input")
    setUnitPrice.id ="setUnitPrice"
    setUnitPrice.placeholder = "unitPrice"
    
    let setWeight = document.createElement("input")
    setWeight.id ="setWeight"
    setWeight.placeholder = "weight"
    
    let newqtyinput = document.createElement("input")
    newqtyinput.id ="newqtyinput"
    newqtyinput.placeholder = "quantity"


    let imagefile = document.createElement("input")
    imagefile.id="imagefile"
    imagefile.placeholder ="image code"
    

    let uploadbtn = document.createElement("button")
    uploadbtn.id="uploadbtn"
    uploadbtn.classList.add("btn","btn-warning")
    uploadbtn.innerText = "UPLOAD"
    uploadbtn.addEventListener("click", addProduct)


    //Delete Input

    let deleteprodtitle = document.createElement("h3")
    deleteprodtitle.style.color="white"
    deleteprodtitle.style.textAlign="left"
    deleteprodtitle.innerText="Delete product"

    let deleteprod = document.createElement("input")
    deleteprod.id = "deleteprod"
    deleteprod.placeholder = "Delete Product"
    


    let deletebtn = document.createElement("button")
    deletebtn.id="deletebtn"
    deletebtn.innerText = "DELETE"
    deletebtn.classList.add("btn","btn-danger")
    deletebtn.addEventListener("click", deleteProduct)
    cardupdate.append(prodIDtitle)
    cardupdate.append(prodIDinput)
    cardupdate.append(qtyinput)
    cardupdate.append(addqtybtn)
    
    cardupdatecategory.append(productidtitle)
    cardupdatecategory.append(productidset)
    cardupdatecategory.append(prodcategoryset)
    cardupdatecategory.append(addcategorybtn)
    
    cardupload.append(uploadttitle)
    cardupload.append(descInput)
    cardupload.append(setName)
    /* cardupload.append(setProudctID) */
    cardupload.append(setcategory)
    cardupload.append(setUnitPrice)
    cardupload.append(setWeight)
    cardupload.append(newqtyinput)
    cardupload.append(imagefile)
    cardupload.append(uploadbtn)

    listAdmins()
    listPendingUsers()

    carddelete.append(deleteprodtitle)
    carddelete.append(deleteprod)
    carddelete.append(deletebtn)
    
    cardBody.append(cardText)
    cardBody.append(newsletterBtn)
    cardBody.append(ordersBtn)
    cardBody.append(customerviewbtn)
    cardBody.append(cardupdate)
    cardBody.append(cardupdatecategory)
    cardBody.append(cardupload)
    cardBody.append(listAdmin)
    cardBody.append(adminApprove)
    cardBody.append(carddelete)
    cardBody.append(logoutbtn)

    renderCard.append(cardBody)
    document.getElementById("productCard").appendChild(renderCard);
    

    //add new admin
    //(En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG))
    async function listPendingUsers() {
        console.log("listPendingUsers")
        
        let url = new URL("http://localhost/api/recievers/adminReciever.php")
        
        let params = {action: "getListPending"}
        url.search = new URLSearchParams(params)
        
        let response = await makeRequest(url, "GET")
        
        response.forEach(row => {

            let divPendingUser = document.createElement("div")
            divPendingUser.style.display = "flex"
            divPendingUser.style.backgroundColor = "white"
            divPendingUser.style.border = "solid black 1px"
            
            let pendingUser = document.createElement("p")
            pendingUser.innerText = "ID: " + row.id + ", Username: " + row.name + ", Status: " + row.role
            /* pendingUser.style.backgroundColor = "white" */
            
            let approveButton = document.createElement("button")
            approveButton.classList.add("btn","btn-warning")
            approveButton.innerText = "Make admin"
            approveButton.addEventListener("click", approveAdmin)
            approveButton.data = row.id

            let denyButton = document.createElement("button")
            denyButton.classList.add("btn","btn-danger")
            denyButton.innerText = "Deny admin"
            denyButton.addEventListener("click", denyAdmin)
            denyButton.data = row.id

            divPendingUser.append(pendingUser, approveButton, denyButton)
            adminApprove.append(divPendingUser)

        });
    }

    async function listAdmins() {
        console.log("listAdmins")
        
        let url = new URL("http://localhost/api/recievers/adminReciever.php")
        
        let params = {action: "getListAdmin"}
        url.search = new URLSearchParams(params)
        
        let response = await makeRequest(url, "GET")
        
        response.forEach(row => {

            let divPendingUser = document.createElement("div")
            divPendingUser.style.display = "flex"
            divPendingUser.style.backgroundColor = "white"
            divPendingUser.style.border = "solid black 1px"
            
            let pendingUser = document.createElement("p")
            pendingUser.innerText = "ID: " + row.id + ", Username: " + row.name + ", Status: " + row.role

            divPendingUser.append(pendingUser)
            listAdmin.append(divPendingUser)

        });
    }
    
}