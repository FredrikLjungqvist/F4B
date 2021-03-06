async function initCart() {
    document.getElementById("productCardCart").innerHTML=""
    user = await getUser()
    
    if (user==undefined) {
        
        loginModal()
    }else{
        document.getElementById("productCard").innerHTML=""
        getCart()
        
   
    }  
}

function initCustomer() {
    
    
    document.getElementById("customerInfo").innerHTML=""
    getCustomer()
}

function renderCart(cart) {
    
    document.getElementById("customerInfo").innerHTML=""
    document.getElementById("productCardCart").innerHTML=""
    document.getElementById("productCard").innerHTML=""
    document.getElementById("productCardOrder").innerHTML = "";
   
    
    cart.cartitems.forEach((cartItem => {
        cartItem.product.forEach(value => {
            
            let renderCardCart = document.createElement("div")
            renderCardCart.className = "card";
            renderCardCart.style.minheight = "5.5rem"
            renderCardCart.style.margin = "5px"
      
            let image = document.createElement("img")
            image.classList.add("card-img-top", "img-fluid", "p-0")
            image.style.marginRight = "5px"    
            image.style.width = "auto"
            image.style.height = "100%"
            image.src = "./pictures/" + value.image
            image.style.maxWidth = "50px"
            image.style.maxHeight = "60px"
          
            let cardBodyCart = document.createElement("div")
            cardBodyCart.classList.add(/* "card-body", */ "d-flex", "justify-content-around","flex-wrap", "align-items-center")
            cardBodyCart.style.padding = "1rem"
            cardBodyCart.id = "cardBodyCart"
            
            
            let titleContainer = document.createElement("div")
            titleContainer.style.flexGrow ="1"
            titleContainer.classList.add("m-2", "row")

            let descriptionContainer = document.createElement("div")
            descriptionContainer.style.flexGrow ="3"
            descriptionContainer.classList.add("m-2","row", "flex-wrap")
            
      
            let producttitle = document.createElement("h6")
            producttitle.id = "producttitle"
            producttitle.classList.add(/* "card-title" */"d-flex","p-0","align-items-center")
            producttitle.innerText = value.name 
            producttitle.style.maxWidth = "130px"
           
      
            let cardText = document.createElement("p")
            cardText.style.marginBottom="3px"
            cardText.classList.add("card-text","d-flex", "p-0", "align-items-center")
            cardText.innerText = " Pris: " + value.price + " kr "
            cardText.style.maxWidth = "130px"
            cardText.style.maxHeight = "15px"
      
            let cardWeight = document.createElement("p")
            cardWeight.style.marginBottom="3px"
            cardWeight.classList.add("card-text","d-flex","p-0", "align-items-center")
            cardWeight.innerText = " Vikt: " + value.weight + " g "
            cardWeight.style.maxWidth = "130px"
            cardWeight.style.maxHeight = "15px"

            let cardQuant = document.createElement("p")
            cardQuant.style.marginBottom="3px"
            cardQuant.classList.add("card-text","d-flex","p-0","align-items-center")
            cardQuant.innerText = " Antal: " + cartItem.quantity + " st"
            cardQuant.style.maxWidth = "130px"
            cardQuant.style.maxHeight = "15px"

            let cardTotWeight = document.createElement("p")
            cardTotWeight.marginBottom="3px"
            cardTotWeight.classList.add("card-text","d-flex","p-0", "align-items-center")
            cardTotWeight.innerText = "Sum vikt: " + value.weight * cartItem.quantity + " g"
            cardTotWeight.style.maxWidth = "130px"
            cardTotWeight.style.maxHeight = "15px"

            let cardTotal = document.createElement("p")
            cardTotal.classList.add("card-text","d-flex","p-0","align-items-center")
            cardTotal.innerText = "Sum pris: " + value.price * cartItem.quantity + " kr"
            cardTotal.style.maxWidth = "130px"
            cardTotal.style.maxHeight = "15px"

            let iconCross = document.createElement("i")
            iconCross.classList = "fa fa-close"
            iconCross.style.marginBottom = "5px"

            let deleteBtn = document.createElement("button")
            deleteBtn.classList.add("btn", "text-grey", "p-0","align-items-center")
            deleteBtn.style.background = "white"
            deleteBtn.style.maxWidth = "200px"
            deleteBtn.style.maxHeight = "120px"
          
        deleteBtn.data = value.id
        deleteBtn.addEventListener("click", deleteCartItem) 
          
      
      titleContainer.append(image, producttitle,)
      descriptionContainer.append(cardText, cardWeight, cardQuant, cardTotWeight, cardTotal)
      cardBodyCart.append(titleContainer, descriptionContainer,deleteBtn)
      deleteBtn.append(iconCross)
      renderCardCart.append(cardBodyCart)
      
      document.getElementById("productCardCart").appendChild(renderCardCart);
      });
      
    }))

    let totalDiv = document.createElement("div")
    totalDiv.style.margin = "5px"
    totalDiv.style.padding="5px"
    totalDiv.classList.add("card")

    let totalDivTwo = document.createElement("div")
    
    let totalText = document.createElement("h5")
    totalText.innerText = "Total Vikt: " + cart.totalWeight + " g"

    let totalTextTwo = document.createElement("h5")
    totalTextTwo.innerText = "Total Pris: " + cart.totalPrice + " kr"

   
    //append Total vikt och totalt pris

    let buyBtn = document.createElement("button")
    buyBtn.innerText = "Gå till betalning"
    buyBtn.classList.add("btn", "text-white")
    buyBtn.style.background = "rgb(28, 58, 28)"
    buyBtn.addEventListener("click", orderCart)

    totalDiv.append(totalDivTwo)
    totalDiv.append(totalText)
    totalDiv.append(totalTextTwo)
    
    document.getElementById("productCardCart").appendChild(totalDiv); 
    
}


 async function orderCart() {
     cart= await getCart()
     
     body= new FormData
     body.append("shipperID", shipperId)
     body.append("action", "sendOrder")
     body.append("cart", JSON.stringify(cart))
     let response = await makeRequest("./api/recievers/orderReciever.php", "POST", body)
     
     renderOrders(response)
     updateCartCounter()
    
}  

async function getCart() {
    userID = await getUser()
    var url = new URL("http://localhost/api/recievers/productReciever.php")
    var params = {action: "getCart", userID: userID} 
    url.search = new URLSearchParams(params);

    let cart = await makeRequest(url, "GET")

    if (cart.totalPrice == 0) {

        document.getElementById("productCardCart").innerHTML=""
        document.getElementById("productCardOrder").innerHTML=""
        document.getElementById("shippingInfo").innerHTML=""
        document.getElementById("customerInfo").innerHTML=""
        
        let emptyCart = document.createElement("h3")
        emptyCart.style.textAlign = "center"
        emptyCart.style.margin = "20% 0"
        emptyCart.innerText = "Det finns inga produkter i varukorgen"
        productCardCart.appendChild(emptyCart)
    } else {
        renderCart(cart)
        renderCustomer()
        return cart

    }
    
}

async function deleteCartItem() {
    const prodID = this.data
    const userID = await getUser()

    let body = new FormData()
    body.append("prodID", prodID)
    body.append("userID", userID)
    body.append("action", "deleteAll")
    
    const result = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    
    getCart()
    updateCartCounter()
}

let shipperId=""

async function renderCustomer() {
    
    //document.getElementById("customerInfo").innerHTML="" */
    let customer = await getCustomer()
    
    
    //kunduppgifter
    let renderCustomerCard = document.createElement("div")
    renderCustomerCard.classList.add("container")
    renderCustomerCard.style.width = "80%"
    renderCustomerCard.style.height = "5.5rem"
    renderCustomerCard.style.margin = "5px" 
    
    
    
    let customerPageTitle = document.createElement("h3")
    customerPageTitle.innerText ="Kunduppgifter"
    
    let customerAccountForm = document.createElement("table")
    customerAccountForm.classList.add("table-row","m-2") 
    
    //förnamn + efternamn
    let fullnameLabel = document.createElement("tr")
    fullnameLabel.classList.add("table", "row", "col", "m-0")
    fullnameLabel.innerText="För- och efternamn"
    
    let fullnameInput = document.createElement("td")
    fullnameInput.classList.add("form-control", "col")
    fullnameInput.innerText = customer[0].firstName + " " + customer[0].lastName
    
    //adress1
    let addressOneLabel = document.createElement("tr")
    addressOneLabel.classList.add("table", "row", "col", "m-0")
    addressOneLabel.innerText="Adress 1"
    
    let addressOneInput = document.createElement("td")
    addressOneInput.classList.add("form-control", "col")
    addressOneInput.innerText = customer[0].address1
    
    //address2
    let addressTwoLabel = document.createElement("tr")
    addressTwoLabel.classList.add("table", "row", "col", "m-0")
    addressTwoLabel.innerText="Adress 2"
    
    
    
    //zipCode + city
    let zipCodeCityLabel = document.createElement("tr")
    zipCodeCityLabel.classList.add("table", "row", "col", "m-0")
    zipCodeCityLabel.innerText="Postnummer och ort"
    
    let zipCodeCityInput = document.createElement("td")
    zipCodeCityInput.classList.add("form-control", "col", "m-0")
    zipCodeCityInput.innerText = customer[0].zipCode + " " + customer[0].city
    
    //country
    let countryLabel = document.createElement("tr")
    countryLabel.classList.add("table", "row", "col", "m-0")
    countryLabel.innerText="Land"
    
    let countryInput = document.createElement("td")
    countryInput.classList.add("form-control", "col")
    countryInput.innerText = customer[0].country
    
    //email
    let customerEmailLabel = document.createElement("tr")
    customerEmailLabel.classList.add("table", "row", "col", "m-0")
    customerEmailLabel.innerText="Email-adress"
    
    let customerEmailInput = document.createElement("td")
    customerEmailInput.classList.add("form-control", "col")
    customerEmailInput.innerText = customer[0].email
    
    //mobilephone
    let customerMobileLabel = document.createElement("tr")
    customerMobileLabel.classList.add("table", "row", "col", "m-0")
    customerMobileLabel.innerText = "Mobilnummer"
    
    let customerMobileInput = document.createElement("td")
    customerMobileInput.classList.add("form-control", "col")
    customerMobileInput.innerText = customer[0].mobilePhone
    
    
    //append kunduppgifter   
    customerAccountForm.append(customerPageTitle)
    
    customerAccountForm.append(fullnameLabel, fullnameInput)
    
    customerAccountForm.append(addressOneLabel,addressOneInput) 
    
    //customerAccountForm.append(addressTwoLabel, addressTwoInput)
    
    customerAccountForm.append(zipCodeCityLabel, zipCodeCityInput)
    
    customerAccountForm.append(countryLabel, countryInput)
    
    customerAccountForm.append(customerEmailLabel, customerEmailInput)
    
    customerAccountForm.append(customerMobileLabel, customerMobileInput)
    
    let shipperarray = await getShipper()
    
    
    
    //leveransalternativ
    let renderShipOptions = document.createElement("div")
    renderShipOptions.style.maxwidth="800px"
    renderShipOptions.classList.add("container")
    
    
    let shipOptionTitle = document.createElement("h3")
    shipOptionTitle.innerText ="Välj leveransalternativ"
    
    let shipOptionText = document.createElement("h6")
    shipOptionText.innerText = "Paketet hämtas på närmaste utlämningsställe som anges i sms-aviseringen."
    
    let shipOptionForm = document.createElement("table")
    shipOptionForm.classList.add("table-row","m-6")
    
    shipOptionForm.append(shipOptionTitle, shipOptionText)

    shipperarray.forEach((shipper, i) => {
        
        //shipOptionsOne
        let shipperOneLabel = document.createElement("tr")
        shipperOneLabel.classList.add("row", "form-check-label", type="radio")
        
        let shipperOneRadioInput = document.createElement("INPUT");
        shipperOneRadioInput.classList.add("form-check-input", "m-1")
        shipperOneRadioInput.setAttribute("type", "radio");
        shipperOneRadioInput.name = "frakt"
        shipperOneRadioInput.value = i+1
        shipperOneRadioInput.addEventListener("click", ()=> {
            shipperId = shipperOneRadioInput.value
            
        })
        
        let shipperOneName = document.createElement("h6")
        shipperOneName.classList.add("row", "ml-4")
        shipperOneName.innerText = shipper.companyName + " - leveranstid: " + shipper.deliverytime + " arbetsdagar"
        
        shipOptionForm.append(shipperOneLabel, shipperOneRadioInput, shipperOneName)
    })
    
    //newsletter 
    let checkformTwo = document.createElement("div")
    checkformTwo.classList.add("col","ml-3")
    
    let checkText = document.createElement("h3")
    checkText.innerText = "Newsletter"
    
    let checklabelTwo = document.createElement("label")
    checklabelTwo.classList.add("form-check-label")
    checklabelTwo.innerText="Jag vill bli informerad om nyheter, aktuella erbjudanden och händelser från F4B-FRILUFT via e-post."
      
    let checkboxTwo = document.createElement("input")
    checkboxTwo.type ="checkbox"
    checkboxTwo.id="checkbox"
    checkboxTwo.classList.add("form-check-input")
    checkboxTwo.addEventListener("change", e=>{
        
        if(e.target.checked){
            orderNewsletter(customer[0].email, customer[0].firstName)
        }
        
    });
    
    //knapp bekräfta och gå till betalning
    let buyBtnForm = document.createElement("div")
    
    let buyBtn = document.createElement("button")
    buyBtn.innerText = "Bekräfta köp"
    buyBtn.classList.add("btn", "text-white", "col", "mt-4")
    buyBtn.style.background = "rgb(28, 58, 28)"
    buyBtn.style.width = "300px"
    buyBtn.style.margin.bottom = "100px"
    buyBtn.addEventListener("click", orderCart)
    
      
    //newsletter
    checkformTwo.append(checkText, checkboxTwo, checklabelTwo)
    
    //bekräfta knappen
    buyBtnForm.append(buyBtn)
    
    renderShipOptions.append(customerAccountForm, shipOptionForm, checkformTwo, buyBtnForm)
    
    document.getElementById("shippingInfo").appendChild(renderShipOptions);
    
}

async function orderNewsletter(email, firstName){
    
    
    let body = new FormData()
    body.append("user", JSON.stringify({"email" :email, "name":firstName}))
    body.append("action", "addNewsletter")

    let response = await makeRequest("http://localhost/api/recievers/customerReceiver.php", "POST",body)
    
}

async function getCustomer() {
    var url = new URL("http://localhost/api/recievers/customerReceiver.php")
    var params = {action: "getCustomer"} 
    url.search = new URLSearchParams(params);

    let customer = await makeRequest(url, "GET")
    return customer
}

async function getShipper() {
    var url = new URL("http://localhost/api/recievers/customerReceiver.php")
    var params = {action: "getShipper"}
    url.search = new URLSearchParams(params);

    let shipper = await makeRequest(url, "GET")
   
    return shipper
}


async function makeRequest(url, method, body) {
    // Using fetch to send REST method and body (if set) to set path. Returns response or error
    try {
        const response = await fetch(url, {method,body})
        return response.json()
    
    } catch (error) {
        
    }
}
