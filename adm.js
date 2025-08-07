// admin.js
class AdminService {
    constructor() {
        this.orders = JSON.parse(localStorage.getItem('chocOrders')) || [];
    }

    getOrders() {
        return this.orders;
    }

    createOrder(cartItems, user, shippingInfo) {
        const newOrder = {
            id: Date.now().toString(),
            userId: user.id,
            userName: user.name,
            items: cartItems,
            total: cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
            shipping: shippingInfo,
            date: new Date().toISOString(),
            status: 'pending'
        };
        
        this.orders.push(newOrder);
        localStorage.setItem('chocOrders', JSON.stringify(this.orders));
        return newOrder;
    }
}

const adminService = new AdminService();
