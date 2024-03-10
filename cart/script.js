document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();

    const clearCartBtn = document.getElementById('clearCartBtn');
    clearCartBtn.addEventListener('click', clearCart);
});

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Votre panier est vide.</p>';
    } else {
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
                <p><strong>Nom:</strong> ${item.name}</p>
                <p><strong>Prix:</strong> ${item.price}€</p>
                <p><strong>Quantité:</strong> ${item.quantity}</p>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    alert('Le panier a été vidé.');
    displayCartItems();
}
