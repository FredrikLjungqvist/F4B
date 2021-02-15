renderCard()

//Function will get the list of products and render them onto page 
function renderCard() {
    let renderCard = document.createElement("div");
    renderCard.className ="card";

    let cardBody = document.createElement("div");
    cardBody.className ="card-Body"

    let title = document.createElement("div");
    title.innerText ="En title"//placera productens namn här från databasen

    let image = document.createElement("img")
    image.className ="img"
    image.style.width = "50px" //Instead of a picture for now
    image.style.height ="50px"//Instead of a picture for now
    image.style.backgroundColor ="purple"//Instead of a picture for now
    image.innerText="tomt på bilder just nu"

    let cardText = document.createElement("p")
    cardText.innerText ="Some text" //placera productens beskrivning här från databasen
    cardText.className = "card-text"

    let addbutton = document.createElement("button")
    addbutton.innerText ="Add button"
    addbutton.addEventListener("click", () =>{ //addera korrekt function för knappens click
        alert ("you clicked the button");
    });

    cardBody.append(title)
    cardBody.append(image)
    cardBody.append(cardText)
    cardBody.append(addbutton)
    renderCard.append(cardBody) // the body of content appends here

    document.getElementById("productCard"/*ID DÄR PRODUKT KORT SKAL RENDERAS*/).appendChild(renderCard);

}