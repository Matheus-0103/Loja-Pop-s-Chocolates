// products.js
class ProductService {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('chocProducts')) || [
            {
                id: '1',
                name: 'Barra de Chocolate 70%',
                price: 12.90,
                category: 'bars',
                stock: 50,
                image: 'https://placehold.co/600x400?text=Chocolate+70%',
                description: 'Barra de chocolate amargo com 70% cacau'
            },
            {
              id: '2',
                name: 'Barra de Chocolate ao Leite',
                price: 15.90,
                category: 'bars',
                stock: 50,
                image: 'https://placehold.co/600x400?text=Chocolate+70%',
                description: 'Barra de chocolate ao leite'   
            },
            {
                id: '3',
                name: 'Trufa de Chocolate Branco',
                price: 2.50,
                category: 'truffles',
                stock: 100,
                image: 'https://placehold.co/600x400?text=Trufa+Branca',
                description: 'Deliciosa trufa de chocolate branco'
            },
            {
                id: '4',
                name: 'Caixa de Bombons Sortidos',
                price: 39.90,
                category: 'boxes',
                stock: 30,
                image: 'https://placehold.co/600x400?text=Bombons+Sortidos',
                description: 'Caixa com 12 bombons sortidos'
            },
            {
                id: '5',
                name: 'Chocolate Quente Gourmet',
                price: 8.90,
                category: 'drinks',
                stock: 20,
                image: 'https://placehold.co/600x400?text=Chocolate+Quente',
                description: 'Delicioso chocolate quente gourmet'
            }
            // Mais produtos...
        ];
    }

    getProducts(category = 'all') {
        if (category === 'all') return this.products;
        return this.products.filter(p => p.category === category);
    }

    addProduct(product) {
        const newProduct = {
            ...product,
            id: Date.now().toString()
        };
        this.products.push(newProduct);
        localStorage.setItem('chocProducts', JSON.stringify(this.products));
        return newProduct;
    }

    updateProduct(id, updates) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Produto não encontrado');
        
        this.products[index] = { ...this.products[index], ...updates };
        localStorage.setItem('chocProducts', JSON.stringify(this.products));
        return this.products[index];
    }

    deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
        localStorage.setItem('chocProducts', JSON.stringify(this.products));
    }
}

const productService = new ProductService();
