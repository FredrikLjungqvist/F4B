window.addEventListener("load", initsite)
function initsite(){
    document.getElementById("logincard").innerHTML=""
    loginCheck()
}

async function loginCheck(){
    console.log("loginCheck")
    
    let url = new URL("http://localhost/api/recievers/userReciever.php")
        
    let params = {action: "loginCheck"}
    url.search = new URLSearchParams(params)

    let response = await makeRequest(url, "GET")

    if (response.username && response.role == "admin") {
        console.log("admin finns")
        renderAdmin(response.username)
    }else if (response.username && response.role == "user") {
        console.log("user finns")
        render(response.username)
    } else {
        console.log("ingen user")
        renderLogin()
    }
}


async function registerUser(){
    console.log("registerUser")
    
    const username = document.getElementById("usernameToSave").value
    const password = document.getElementById("passwordToSave").value

    const body = new FormData()
    body.append("usernameToSave", username)
    body.append("passwordToSave", password)

    let response = await makeRequest("./api/recievers/userReciever.php", "POST", body)
    console.log(response)
    

}


async function loginUser(){
    console.log("loginUser")

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

   
    const body = new FormData()
    body.append("username", username)
    body.append("password", password)

    let response = await makeRequest("./api/recievers/userReciever.php", "POST", body)
    
     
    
    console.log(response)
    initsite() 
}

function renderAdmin(user){
    console.log("renderAdmin")
    document.getElementById("logincard").innerHTML= ""
    
    let logoutbtn = document.createElement("button")
    logoutbtn.id="logoutbtn"
    logoutbtn.innerText = "logout"
    logoutbtn.classList.add("btn-secondary")
    logoutbtn.addEventListener("click", logout)
    
    let renderCard = document.createElement("div")
    renderCard.classList.add =("card text-center");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center","rounded")
    cardBody.style.width ="400px"

    let cardupdatecategory = document.createElement("div")
    cardupdatecategory.classList.add ("card","text-center");
    cardupdatecategory.style.marginBottom = "30px"
    cardupdatecategory.style.padding="20px"
    cardupdatecategory.style.background ="rgb(28, 58, 28)"
    
    let cardupdate = document.createElement("div")
    cardupdate.classList.add("col","card", "text-center","rounded");
    cardupdate.style.marginBottom = "30px"
    cardupdate.style.padding="20px"
    cardupdate.style.background ="rgb(28, 58, 28)"

    let carddelete = document.createElement("div")
    carddelete.classList.add ("card","text-center","rounded");
    carddelete.style.marginBottom = "30px"
    carddelete.style.padding="20px"
    carddelete.style.background ="rgb(28, 58, 28)"

    let cardupload = document.createElement("div")
    cardupload.classList.add = ("card","text-center","rounded");
    cardupload.style.display ="flex"
    cardupload.style.flexDirection ="column"
    cardupload.style.marginBottom = "30px"
    cardupload.style.padding="20px"
    cardupload.style.background ="rgb(28, 58, 28)"
    


    let cardText = document.createElement("h4")
    cardText.innerText ="Välkommen Admin " + user

    //Update Input
    let prodIDinput = document.createElement("input")
    prodIDinput.id = "prodIDinput"
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
    productidset.placeholder = "productidset"

    let prodcategoryset = document.createElement("input")
    prodcategoryset.id ="prodcategoryset"
    prodcategoryset.placeholder = "prodcategoryset"

    let addcategorybtn = document.createElement("button")
    addcategorybtn.id="addcategorybtn"
    addcategorybtn.innerText = "Add Category"
    addcategorybtn.classList.add("btn-warning")
    addcategorybtn.innerText = "addcategorybtn"
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
    deletebtn.addEventListener("click", confirmCheck)

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
    
    carddelete.append(deleteprod)
    carddelete.append(deletebtn)
    
    cardBody.append(cardText)
    cardBody.append(cardupdate)
    cardBody.append(cardupdatecategory)
    cardBody.append(cardupload)
    cardBody.append(carddelete)
    cardBody.append(logoutbtn)
    renderCard.append(cardBody)
    document.getElementById("logincard").appendChild(renderCard);
    
}
function confirmCheck(){
    console.log("work")
    window.confirm("are you sure want to delete this");
}
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

function renderLogin(){
    console.log("renderLogin")
    document.getElementById("logincard").innerHTML =""

    let renderCard = document.createElement("div")
    let loginform = document.createElement("div")
    let createform = document.createElement("div")

    let userInput = document.createElement("input")
    userInput.id = "username"
    userInput.placeholder ="username"

    let usernameToSave = document.createElement("input")
    usernameToSave.id = "usernameToSave"
    usernameToSave.placeholder ="6 characters"

    let passwordToSave = document.createElement("input")
    passwordToSave.id = "passwordToSave"
    passwordToSave.type="password"
    passwordToSave.placeholder ="6 characters"

    let passwordInput = document.createElement("input")
    passwordInput.id = "password"
    passwordInput.type="password"
    passwordInput.placeholder ="password"

    let loginbtn = document.createElement("button")
    loginbtn.id="loginbtn"
    loginbtn.innerText = "login"
    loginbtn.addEventListener("click", loginUser)

    let createaccbtn = document.createElement("button")
    createaccbtn.id="createaccbtn"
    createaccbtn.innerText ="create account"
    createaccbtn.addEventListener("click",registerUser)

    //login
    loginform.append(userInput)
    loginform.append(passwordInput)
    loginform.append(loginbtn)
    
    //create Acc
    createform.append(usernameToSave)
    createform.append(passwordToSave)
    createform.append(createaccbtn)
    
    //render
    renderCard.append(loginform)
    renderCard.append(createform)
    document.getElementById("logincard").appendChild(renderCard);
    return renderCard
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

async function logout() {
    console.log("Logout")
    document.getElementById("logincard").innerHTML=""
    let url = new URL("http://localhost/api/recievers/userReciever.php")
    
    let params = {action: "logout"}
    url.search = new URLSearchParams(params)
    
    let response = await makeRequest(url, "GET")
    console.log(response)
    initsite()
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

function render(user){
    console.log("render")
    document.getElementById("logincard").innerHTML= ""
    
    let logoutbtn = document.createElement("button")
    logoutbtn.id="logoutbtn"
    logoutbtn.innerText = "logout"
    logoutbtn.addEventListener("click", logout)
    
    let renderCard = document.createElement("div")
    renderCard.className = "card text-center";
    
    let cardText = document.createElement("p")
    cardText.innerText ="Välkommen " + user
    
    renderCard.append(logoutbtn)
    renderCard.append(cardText)
    document.getElementById("logincard").appendChild(renderCard);
    
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

async function makeRequest(url, method, body) {
    // Using fetch to send REST method and body (if set) to set path. Returns response or error
    try {
        const response = await fetch(url, {method,body})
        return response.json()
        
    } catch (error) {
        console.log("det blev fel"+error)
    }
}
