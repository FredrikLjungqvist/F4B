function initCart() {
    document.getElementById("productCardCart").innerHTML=""
    document.getElementById("productCard").innerHTML=""
    
    getCart()
    
}

function initCustomer() {
    console.log("initCustomer")
    //document.getElementById("customerInfo").innerHTML=""
    document.getElementById("customerInfo").innerHTML=""
    getCustomer()
}

function renderCart(cart) {
    document.getElementById("productCardCart").innerHTML=""
    document.getElementById("productCard").innerHTML=""
    /* if(!cart) {
        let emptyCart = document.createElement(h3)
        emptyCart.innerText = "Det finns inga produkter i varukorgen"
        productCard.appendChild(emptyCart)
    }
     */
    cart.cartitems.forEach((cartItem => {
        cartItem.product.forEach(value => {
            
            let renderCardCart = document.createElement("div")
            renderCardCart.className = "card";
            renderCardCart.style.width = "80%"
            renderCardCart.style.height = "5.5rem"
            renderCardCart.style.margin = "5px"
      
            let image = document.createElement("img")
            image.classList.add("card-img-top", "img-fluid", "p-0")    
            image.style.width = "auto"
            image.style.height = "100%"
            image.src = "./pictures/" + value.image
            image.style.maxWidth = "50px"
            image.style.maxHeight = "60px"
          
            let cardBodyCart = document.createElement("div")
            cardBodyCart.classList.add("card-body", "d-flex", "justify-content-around", "align-items-center")
            cardBodyCart.style.padding = "1rem"
      
            let title = document.createElement("h6");
            title.classList.add("card-title","d-flex","p-0","align-items-center")
            title.innerText = value.name 
            title.style.maxWidth = "130px"
            title.style.maxHeight = "15px"
      
            let cardText = document.createElement("p")
            cardText.classList.add("card-text","d-flex", "p-0", "align-items-center")
            cardText.innerText = " Pris: " + value.price + " kr "
            cardText.style.maxWidth = "130px"
            cardText.style.maxHeight = "15px"
      
            let cardWeight = document.createElement("p")
            cardWeight.classList.add("card-text","d-flex","p-0", "align-items-center")
            cardWeight.innerText = " Vikt: " + value.weight + " g "
            cardWeight.style.maxWidth = "130px"
            cardWeight.style.maxHeight = "15px"

            let cardQuant = document.createElement("p")
            cardQuant.classList.add("card-text","d-flex","p-0","align-items-center")
            cardQuant.innerText = " Antal: " + cartItem.quantity + " st"
            title.style.maxWidth = "130px"
            title.style.maxHeight = "15px"

            let cardTotWeight = document.createElement("p")
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

            let deleteBtn = document.createElement("button")
            deleteBtn.classList.add("btn", "text-grey", "p-0","align-items-center")
            deleteBtn.style.background = "white"
            deleteBtn.style.maxWidth = "12px"
            deleteBtn.style.maxHeight = "12px"
          
        deleteBtn.data = value.id
        deleteBtn.addEventListener("click", function() {deleteCartItem(cartItem)}); 
          
      
      cardBodyCart.append(image, title, cardText, cardWeight, cardQuant, cardTotWeight, cardTotal, deleteBtn)
      deleteBtn.append(iconCross)
      renderCardCart.append(cardBodyCart)
      
      document.getElementById("productCardCart").appendChild(renderCardCart);
      });
      
    }))

    let totalDiv = document.createElement("div")
    totalDiv.classList.add("card")

    let totalDivTwo = document.createElement("div")
    totalDivTwo.classList.add("card-body")
    
    let totalText = document.createElement("h5")
    totalText.innerText = "Total Vikt: " + cart.totalWeight + " g"

    let totalTextTwo = document.createElement("h5")
    totalTextTwo.innerText = "Total Pris: " + cart.totalPrice + " kr"

   
    //append Total vikt och totalt pris

    let buyBtn = document.createElement("button")
    buyBtn.innerText = "Gå till betalning"
    buyBtn.classList.add("btn", "text-white")
    buyBtn.style.background = "rgb(28, 58, 28)"
    buyBtn.style.width = "200px"
    buyBtn.addEventListener("click", orderCart)

    totalDiv.append(totalDivTwo)
    totalDiv.append(totalText)
    totalDiv.append(totalTextTwo)
    
    document.getElementById("productCardCart").appendChild(totalDiv); 
}


 async function orderCart() {
    cart= await getCart()
    console.log(cart)
    body= new FormData
    body.append("action", "sendOrder")
    body.append("cart", JSON.stringify(cart))
    let response = await makeRequest("./api/recievers/orderReciever.php", "POST", body)
    console.log(response)
    renderOrders(response)
    
}  

async function getCart() {
    var url = new URL("http://localhost/api/recievers/productReciever.php")
    var params = {action: "getCart", userID: 1} 
    url.search = new URLSearchParams(params);

    let cart = await makeRequest(url, "GET")
    console.log(cart)
    renderCart(cart)
    return cart
}

async function deleteCartItem() {
    const prodID = this.data
    const userID = 1

    let body = new FormData()
    body.append("prodID", prodID)
    body.append("userID", userID)
    body.append("action", "deleteAll")
    
    const result = await makeRequest("./api/recievers/productReciever.php", "POST", body)
    console.log(result)
    getCart()
    updateCartCounter(1)
}

renderCustomer()

async function renderCustomer() {
 
    let customer = await getCustomer()
    console.log(customer)

    //kunduppgifter
    let renderCustomerCard = document.createElement("div")
    //renderCustomerCard.classList.add("container")
    renderCustomerCard.style.width = "80%"
    //renderCustomerCard.style.height = "5.5rem"
    renderCustomerCard.style.margin = "5px"
    
    let cardBodyCustomer = document.createElement("div")
    cardBodyCustomer.classList.add("card-body", "d-flex", "justify-content-around", "align-items-center",)
    cardBodyCustomer.style.padding = "1rem"        

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
    addressTwoLabel.classList.add("m-0", "mt-1")
    addressTwoLabel.innerText="Adress 2"

    let addressTwoInput = document.createElement("td")
    addressTwoInput.classList.add("form-control", "col")
    addressTwoInput.innerText = customer[0].address2

    //zipCode + city
    let zipCodeCityLabel = document.createElement("tr")
    zipCodeCityLabel.classList.add("m-0")
    zipCodeCityLabel.innerText="Postnummer och ort"

    let zipCodeCityInput = document.createElement("td")
    zipCodeCityInput.classList.add("form-control", "col")
    zipCodeCityInput.innerText = customer[0].zipCode + " " + customer[0].city

    //country
    let countryLabel = document.createElement("tr")
    countryLabel.classList.add("m-0")
    countryLabel.innerText="Land"

    let countryInput = document.createElement("td")
    countryInput.classList.add("form-control", "col")
    countryInput.innerText = customer[0].country
    
    //email
    let customerEmailLabel = document.createElement("tr")
    customerEmailLabel.classList.add("m-0")
    customerEmailLabel.innerText="Email-adress"

    let customerEmailInput = document.createElement("td")
    customerEmailInput.classList.add("form-control", "col")
    customerEmailInput.innerText = customer[0].email

    //mobilephone
    let customerMobileLabel = document.createElement("tr")
    customerMobileLabel.classList.add("m-0")
    customerMobileLabel.innerText = "Mobilnummer"

    let customerMobileInput = document.createElement("td")
    customerMobileInput.classList.add("form-control", "col")
    customerMobileInput.innerText = customer[0].mobilePhone

    
    //append kunduppgifter   
    customerAccountForm.append(customerPageTitle)

    customerAccountForm.append(fullnameLabel, fullnameInput)

    customerAccountForm.append(addressOneLabel,addressOneInput) 

    customerAccountForm.append(addressTwoLabel, addressTwoInput)
   
    customerAccountForm.append(zipCodeCityLabel, zipCodeCityInput)

    customerAccountForm.append(countryLabel, countryInput)

    customerAccountForm.append(customerEmailLabel, customerEmailInput)
    
    customerAccountForm.append(customerMobileLabel, customerMobileInput)

    //renderCustomerCard.append(customerAccountForm)

   
    document.getElementById("customerInfo").appendChild(renderCustomerCard);
   
    /*shipper.forEach((shipper) => { */
    
        //leveransalternativ
        let renderShipOptions = document.createElement("div")
        renderShipOptions.classList.add("container")

        let shipOptionTitle = document.createElement("h3")
        shipOptionTitle.innerText ="Välj leveransalternativ"

        let shipOptionText = document.createElement("h6")
        shipOptionText.innerText = "Paketet hämtas på närmaste utlämningsställe som anges i sms-aviseringen."
    
        let shipOptionForm = document.createElement("table")
        shipOptionForm.classList.add("table-row","m-6")

        //shipOptionsOne
        let shipperOneLabel = document.createElement("tr")
        shipperOneLabel.classList.add("row", "form-check-label", type="radio")

        let shipperOneRadioInput = document.createElement("INPUT");
        shipperOneRadioInput.classList.add("form-check-input", "m-1")
        shipperOneRadioInput.setAttribute("type", "radio");
        shipperOneRadioInput.name = "frakt"

        let shipperOneName = document.createElement("h6")
        shipperOneName.classList.add("row", "ml-4")
        //shipperOneName.innerText = shipper.companyName
        shipperOneName.innerText = "Bring"

        /* let shipperOneText = document.createElement("td")
        shipperOneText.innerText = "Fraktpris: 150" + " kr"  */

        //shipperOptionTwo
        let shipperTwoLabel = document.createElement("tr")
        shipperTwoLabel.classList.add("row", "form-check-label", type="radio")

        let shipperTwoRadioInput = document.createElement("INPUT");
        shipperTwoRadioInput.classList.add("form-check-input", "m-1");
        shipperTwoRadioInput.setAttribute("type", "radio");
        shipperTwoRadioInput.name = "frakt"

        let shipperTwoName = document.createElement("h6")
        shipperTwoName.classList.add("row", "ml-4")
        shipperTwoName.innerText = "PostNord"

        /* let shipperTwoText = document.createElement("td")
        shipperTwoText.innerText = "Fraktpris: 75" + " kr"  */

        //shipperOptionThree
        let shipperThreeLabel = document.createElement("tr")
        shipperThreeLabel.classList.add("row","form-check-label", type="radio")

        let shipperThreeRadioInput = document.createElement("INPUT");
        shipperThreeRadioInput.classList.add("form-check-input", "m-1");
        shipperThreeRadioInput.setAttribute("type", "radio");
        shipperThreeRadioInput.name = "frakt"

        let shipperThreeName = document.createElement("h6")
        shipperThreeName.classList.add("row", "ml-4")
        shipperThreeName.innerText = "DHL"

        /* let shipperThreeText = document.createElement("td")
        shipperThreeText.innerText = "Fraktpris: 125" + " kr"  */

    /*})*/

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
        
    //knapp bekräfta och gå till betalning
    let buyBtnForm = document.createElement("div")
        
    let buyBtn = document.createElement("button")
    buyBtn.innerText = "Bekräfta och gå till betalning"
    buyBtn.classList.add("btn", "text-white", "col")
    buyBtn.style.background = "rgb(28, 58, 28)"
    buyBtn.style.width = "300px"
    buyBtn.style.margin.bottom = "100px"
    buyBtn.addEventListener("click", orderCart)

    //append levernasalternativ
    shipOptionForm.append(shipOptionTitle, shipOptionText)

    //append shipper1
    shipOptionForm.append(shipperOneLabel, shipperOneRadioInput, shipperOneName)
    /*shipOptionForm.append(shipperOneText)*/

    //append shipper2
    shipOptionForm.append(shipperTwoLabel, shipperTwoRadioInput, shipperTwoName)       
    /*shipOptionForm.append(shipperTwoText)*/

    //append shipper3
    shipOptionForm.append(shipperThreeLabel, shipperThreeRadioInput, shipperThreeName )
    /*shipOptionForm.append(shipperThreeText)*/

    //newsletter
    checkformTwo.append(checkText, checkboxTwo, checklabelTwo)
        
    //bekräfta knappen
    buyBtnForm.append(buyBtn)

    renderShipOptions.append(customerAccountForm, shipOptionForm, checkformTwo, buyBtnForm)
   
    document.getElementById("shippingInfo").appendChild(renderShipOptions);
   
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
        console.log("det blev fel"+error)
    }
}
