// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Inicialização da UI
    updateCartCount();
    loadProducts();
    
    // Configuração de event listeners
    setupEventListeners();
    
    // Verifica se há usuário logado
    if (authService.currentUser) {
        updateUserUI(authService.currentUser);
    }
});

function setupEventListeners() {
    // Login/Logout
    document.getElementById('loginBtn').addEventListener('click', showLoginModal);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Filtros de produtos
    document.querySelectorAll('.product-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            loadProducts(category);
        });
    });
}

// Funções restantes da UI...
function updateCartCount() {
    const cartCount = cartService.getCartItems().reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
}
function loadProducts(category = 'all') {
    const products = productService.getProducts(category);
    const productContainer = document.getElementById('productList');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>R$ ${product.price.toFixed(2)}</span>
            <button class="add-to-cart-btn" data-id="${product.id}">Adicionar ao Carrinho</button>
        `;
        productContainer.appendChild(productCard);
    });

    // Adiciona eventos aos botões de adicionar ao carrinho
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.dataset.id;
            cartService.addToCart(productId);
            updateCartCount();
        });
    });
}
function showLoginModal() {
    const loginModal = document.getElementById('loginModal  ');
    loginModal.classList.remove('hidden');
    loginModal.querySelector('input[name="email"]').value = '';
    loginModal.querySelector('input[name="password"]').value = '';
}
function handleLogout() {
    authService.logout();
    updateUserUI(null);
    updateCartCount();
    alert('Você foi desconectado com sucesso!');
}
function updateUserUI(user) {
    const userInfo = document.getElementById('userInfo');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (user) {
        userInfo.textContent = `Bem-vindo, ${user.name}`;
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        userInfo.textContent = '';
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }
}
