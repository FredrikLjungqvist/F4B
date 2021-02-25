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

    if (response.username && response.admin == 1) {
        console.log("admin finns")
        renderAdmin(response.username)
    }else if (response.username && response.admin == 0) {
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
    logoutbtn.addEventListener("click", logout)
    
    let renderCard = document.createElement("div")
    renderCard.className = "card text-center";

    let cardupdatecategory = document.createElement("div")
    cardupdatecategory.className = "card text-center";
    
    let cardupdate = document.createElement("div")
    cardupdate.className = "card text-center";

    let carddelete = document.createElement("div")
    carddelete.className = "card text-center";

    let cardupload = document.createElement("div")
    cardupload.className = "card text-center";

    let cardText = document.createElement("p")
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
    addcategorybtn.innerText = "addcategorybtn"
    /* addcategorybtn.addEventListener("click", updateqty) */

    //Upload Input

    //osäker om behöve beroende increment i db
   /*  let setProudctID = document.createElement("div")
    setProudctID.id ="setProudctID"
    setProudctID.placeholder ="proudctIDset" */

    let descInput = document.createElement("textarea")
    descInput.style.width = "50px"
    descInput.style.height = "30px"
    descInput.id = "descInput"
    descInput.placeholder = "Description"

    let setName = document.createElement("input")
    setName.id ="set Name"
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
    uploadbtn.innerText = "UPLOAD"
    /* addqtybtn.addEventListener("click", updateqty) */

    //Delete Input
    let deleteprod = document.createElement("input")
    deleteprod.id = "deleteprod"
    deleteprod.placeholder = "Delete Product"

    let deleteqtyinput = document.createElement("input")
    deleteqtyinput.id ="deleteqtyinput"
    deleteqtyinput.placeholder = "Amount to delete"

    let deletebtn = document.createElement("button")
    deletebtn.id="deletebtn"
    deletebtn.innerText = "DELETE"
    /* addqtybtn.addEventListener("click", updateqty) */

    cardupdate.append(cardText)
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
    carddelete.append(deleteqtyinput)
    carddelete.append(deletebtn)

    renderCard.append(cardupdate)
    renderCard.append(cardupdatecategory)
    renderCard.append(cardupload)
    renderCard.append(carddelete)
    renderCard.append(logoutbtn)
    document.getElementById("logincard").appendChild(renderCard);
    
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

async function makeRequest(url, method, body) {
    // Using fetch to send REST method and body (if set) to set path. Returns response or error
    try {
        const response = await fetch(url, {method,body})
        return response.json()
        
    } catch (error) {
        console.log("det blev fel"+error)
    }
}
