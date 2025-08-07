// cart.js
class CartService {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('chocCart')) || [];
    }

    addToCart(productId, quantity = 1) {
        const existing = this.cart.find(item => item.productId === productId);
        
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cart.push({ productId, quantity });
        }
        
        localStorage.setItem('chocCart', JSON.stringify(this.cart));
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.productId !== productId);
        localStorage.setItem('chocCart', JSON.stringify(this.cart));
    }

    getCartItems() {
        return this.cart.map(item => {
            const product = productService.products.find(p => p.id === item.productId);
            return { ...item, product };
        }).filter(item => item.product);
    }

    calculateTotal() {
        return this.getCartItems().reduce((total, item) => 
            total + (item.product.price * item.quantity), 0);
    }

    clearCart() {
        this.cart = [];
        localStorage.setItem('chocCart', JSON.stringify(this.cart));
    }
}

const cartService = new CartService();
