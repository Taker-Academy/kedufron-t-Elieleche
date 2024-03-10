// création d'une item card
// Fonction pour créer une carte d'élément (item card)
function createItemCard(item) {
    const imgApi = 'https://api.kedufront.juniortaker.com/item/picture/';
    const cardElement = document.createElement('div');
    cardElement.classList.add('bs-card');

    cardElement.addEventListener('click', () => {
        navigateToProductPage(item._id);
    });

    const imgElement = document.createElement('div');
    imgElement.classList.add('bs-card-img');
    imgElement.style.backgroundImage = `url(${imgApi}${item._id})`;
    imgElement.style.backgroundSize = 'contain';

    const bodyElement = document.createElement('div');
    bodyElement.classList.add('bs-card-body');

    const titleElement = createTitleElement(item);
    const dataElement = createDataElement(item);
    const priceSpan = createPriceElement(item);
    const addButton = createAddButton();

    bodyElement.appendChild(dataElement);
    bodyElement.appendChild(titleElement);
    bodyElement.appendChild(priceSpan);
    bodyElement.appendChild(addButton);

    cardElement.appendChild(imgElement);
    cardElement.appendChild(bodyElement);

    return cardElement;
}

function navigateToProductPage(itemId) {
    window.location.href = `../product/product.html?id=${itemId}`;
}


// titre du product
function createTitleElement(item) {
    const titleElement = document.createElement('div');
    titleElement.classList.add('bs-card-header');

    const titleLink = document.createElement('a');
    titleLink.classList.add('bs-card-title');
    titleLink.href = `product.html?id=${item._id}`;
    titleLink.textContent = item.name;

    titleElement.appendChild(titleLink);
    return titleElement;
}

function createDataElement(item) {
    const dataElement = document.createElement('div');
    dataElement.classList.add('bs-data');

    const brandSpan = document.createElement('span');
    brandSpan.classList.add('bs-card-brewery', 'para-font');
    brandSpan.textContent = item.brand;

    const detailsSpan = document.createElement('span');
    detailsSpan.classList.add('bs-card-brewery', 'para-font');
    detailsSpan.textContent = item.details;

    dataElement.appendChild(brandSpan);
    dataElement.appendChild(detailsSpan);

    return dataElement;
}

// creation prix
function createPriceElement(item) {
    const priceSpan = document.createElement('span');
    priceSpan.classList.add('price');
    priceSpan.textContent = `${item.price}€`;

    return priceSpan;
}

// bouton commande
function createAddButton() {
    const addButton = document.createElement('span');
    addButton.classList.add('bs-card-btn');
    addButton.textContent = 'Ajouter à mon panier';

    return addButton;
}

// reacup items
function getAndDisplayItems() {
    axios.get('https://api.kedufront.juniortaker.com/item/')
        .then(response => {
            const items = response.data;
            const bestSellingBeersElement = document.getElementById('bestSellingBeers');
            items.forEach(item => {
                const cardElement = createItemCard(item);
                bestSellingBeersElement.appendChild(cardElement);
            });
        })
        
        .catch(error => {
            console.error('récupération items a merdé stéphane !!!', error);
        });
}

getAndDisplayItems();
