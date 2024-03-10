function submitOrderForm() {
    const form = document.getElementById('orderForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const orderDetails = Object.fromEntries(formData.entries());
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        orderDetails.cart = cart.map(item => ({
            id: item._id,
            amount: item.quantity
        }));

        try {
            const response = await axios.post('https://api.kedufront.juniortaker.com/order/', orderDetails);
            console.log('Commande créée:', response.data);
            alert('Commande créée avec succès !');
            alert('ID de commande : ' + response.data.command_id);
            localStorage.removeItem('cart');
        } catch (error) {
            if (error.response) {
                console.error('Erreur de validation:', error.response.data);
                alert('Erreur de validation: ' + JSON.stringify(error.response.data));
            } else {
                console.error('Erreur:', error.message);
                alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', submitOrderForm);
