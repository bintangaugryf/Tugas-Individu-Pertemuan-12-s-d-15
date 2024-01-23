//ELEMENT VARIABLES
const destName = document.querySelector("#name");
const destLocation = document.getElementById("location");
const destPhoto = document.getElementById("photo");
const destDesc = document.getElementById("description");
const destRemove = document.createElement("button");
const gridContainer = document.querySelector(".grid-card-container");
const submitEl = document.querySelector("#save");


submitEl.addEventListener("click", (event) => {
    event.preventDefault();
    const cardsContainer = document.createElement("div");
    cardsContainer.className = "cards-container";
    const img = document.createElement("img");


    if (destPhoto.value) {
        img.setAttribute("src", destPhoto.value);
    } else {
        img.setAttribute("src", "https://asset.kompas.com/crops/BvFN9Z9CJi3umL6FS_TFXBkehG0=/0x15:977x667/750x500/data/photo/2020/01/05/5e11aed43e19f.jpg");
    }
    img.setAttribute("alt", destName);
    cardsContainer.appendChild(img);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <h3>${destName.value}</h3>
    <p>Destination Name: ${destName.value}</p>
    <p>Destination Location: ${destLocation.value}</p>

    <h3>Description:</h3>
    <p>${destDesc.value}</p>`

    //adding to the container

    cardsContainer.appendChild(card);
    gridContainer.appendChild(cardsContainer);

    console.log("HELLO CLICKEDX");
})

