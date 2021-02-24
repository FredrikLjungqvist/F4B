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
        render(response.username)
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

function renderAdmin(){
    console.log("renderAdmin")
    
    document.getElementById("logincard").innerHTML =""
    let renderCard = document.createElement("div")

    let test = document.createElement("p")
    test.innertext ="Admin inloggad"

    let logoutbtn = document.createElement("button")
    logoutbtn.id="logoutbtn"
    logoutbtn.innerText = "logout"
    logoutbtn.addEventListener("click", logout)
    
    renderCard.append(logoutbtn)
    renderCard.append(test)

    document.getElementById("logincard").appendChild(renderCard);
    return renderCard

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

function render($user){
    console.log("render")
    document.getElementById("logincard").innerHTML= ""
    
    let logoutbtn = document.createElement("button")
    logoutbtn.id="logoutbtn"
    logoutbtn.innerText = "logout"
    logoutbtn.addEventListener("click", logout)
    
    let renderCard = document.createElement("div")
    renderCard.className = "card text-center";
    
    let cardText = document.createElement("p")
    cardText.innerText ="Välkommen " + $user
    
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