document.addEventListener('DOMContentLoaded', function() {
    // Data de LocalStorage
    let cartData = [];
    
    const storedCart = localStorage.getItem('isolationCart');
    if (storedCart) {
        cartData = JSON.parse(storedCart);
    }
    
    // If no cart data, try to get from URL parameters
    if (cartData.length === 0) {
        const urlParams = new URLSearchParams(window.location.search);
        const cartParam = urlParams.get('cart');
        if (cartParam) {
            try {
                cartData = JSON.parse(decodeURIComponent(cartParam));
            } catch (e) {
                console.error('Error parsing cart data from URL:', e);
            }
        }
    }
    
    // Populate checkout with cart data
    populateCheckout(cartData);
    
    // Event listeners
    document.getElementById('close-checkout').addEventListener('click', function() {
        window.close();
        // Fallback for browsers that don't allow window.close()
        if (!window.closed) {
            window.location.href = 'store.html';
        }
    });
    
    // Apply discount button
    document.querySelector('.apply-btn').addEventListener('click', function() {
        const discountCode = document.querySelector('.discount-input .form-input').value;
        if (discountCode) {
            alert(`Código "${discountCode}" ingresado`);
            // Here you would implement actual discount logic
        }
    });

});

function populateCheckout(cartData) {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const itemCount = cartData.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cartData.reduce((total, item) => total + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);
    
    // Update item count and totals
    document.getElementById('checkout-item-count').textContent = `${itemCount} items`;
    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${subtotal.toFixed(2)}`;
    
    // Populate items
    if (cartData.length > 0) {
        checkoutItemsContainer.innerHTML = cartData.map(item => `
            <div class="checkout-item">
                <div class="checkout-item-image" style="background-image: url('${item.image}')">
                    <div class="item-quantity">${item.quantity}</div>
                </div>
                <div class="checkout-item-details">
                    <div class="checkout-item-title">${item.title}</div>
                    <div class="checkout-item-subtitle">${item.subtitle}</div>
                </div>
                <div class="checkout-item-price">$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');
    } else {
        checkoutItemsContainer.innerHTML = '<div class="checkout-item">No hay productos en el carrito</div>';
    }
}
