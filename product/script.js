function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Article ajouté au panier !');
}

function createAddButton(product) {
    const addButton = document.createElement('button');
    addButton.classList.add('bs-card-btn');
    addButton.textContent = 'Ajouter à mon panier';

    addButton.addEventListener('click', () => {
        addToCart(product);
    });

    return addButton;
}

function getProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const api = 'https://api.kedufront.juniortaker.com/item/';
    const imgApi = 'https://api.kedufront.juniortaker.com/item/picture/';
    axios.get(api + id)
        .then(response => {
            const product = response.data.item;
            console.log(product);

            const productDetailsElement = document.getElementById('productDetails');
            const productHTML = `
                <div class="name">
                    <h2>${product.name}</h2>
                </div>
                <div class="content">
                    <img src="${imgApi}${product._id}" alt="${product.name}" style="max-width: 100%;">
                    <div class="details">
                        <p class="title">Caractéristiques : <span>${product.description}</span></p>
                        <p>Fabriqué en : ${product.createdIn}</p>
                        <p>Prix: ${product.price}€</p>
                        <div class="button-container" id="addToCartBtn"></div>
                    </div>
                </div>
            `;
            productDetailsElement.innerHTML = productHTML;

            const addToCartBtnContainer = document.getElementById('addToCartBtn');
            const addButton = createAddButton(product);
            addToCartBtnContainer.appendChild(addButton);
        })
        .catch(error => {
            console.error('Erreur récupération produit :', error);
        });
}

getProductDetails();
