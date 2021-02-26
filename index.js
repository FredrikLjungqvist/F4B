window.addEventListener("load", initsite)
document.getElementById("loginPopUp").addEventListener("click",loginModal)

$('#myModal').modal()                      // initialized with defaults
$('#myModal').modal({ keyboard: false })   // initialized with no keyboard
$('#myModal').modal('hide')                // initializes and invokes show immediately

function initsite(){
   
    document.getElementById("productCard").innerHTML = "";
    document.getElementById("productCardCart").innerHTML = "";
    document.getElementById("modalpop").innerHTML = "";
    /* getProduct("30002") */
    /* getCategory("3") */
    getAllProducts()
    updateCartCounter(1)
}


function loginModal(){
    document.getElementById("modalpop").innerHTML = "";
    console.log("LoginModal")
    
    let renderModal = document.createElement("div")
    renderModal.id="myModal"
    renderModal.classList.add("modal")
    
    //header of modal
    let header = document.createElement("div")
    header.classList.add("modal-header")
    
    //the body of modal
    let modalbody = document.createElement("div")
    modalbody.classList.add("modal-body")
    
    //footer of modal
    let modalfooter = document.createElement("div")
    modalfooter.classList.add("modal-footer")
    
    let modaldialog = document.createElement("div")
    modaldialog.classList.add="modal-dialog","modal-dialog-centered"
    
    let modalContent = document.createElement("div")
    /* modalContent.style.width="200px" */
    modalContent.classList.add("modal-sm","modal-content")
    modalContent.style.marginTop ="100px"
    modalContent.style.left="45%"
    
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
    loginbtn.addEventListener("click", /* loginUser */ ()=>{
        window.location.href ="login.html"
    })
    
    let createaccbtn = document.createElement("button")
    createaccbtn.id="createaccbtn"
    createaccbtn.classList.add("btn","btn-primary")
    createaccbtn.style.backgroundColor ="rgb(28, 58, 28)"
    createaccbtn.innerText ="Registrera"
    createaccbtn.addEventListener("click",/* registerUser */ ()=>{
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

function renderAccountCreation(){
    console.log("renderAccountCreation")

    document.getElementById("productCard").innerHTML = "";

    let renderCard = document.createElement("div")
    renderCard.classList.add("container")

    let pagetitle = document.createElement("h3")
    pagetitle.innerText ="Registrering"
    
    let accountform = document.createElement("form")
    accountform.classList.add("form-row","m-4")

    let createform = document.createElement("div")
    createform.classList.add("form-group","form-control",)

    let credentials = document.createElement("div")
    credentials.classList.add("row","col")

    let fullName = document.createElement("div")
    fullName.classList.add("row","col")

    let contactinfo = document.createElement("div")
    contactinfo.classList.add("row","col")

    let location = document.createElement("div")
    location.classList.add("row","col")

    //username
    let userform = document.createElement("div")
    userform.classList.add("form-group","col")
    
    let userlabel = document.createElement("label")
    userlabel.innerText="Användarnamn"
    
    let userInput = document.createElement("input")
    userInput.id="usernameToSave"
    userInput.classList.add("form-control")
    userInput.placeholder="Användarnamn"

    //password
    let passwordform = document.createElement("div")
    passwordform.classList.add("form-group","col")
    
    let passwordlabel = document.createElement("label")
    passwordlabel.innerText="Lösenord"
    
    let passwordinput = document.createElement("input")
    passwordinput.type ="password"
    passwordinput.id="passwordToSave"
    passwordinput.classList.add("form-control")
    passwordinput.placeholder="Lösenord"

    //password check
    let passwordCheckform = document.createElement("div")
    passwordCheckform.classList.add("form-group","col")
    
    let passwordChecklabel = document.createElement("label")
    passwordChecklabel.innerText="Skriv samma Lösenord"
    
    let passwordCheckinput = document.createElement("input")
    passwordCheckinput.type ="password"
    passwordCheckinput.id="passwordToSaveCheck"
    passwordCheckinput.classList.add("form-control")
    passwordCheckinput.placeholder="Skriv samma Lösenord"

    //email
    let emailform = document.createElement("div")
    emailform.classList.add("form-group","col")
    
    let emaillabel = document.createElement("label")
    emaillabel.classList.add("row","ml-1")
    emaillabel.innerText="E-mail"
    
    let emailInput = document.createElement("input")
    emailInput.id="inputEmail4"
    emailInput.classList.add("form-control")
    emailInput.placeholder="Example@f4b.se"

    // chekcbox newsletter
    let checkform = document.createElement("div")
    checkform.classList.add("col","ml-3")
    
    let checklabel = document.createElement("label")
    checklabel.classList.add("form-check-label")
    checklabel.innerText="Jag vill bli informerad om nyheter, aktuella erbjudanden och händelser från F4B-FRILUFT via e-post."
    
    let checkbox = document.createElement("input")
    checkbox.type ="checkbox"
    checkbox.id="checkbox"
    checkbox.classList.add("form-check-input")

    //förnamn
    let firstnameform = document.createElement("div")
    firstnameform.classList.add("form-group","col")

    let firstnamelabel = document.createElement("label")
    firstnamelabel.innerText="Förnamn"

    let firstnameInput = document.createElement("input")
    firstnameInput.id="firstinput"
    firstnameInput.classList.add("form-control","col")
    firstnameInput.placeholder="Förnamn"

    //Efternamn
    let lastnameform = document.createElement("div")
    lastnameform.classList.add("form-group","col")

    let lastnamelabel = document.createElement("label")
    lastnamelabel.innerText="Efternamn"

    let lastnamnInput = document.createElement("input")
    lastnamnInput.id="lastnamnInput"
    lastnamnInput.classList.add("form-control","col")
    lastnamnInput.placeholder="Efternamn"

    //Adress
    let adressform = document.createElement("div")
    adressform.classList.add("form-group","col")

    let adresslabel = document.createElement("label")
    adresslabel.innerText="Adress"

    let adressinput = document.createElement("input")
    adressinput.id="inputAddress"
    adressinput.classList.add("form-control","col")
    adressinput.placeholder="Adress"

    //Country
    let countryform = document.createElement("div")
    countryform.classList.add("form-group","col")

    let countrylabel = document.createElement("label")
    countrylabel.innerText="Land"

    let countryinput = document.createElement("input")
    countryinput.id="countryinput"
    countryinput.classList.add("form-control","col")
    countryinput.placeholder="Land"

    //City
    let cityform = document.createElement("div")
    cityform.classList.add("form-group","col")

    let citylabel = document.createElement("label")
    citylabel.innerText="Stad"

    let cityinput = document.createElement("input")
    cityinput.id="inputCity"
    cityinput.classList.add("form-control","col")
    cityinput.placeholder="Stad"

    //state
    let stateform = document.createElement("div")
    stateform.classList.add("form-group","col")

    let statelabel = document.createElement("label")
    statelabel.innerText="Region"

    let stateinput = document.createElement("input")
    stateinput.id="inputState"
    stateinput.classList.add("form-control","col")
    stateinput.placeholder="Region"
    
    //zip Code
    let zipform = document.createElement("div")
    zipform.classList.add("form-group","col")

    let ziplabel = document.createElement("label")
    ziplabel.innerText="Postkod"

    let zipinput = document.createElement("input")
    zipinput.id="inputZip"
    zipinput.classList.add("form-control","col")
    zipinput.placeholder="Postkod"

    let usernameToSave = document.createElement("input")
    usernameToSave.id = "usernameToSave"
    usernameToSave.placeholder ="6 characters"

    let passwordToSave = document.createElement("input")
    passwordToSave.id = "passwordToSave"
    passwordToSave.type="password"
    passwordToSave.placeholder ="6 characters"
    
    let createaccbtn = document.createElement("button")
    createaccbtn.id="createaccbtn"
    createaccbtn.classList.add("btn","btn-primary")
    createaccbtn.style.backgroundColor ="rgb(28, 58, 28)"
    createaccbtn.innerText ="Skapa Konto"

    /* createaccbtn.addEventListener("click",registerUser) */

    //create Acc
    /* createform.append(usernameToSave)
    createform.append(passwordToSave)
    createform.append(createaccbtn) */

    userform.append(userlabel)
    userform.append(userInput)

    
    passwordform.append(passwordlabel)
    passwordform.append(passwordinput)
    
    passwordCheckform.append(passwordChecklabel)
    passwordCheckform.append(passwordCheckinput)


    checkform.append(checkbox)
    checkform.append(checklabel)

    emaillabel.append(checkform)

    emailform.append(emaillabel)
    emailform.append(emailInput)

    firstnameform.append(firstnamelabel)
    firstnameform.append(firstnameInput)

    lastnameform.append(lastnamelabel)
    lastnameform.append(lastnamnInput)

    countryform.append(countrylabel)
    countryform.append(countryinput)

    adressform.append(adresslabel)
    adressform.append(adressinput)

    stateform.append(statelabel)
    stateform.append(stateinput)

    cityform.append(citylabel)
    cityform.append(cityinput)

    zipform.append(ziplabel)
    zipform.append(zipinput)

    
    credentials.append(userform)
    credentials.append(passwordform)
    credentials.append(passwordCheckform)
    contactinfo.append(emailform)
    /* contactinfo.append(checkform) */
    
    fullName.append(firstnameform)
    fullName.append(lastnameform)

    location.append(countryform)
    location.append(stateform)
    location.append(cityform)
    location.append(adressform)
    location.append(zipform)

    createform.append(credentials)
    createform.append(contactinfo)
    createform.append(fullName)
    createform.append(location)
    
    //render

    accountform.append(pagetitle)
    accountform.append(createform)
    renderCard.append(accountform)
    accountform.append(createaccbtn)

    document.getElementById("productCard").appendChild(renderCard);
    return renderCard
 
}

function renderProducts(products) {
    //Function will get the list of products and render them onto page
    document.getElementById("productCard").innerHTML = "";
    
    
    products.forEach((product => {
        
        let renderCard = document.createElement("div")
        renderCard.classList.add("card", "mx-3", "my-3", "py-2")
        renderCard.style.width = "15%"
        renderCard.style.height = "auto"
        renderCard.style.margin = "2px"
        
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "text-center")
        
        let image = document.createElement("img")
        image.classList.add("card-img-top", "img-fluid")    
        image.style.width = "auto"
        image.style.height = "80%"
        image.src = "./pictures/" + product.image
        image.style.maxHeight = "150px"

        let title = document.createElement("h6")
        title.classList.add("card-title")
        title.innerText = product.name

        let cardText = document.createElement("p")
        cardText.classList.add("card-text")
        cardText.innerText = product.price + " kr" + " " + product.weight + " g"
        let cardWeight = document.createElement("p")
        cardWeight.classList.add("card-text")

        let addbutton = document.createElement("button")
        addbutton.innerText = "Lägg i varukorgen"
        addbutton.classList.add("btn", "text-white")
        addbutton.style.background = "rgb(28, 58, 28)"

        addbutton.data = product
        addbutton.addEventListener("click", addProductToCart) /* () =>{
            alert ("you clicked the button");
    }); */
    
    cardBody.append(image)
    cardBody.append(title)
    cardBody.append(cardText)
    cardBody.append(cardWeight)
    cardBody.append(addbutton)
    renderCard.append(cardBody)

    document.getElementById("productCard").appendChild(renderCard);
  
    }))
}

async function getAllProducts() {
    document.getElementById("productCardCart").innerHTML = "";
    var url = new URL("http://localhost/api/recievers/productReciever.php")
    var params = {action: "getAllProducts"} 
    url.search = new URLSearchParams(params);

    let products = await makeRequest(url, "GET")
    renderProducts(products)
}


async function updateCartCounter(userID) {
    console.log("updateCartCounter")
    document.getElementById("cartCounter").innerText = ""
    let url = new URL("http://localhost/api/recievers/productReciever.php")
        
    let params = {action: "getCartCounter", userID: userID}
    console.log(params)
    url.search = new URLSearchParams(params)
    console.log(url)

    let cartItem = await makeRequest(url, "GET")

    document.getElementById("cartCounter").innerText = cartItem[0].quant    
}



async function getCategory(category) {
    //FETCHES ARRAY OF PRODUCTS CONTAINED IN A CATEGORY. categoryID SET IN PARAMETER.

    var url = new URL("http://localhost/api/recievers/productReciever.php")
    
    var params = {action: "getCategory", categoryID: category} 
    url.search = new URLSearchParams(params);

let products = await makeRequest(url, "GET")
renderProducts(products)

}

async function getProduct(product) {
    //FETCHES SPECIFIC PRODUCT. prodID SET IN PARAMETER.

    var url = new URL("http://localhost/api/recievers/productReciever.php")
    
    var params = {action: "getProduct", productID: product } 
    url.search = new URLSearchParams(params);

let products = await makeRequest(url, "GET")
console.log(products)

}


async function addProductToCart(){
    
    const productID = this.data.id
    console.log(productID)
    let cartItemlist = []
    const userID = 1 // för inställd userID
    var url = new URL("http://localhost/api/recievers/productReciever.php")
    
    var params = {action: "getcartitem", userID: userID} 
    url.search = new URLSearchParams(params);
    cartItemlist = await makeRequest(url, "GET")
    

    	for (let i = 0; i < cartItemlist.length; i++) {
            const checkID = cartItemlist[i].prodID;

            if (checkID == productID){
                
                const product = {
                    userID:userID,
                    prodID:productID  
                } 

                let body = new FormData()
                body.append("action", "addQty")
                body.append("product", JSON.stringify(product))
            
                const result = await makeRequest("http://localhost/api/recievers/productReciever.php", "POST",body)

                console.log(result)
                updateCartCounter(1)
                return

            } else if(checkID != productID){
                
            }
        }
        addNewProduct(1)
        async function addNewProduct(){
            const product = {
                userID:userID,
                prodID:productID,
                quantity:1    
            } 
            let body = new FormData()
            body.append("action", "addProductToCart")
            body.append("product", JSON.stringify(product))
            
            const result = await makeRequest("http://localhost/api/recievers/productReciever.php", "POST",body)
            console.log(result)
            updateCartCounter(1)
            return
        }
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
