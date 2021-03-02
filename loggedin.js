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
    initsite()
}

function render(user){
    console.log("render")
    document.getElementById("productCardCart").innerHTML=""
    document.getElementById("productCard").innerText=""
    document.getElementById("customerInfo").innerText=""
    document.getElementById("shippingInfo").innerText=""

    let renderCard = document.createElement("div")
    renderCard.className = "card text-center";
    
    let cardText = document.createElement("h3")
    cardText.innerText ="Välkommen " + user
    
    
    renderCard.append(cardText)
    document.getElementById("productCard").appendChild(renderCard);
    hidelogin()
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
