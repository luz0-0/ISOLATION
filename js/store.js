document.addEventListener('DOMContentLoaded', function() {
    let currentLang = 'es';
    let currentTheme = 'light';
    let cart = [];

    const traduccion = {
        es: {
            TODO: 'TODO',
            DESTACADO: 'DESTACADO',
            MÚSICA: 'MÚSICA',
            ROPA: 'ROPA',
            TIENDA: 'TIENDA',
            COMPRAR: 'COMPRAR',
            SHOPPING_CART: 'CARRITO DE COMPRAS',
            PRODUCTS: 'PRODUCTOS',
            TOTAL: 'TOTAL:',
            SHIPPING_TEXT: 'ENVÍO E IMPUESTOS SE CALCULAN AL FINALIZAR LA COMPRA.',
            CHECKOUT: 'FINALIZAR COMPRA',
            CART_EMPTY: 'Tu carrito está vacío',
            VIEW_CART: 'VER'
        },
        en: {
              TODO: 'ALL',
            DESTACADO: 'FEATURED',
            MÚSICA: 'MUSIC',
            ROPA: 'CLOTHING',
            TIENDA: 'STORE',
            COMPRAR: 'BUY NOW',
            SHOPPING_CART: 'SHOPPING CART',
            PRODUCTS: 'PRODUCTS',
            TOTAL: 'TOTAL:',
            SHIPPING_TEXT: 'SHIPPING AND TAXES ARE CALCULATED AT CHECKOUT.',
            CHECKOUT: 'CHECKOUT',
            CART_EMPTY: 'Your cart is empty',
            VIEW_CART: 'VIEW'
        }
    };

    const products = [
        {
            id: '001',
            title: 'The Downward Spiral Deluxe Edition',
            subtitle: 'Vinyl Record',
            year: '1994',
            price: '$38.00',
            category: 'musica',
            featured: true,
            image: 'imgs/img_store/album1.png'
        },
        {
            id: '002',
        title: 'Red Spiral Longsleeve',
        subtitle: 'Black Cotton',
        year: '2023',
        price: '$50.00',
        category: 'ropa',
        featured: true,
        image: 'imgs/img_store/remera1.png'
   },
        {
            id: '003',
            title: 'Bad Witch LP',
            subtitle: 'Vinyl Record',
            year: '2018',
            price: '$28.00',
            category: 'musica',
            featured: true,
            image: 'imgs/img_store/album2.png'
        },
        {
            id: '004',
            title: 'Machine T-Shirt',
            subtitle: 'PRETTY HATE MACHINE design',
            year: '2023',
            price: '$55.00',
            category: 'ropa',
            featured: false,
            image: 'imgs/img_store/remera2.png'
        },
        {
            id: '005',
            title: 'The Fragile 3XLP',
            subtitle: 'Vinyl Record',
            year: '2016',
            price: '$39.00',
            category: 'musica',
            featured: false,
            image: 'imgs/img_store/album3.png'
        },
        {
            id: '006',
            title: 'Tour Tee 01',
            subtitle: '100% Cotton, unisex tee',
            year: '2025',
            price: '$35.00',
            category: 'ropa',
            featured: true,
            image: 'imgs/img_store/remera4.png'
        },

        {
            id: '007',
            title: 'Vinyl Black T-Shirt',
            subtitle: '100% Cotton, unisex tee',
            year: '2023',
            price: '$25.00',
            category: 'ropa',
            featured: true,
            image: 'imgs/img_store/remera3.png'
        }

    ];

    function renderProducts(productsToShow = products) {
        const grid = document.getElementById('products-grid');
        grid.innerHTML = '';

        productsToShow.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';
            productElement.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image}')">
                    <div class="product-overlay">
                        <button class="buy-button" data-text-buy="COMPRAR" data-product-id="${product.id}">
                            ${traduccion[currentLang].COMPRAR}
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-number">${String(index + 1).padStart(3, '0')}</div>
                    <div class="product-title">${product.title}</div>
                    <div class="product-subtitle">${product.subtitle}</div>
                    <div class="product-year">${product.year}</div>
                    <div class="product-price">${product.price}</div>
                </div>
            `;
            grid.appendChild(productElement);
        });

        // Add event listeners to buy buttons AFTER creating them
        document.querySelectorAll('.buy-button').forEach(button => {
            button.addEventListener('click', handlePurchase);
        });
    }

    function handlePurchase(event) {
        event.stopPropagation();
        const productId = event.target.dataset.productId;
        const product = products.find(p => p.id === productId);
        
        if (product) {
            addToCart(product);
        }
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
       animateScrews();
    
        updateCartUI();
    }

function animateScrews() {
        const screws = document.querySelectorAll('#floating-cart .screw');
        
        screws.forEach((screw, index) => {
            // Agregar la clase spinning con un pequeño delay para cada tornillo
            setTimeout(() => {
                screw.classList.add('spinning');
                
                // Remover la clase después de que termine la animación
                setTimeout(() => {
                    screw.classList.remove('spinning');
                }, 800);
            }, index * 100); // Delay de 100ms entre cada tornillo
        });
    }


    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
    }

   function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                // Si se incrementa la cantidad, animar los tornillos
                if (change > 0) {
                    animateScrews();
                }
                updateCartUI();
            }
        }
    }

     function updateCartUI() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartTotal = cart.reduce((total, item) => total + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);
        
        // Update sidebar cart
        const cartItemsCountElement = document.getElementById('cart-items-count');
        const cartTotalElement = document.getElementById('cart-total');
        
        if (cartItemsCountElement) cartItemsCountElement.textContent = cartCount;
        if (cartTotalElement) cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
        
        // Update floating cart
        updateFloatingCart(cartCount, cartTotal);
        
        renderCartItems();
    }


    function updateFloatingCart(itemCount, total) {
        const floatingCart = document.getElementById('floating-cart');
        const itemsElement = document.getElementById('float-cart-items');
        const totalElement = document.getElementById('float-cart-total');
        
        if (itemCount > 0) {
            floatingCart.classList.remove('hidden');
            const itemText = itemCount === 1 ? 'item' : 'items';
            if (itemsElement) itemsElement.textContent = `${itemCount} ${itemText}`;
            if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
        } else {
            floatingCart.classList.add('hidden');
        }
    }

 function clearCart() {
        cart = [];
        updateCartUI();
    }



    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<div class="cart-empty">${traduccion[currentLang].CART_EMPTY}</div>`;
            return;
        }
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-subtitle">${item.subtitle}</div>
                    <div class="cart-item-price">${item.price}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" data-product-id="${item.id}" data-action="decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" data-product-id="${item.id}" data-action="increase">+</button>
                        <button class="remove-btn" data-product-id="${item.id}">×</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners for cart controls
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.productId;
                const action = this.dataset.action;
                const change = action === 'increase' ? 1 : -1;
                updateQuantity(productId, change);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.productId;
                removeFromCart(productId);
            });
        });
    }

 function toggleCart() {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');
        
        sidebar.classList.toggle('open');
        overlay.classList.toggle('visible');
    }


    function closeCart() {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');
        
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
        
        // Mostrar el floating cart nuevamente cuando se cierre el sidebar
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCount > 0) {
            document.getElementById('floating-cart').classList.remove('hidden');
        }
    }

    function filterProducts() {
        const checkboxes = document.querySelectorAll('.filter-checkboxes input[type="checkbox"]');
        const activeFilters = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                activeFilters.push(checkbox.dataset.filter);
            }
        });

        if (activeFilters.includes('all') || activeFilters.length === 0) {
            renderProducts(products);
        } else {
            const filtered = products.filter(product => {
                return activeFilters.some(filter => {
                    if (filter === 'destacado') return product.featured;
                    return product.category === filter;
                });
            });
            renderProducts(filtered);
        }
    }

    function updateLanguage() {
        document.querySelectorAll('[data-text]').forEach(element => {
            const key = element.dataset.text;
            if (traduccion[currentLang][key]) {
                element.textContent = traduccion[currentLang][key];
            }
        });

        document.querySelectorAll('[data-text-buy]').forEach(element => {
            element.textContent = traduccion[currentLang].COMPRAR;
        });

        document.querySelector('.header h2').textContent = traduccion[currentLang].TIENDA;
        document.getElementById('lang-toggle').textContent = currentLang.toUpperCase();
        
        // Update floating cart button text
        const floatCheckoutBtn = document.getElementById('float-checkout-btn');
        if (floatCheckoutBtn) {
            floatCheckoutBtn.textContent = traduccion[currentLang].VIEW_CART;
        }
        
        renderCartItems();
    }

    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        document.getElementById('theme-toggle').textContent = currentTheme === 'light' ? '⏾' : '☀︎';
    }

    function toggleLanguage() {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        updateLanguage();
    }

    // Event listeners
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);

    document.querySelectorAll('.filter-checkboxes input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    document.getElementById('cart-close').addEventListener('click', closeCart);
    document.getElementById('cart-overlay').addEventListener('click', closeCart);
    

     // Floating cart event listeners
    document.getElementById('float-checkout-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        // Ocultar el floating cart cuando se abre el sidebar
        document.getElementById('floating-cart').classList.add('hidden');
        toggleCart();
    });
    document.getElementById('float-clear-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        clearCart();
    });

    document.getElementById('checkout-btn').addEventListener('click', function() {
        openCheckoutWindow();
    });

    function openCheckoutWindow() {
        // Save cart data to localStorage
        localStorage.setItem('isolationCart', JSON.stringify(cart));
        
        // Open checkout in new window
        const checkoutWindow = window.open(
            'checkout.html',
            'checkout',
            'width=800,height=800,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no'
        );
        
        // Focus the new window
        if (checkoutWindow) {
            checkoutWindow.focus();
        }
    }

    // Initialize
    renderProducts();
    updateLanguage();
    updateCartUI();
});