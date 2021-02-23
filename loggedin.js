async function registerUser(){
    
    const username = document.getElementById("usernameToSave").value
    const password = document.getElementById("passwordToSave").value

    const body = new FormData()
    body.set("usernameToSave", username)
    body.set("passwordToSave", password)

    let response = await makeRequest("./api/recievers/userReciever.php", "POST", body)
    console.log(response)

}

async function loginUser(){
    
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const body = new FormData()
    body.set("username", username)
    body.set("password", password)

    let response = await makeRequest("./api/recievers/userReciever.php", "POST", body)
    console.log(response)

}

async function makeRequest(url, method, body) {
    // Using fetch to send REST method and body (if set) to set path. Returns response or error
    try {
        const response = await fetch(url, {method,body})
        return response.json()
    
    } catch (error) {
        console.log("det belv fel"+error)
    }
}