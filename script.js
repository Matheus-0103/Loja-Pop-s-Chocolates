// Products data
const products = [
    {
        id: 1,
        name: "Trufas Belgas",
        description: "Trufas de chocolate belga com recheio cremoso de baunilha e cobertura de cacau 70%.",
        price: 19.90,
        category: "Trufas",
        image: "https://placehold.co/400x300",
        alt: "Trufas de chocolate belga arranjadas em uma caixa de presente marrom escuro"
    },
    {
        id: 2,
        name: "Barra de Chocolate Artesanal",
        description: "Barra de chocolate 85% cacau com flocos de sal rosa do Himalaia e amêndoas caramelizadas.",
        price: 24.90,
        category: "Barras",
        image: "https://placehold.co/400x300",
        alt: "Barra de chocolate artesanal em uma tábua de madeira com ingredientes visíveis"
    },
    {
        id: 3,
        name: "Bombons Gourmet",
        description: "Coleção de 12 bombons com recheios variados: frutas vermelhas, caramelo salgado e café.",
        price: 39.90,
        category: "Bombons",
        image: "https://placehold.co/400x300",
        alt: "Bombons gourmet em uma bandeja de vidro com decoração elegante"
    },
    {
        id: 4,
        name: "Chocolate Vegano",
        description: "Chocolate amargo 65% cacau vegano, feito com leite de amêndoas e sem lactose.",
        price: 22.50,
        category: "Barras",
        image: "https://placehold.co/400x300",
        alt: "Barra de chocolate vegano com embalagem sustentável"
    },
    {
        id: 5,
        name: "Ovos de Páscoa Premium",
        description: "Ovos de Páscoa recheados com brigadeiro de chocolate branco e gotas de framboesa.",
        price: 59.90,
        category: "Especiais",
        image: "https://placehold.co/400x300",
        alt: "Ovos de Páscoa premium em uma cesta com decoração festiva"
    },
    {
        id: 6,
        name: "Tablete de Chocolate com Castanhas",
        description: "Tablete de chocolate ao leite com castanhas do Pará e pedaços de coco caramelizado.",
        price: 27.90,
        category: "Barras",
        image: "https://placehold.co/400x300",
        alt: "Tablete de chocolate com castanhas em close-up mostrando a textura"
    }
];

// Shopping cart
let cart = [];

// DOM elements
const productsContainer = document.getElementById('products-container');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartShipping = document.getElementById('cart-shipping');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartToggle = document.getElementById('cart-toggle');
const cartClose = document.getElementById('cart-close');
const checkoutBtn = document.getElementById('checkout-btn');

// Display products
function displayProducts() {
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'chocolate-card bg-white rounded-lg overflow-hidden shadow-md';
        productCard.innerHTML = `
            <div class="h-48 overflow-hidden">
                <img src="${product.image}" alt="${product.alt}" class="w-full h-full object-cover" />
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold text-gray-800">${product.name}</h3>
                    <span class="bg-[#8D6E63] text-white text-xs px-2 py-1 rounded-full">${product.category}</span>
                </div>
                <p class="text-gray-600 mb-4">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold text-[#5D4037]">R$ ${product.price.toFixed(2)}</span>
                    <button class="add-to-cart bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition duration-300" data-id="${product.id}">
                        Adicionar
                    </button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });

    // Add event listeners to "Add to cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCart();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Seu carrinho está vazio</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item flex justify-between items-center border-b pb-4';
            cartItem.innerHTML = `
                <div>
                    <h4 class="font-bold">${item.name}</h4>
                    <p class="text-sm text-gray-600">R$ ${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center">
                    <span class="mx-4">${item.quantity}x</span>
                    <button class="remove-from-cart text-red-500 hover:text-red-700" data-id="${item.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('button').getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }

    // Update cart totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + shipping;

    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    cartShipping.textContent = subtotal > 100 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`;
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
}

// Initialize the app
function init() {
    displayProducts();

    // Toggle cart modal
    cartToggle.addEventListener('click', () => {
        cartModal.classList.toggle('hidden');
    });

    cartClose.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        alert('Compra finalizada com sucesso! Obrigado por sua compra.');
        cart = [];
        updateCart();
        cartModal.classList.add('hidden');
    });
}

// Start the app
init();
