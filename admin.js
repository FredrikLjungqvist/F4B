

async function updateqty() {
    console.log("updateqty")
    const prodid = document.getElementById("prodIDinput").value
    const qty = document.getElementById("qtyinput").value
    console.log(prodid + qty)
   
    const body = new FormData()

    body.append("action", "updateStock")
    body.append("prodid", prodid)
    body.append("qty", qty)

    let response = await makeRequest("./api/recievers/adminReciever.php", "POST", body)
    console.log(response)
}

async function setCategory() {
    console.log("setCategory")

    const productID = document.getElementById("productidset").value
    const categoryID = document.getElementById("prodcategoryset").value
    console.log(productID + " " + categoryID)
   
    const body = new FormData()
    body.append("action", "setCategory")
    body.append("productID", productID)
    body.append("categoryID", categoryID)

    let response = await makeRequest("./api/recievers/adminReciever.php", "POST", body)
    console.log(response)

}

async function addProduct() {

   
    let product = {
        description : document.getElementById("descInput").value,
        name : document.getElementById("setName").value,
        category : document.getElementById("setcategory").value,
        price : document.getElementById("setUnitPrice").value,
        weight : document.getElementById("setWeight").value,
        qty : document.getElementById("newqtyinput").value,
        img : document.getElementById("imagefile").value
    }

    console.log(product)
    const body = new FormData()

    body.append("action", "addProduct")
    body.append("product", JSON.stringify(product))
    

    let response = await makeRequest("./api/recievers/adminReciever.php", "POST", body)
    console.log(response)
    


}

async function deleteProduct(){
    console.log("deleteProduct")
    //DELETE FROM `products` WHERE `products`.`ID` = 30008;
    let deleteproductinput = document.getElementById("deleteprod").value
    let deleteprod = deleteproductinput

    const product ={
        ID:deleteprod
    }
    let body = new FormData()
    body.append("action", "deleteProduct")
    body.append("product", JSON.stringify(product))
    
    const result = await makeRequest("http://localhost/api/recievers/adminReciever.php", "POST",body)
    console.log(result)
    return
}

async function approveAdmin() {
    console.log("approveAdmin")

    const userID = {
        id : this.data 
    }

    const body = new FormData()
    body.append("action", "approveAdmin")
    body.append("userID", JSON.stringify(userID))

    let response = await makeRequest("./api/recievers/adminReciever.php", "POST", body)
    console.log(response)
    loginCheck()

}

//
async function denyAdmin() {
    console.log("denyAdmin")

    const userID = {
        id : this.data 
    }

    const body = new FormData()
    body.append("action", "denyAdmin")
    body.append("userID", JSON.stringify(userID))

    let response = await makeRequest("./api/recievers/adminReciever.php", "POST", body)
    console.log(response)
    loginCheck()

}

async function newsletter() {
    console.log("newsletter")

    let productCard = document.getElementById("productCard")
    productCard.innerHTML = ""

    let renderCard = document.createElement("div")
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
    backBtn.classList.add("btn-block", "btn-secondary")
    backBtn.addEventListener("click", loginCheck)

    let newsletterListBtn = document.createElement("button")
    newsletterListBtn.id="newsletterListBtn"
    newsletterListBtn.style.marginBottom = "15px"
    newsletterListBtn.innerText = "Users with newsletter"
    newsletterListBtn.classList.add("btn-block", "btn-secondary")
    newsletterListBtn.addEventListener("click", listNewsletter)

    let addNewsletterBtn = document.createElement("button")
    addNewsletterBtn.id="addNewsletterBtn"
    addNewsletterBtn.style.marginBottom = "15px"
    addNewsletterBtn.innerText = "Add newsletter"
    addNewsletterBtn.classList.add("btn-block", "btn-secondary")
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
            divNewsletterRows.style.backgroundColor = "white"
            
            let NewsletterRow = document.createElement("p")
            NewsletterRow.innerText = "ID: " + row.ID + ", Username: " + row.email_adress

            divNewsletterRows.append(NewsletterRow)
            divListNewsletter.append(divNewsletterRows)

        });
    }

}

async function addNewsletter() {
    let productCard = document.getElementById("productCard")
    productCard.innerHTML = ""

    let renderCard = document.createElement("div")
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

        const newsletter = {
            title : titleInput.value,
            text : textInput.value
        }
        let body = new FormData()
        body.append("action", "submitNewsletter")
        body.append("newsletter", JSON.stringify(newsletter))
        
        const result = await makeRequest("http://localhost/api/recievers/adminReciever.php", "POST",body)
        console.log(result)
    }

}

async function orders() {
    console.log("orders")

    let productCard = document.getElementById("productCard")
    productCard.innerHTML = ""

    let renderCard = document.createElement("div")
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

    let orderListBtn = document.createElement("button")
    orderListBtn.id="newsletterListBtn"
    orderListBtn.style.marginBottom = "15px"
    orderListBtn.innerText = "List of complete orders"
    orderListBtn.classList.add("btn-block", "btn-secondary")
    orderListBtn.addEventListener("click", listOrders)

    let orderApproveBtn = document.createElement("button")
    orderApproveBtn.id="addNewsletterBtn"
    orderApproveBtn.style.marginBottom = "15px"
    orderApproveBtn.innerText = "List of orders to approve"
    orderApproveBtn.classList.add("btn-block", "btn-secondary")
    orderApproveBtn.addEventListener("click", addNewsletter)

    productCard.append(renderCard)
    renderCard.append(cardBody)
    cardBody.append(cardText, backBtn, orderListBtn, orderApproveBtn)
}

async function listOrders() {
    console.log("listOrders")

    let productCard = document.getElementById("productCard")
    productCard.innerHTML = ""

    let renderCard = document.createElement("div")
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
    backBtn.addEventListener("click", newsletter)

    let divListOrders = document.createElement("div")
    divListOrders.classList.add ("col","card","text-center");
    divListOrders.style.marginBottom = "30px"
    divListOrders.style.padding="20px"
    divListOrders.style.background ="rgb(28, 58, 28)"

    productCard.append(renderCard)
    renderCard.append(cardBody)
    cardBody.append(cardText, backBtn, divListOrders)

    getListOrders()

    async function getListOrders() {
        console.log("getListOrders")
        
        let url = new URL("http://localhost/api/recievers/adminReciever.php")
        
        let params = {action: "getListOrders"}
        url.search = new URLSearchParams(params)
        
        let response = await makeRequest(url, "GET")
        
        response.forEach(row => {

            let divOrderRows = document.createElement("div")
            divOrderRows.style.display = "flex"
            divOrderRows.style.backgroundColor = "white"
            
            let orderRow = document.createElement("p")
            orderRow.innerText = "ID: " + row.id + ", userID: " + row.userID + ", date: " + row.date + ", status: " + row.status  

            divOrderRows.append(orderRow)
            divListOrders.append(divOrderRows)

        });
    }

}

function renderAdmin(user){
    hidelogin()
    console.log("renderAdmin")

    
    let logoutbtn = document.createElement("button")
    logoutbtn.id="logoutbtn"
    logoutbtn.innerText = "logout"
    logoutbtn.classList.add("btn-secondary")
    logoutbtn.addEventListener("click", logout)

    let ordersBtn = document.createElement("button")
    ordersBtn.id="ordersBtn"
    ordersBtn.style.marginBottom = "15px"
    ordersBtn.innerText = "orders"
    ordersBtn.classList.add("btn-secondary")
    ordersBtn.addEventListener("click", orders)
    document.getElementById("productCard").innerHTML= ""

    let newsletterBtn = document.createElement("button")
    newsletterBtn.id="logoutbtn"
    newsletterBtn.style.marginBottom = "15px"
    newsletterBtn.innerText = "newsletter"
    newsletterBtn.classList.add("btn-secondary")
    newsletterBtn.addEventListener("click", newsletter)
    document.getElementById("productCard").innerHTML= ""
    
    let renderCard = document.createElement("div")
    renderCard.classList.add =("card");

    let cardBody = document.createElement("div");
    cardBody.style.justifyContent="space-evenly"
    cardBody.classList.add("card-body","text-center","rounded","flex-wrap")

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
    headerAdminApprove.innerText = "Pending admins:"
    headerAdminApprove.style.color = "white"
    adminApprove.append(headerAdminApprove)

    let listAdmin = document.createElement("div")
    listAdmin.classList.add("col","card", "text-center","rounded")
    listAdmin.style.marginBottom = "30px"
    listAdmin.style.padding="20px"
    listAdmin.style.background ="rgb(28, 58, 28)"
    let headerListAdmin = document.createElement("h3")
    headerListAdmin.innerText = "Admins:"
    headerListAdmin.style.color = "white"
    listAdmin.append(headerListAdmin)

    let cardText = document.createElement("h4")
    cardText.classList.add("col-12")
    cardText.innerText ="Välkommen Admin " + user

    //Update Input
    let prodIDinput = document.createElement("input")
    prodIDinput.id = "prodIDinput"
    prodIDinput.style.width="100%"
    prodIDinput.placeholder = "prodIDinput"

    let qtyinput = document.createElement("input")
    qtyinput.id ="qtyinput"
    qtyinput.placeholder = "Qty"

    let addqtybtn = document.createElement("button")
    addqtybtn.id="addqtybtn"
    addqtybtn.innerText = "UPDATE"
    addqtybtn.classList.add("btn-warning")
    addqtybtn.addEventListener("click", updateqty)

    //Set category
    let productidset = document.createElement("input")
    productidset.id = "productidset"
    productidset.placeholder = "Product ID"

    let prodcategoryset = document.createElement("input")
    prodcategoryset.id ="prodcategoryset"
    prodcategoryset.placeholder = "Category ID"

    let addcategorybtn = document.createElement("button")
    addcategorybtn.id="addcategorybtn"
    addcategorybtn.innerText = "Add Category"
    addcategorybtn.classList.add("btn-warning")
    addcategorybtn.innerText = "Add to catergory"
    addcategorybtn.addEventListener("click", setCategory)

    //Upload Input

    //osäker om behöve beroende increment i db
   /*  let setProudctID = document.createElement("div")
    setProudctID.id ="setProudctID"
    setProudctID.placeholder ="proudctIDset" */

    let descInput = document.createElement("textarea")
    descInput.style.width = "100%"
    descInput.style.height = "50px"
    descInput.id = "descInput"
    descInput.placeholder = "Description"
    

    let setName = document.createElement("input")
    setName.id ="setName"
    setName.placeholder = "set Name"
    

    let setcategory = document.createElement("input")
    setcategory.id ="setcategory"
    setcategory.placeholder = "setcategory"
    

    let setUnitPrice = document.createElement("input")
    setUnitPrice.id ="setUnitPrice"
    setUnitPrice.placeholder = "set Unit Price"
    

    let setWeight = document.createElement("input")
    setWeight.id ="setWeight"
    setWeight.placeholder = "setWeight"
    

    let newqtyinput = document.createElement("input")
    newqtyinput.id ="newqtyinput"
    newqtyinput.placeholder = "Qty"
    

    let imagefile = document.createElement("input")
    imagefile.id="imagefile"
    imagefile.placeholder ="Place image code here"
    

    let uploadbtn = document.createElement("button")
    uploadbtn.id="uploadbtn"
    uploadbtn.classList.add("btn-warning")
    uploadbtn.innerText = "UPLOAD"
    uploadbtn.addEventListener("click", addProduct)


    //Delete Input
    let deleteprod = document.createElement("input")
    deleteprod.id = "deleteprod"
    deleteprod.placeholder = "Delete Product"
    


    let deletebtn = document.createElement("button")
    deletebtn.id="deletebtn"
    deletebtn.innerText = "DELETE"
    deletebtn.classList.add("btn-danger")
    deletebtn.addEventListener("click", deleteProduct)

    cardupdate.append(prodIDinput)
    cardupdate.append(qtyinput)
    cardupdate.append(addqtybtn)
    
    cardupdatecategory.append(productidset)
    cardupdatecategory.append(prodcategoryset)
    cardupdatecategory.append(addcategorybtn)
    
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

    carddelete.append(deleteprod)
    carddelete.append(deletebtn)
    
    cardBody.append(cardText)
    cardBody.append(newsletterBtn)
    cardBody.append(ordersBtn)
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
            
            let pendingUser = document.createElement("p")
            pendingUser.innerText = "ID: " + row.id + ", Username: " + row.name + ", Status: " + row.role
            pendingUser.style.backgroundColor = "white"
            
            let approveButton = document.createElement("button")
            approveButton.classList.add("btn-warning")
            approveButton.innerText = "Make admin"
            approveButton.addEventListener("click", approveAdmin)
            approveButton.data = row.id

            let denyButton = document.createElement("button")
            denyButton.classList.add("btn-danger")
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
            
            let pendingUser = document.createElement("p")
            pendingUser.innerText = "ID: " + row.id + ", Username: " + row.name + ", Status: " + row.role

            divPendingUser.append(pendingUser)
            listAdmin.append(divPendingUser)

        });
    }
    
}