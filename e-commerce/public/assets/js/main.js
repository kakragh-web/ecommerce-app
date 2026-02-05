// Modern E-Commerce JavaScript - Main Application
class ECommerceApp {
    constructor() {
        this.cart = new ShoppingCart();
        this.products = new ProductManager();
        this.animations = new AnimationManager();
        this.stripe = null;
        this.init();
    }

    init() {
        this.initStripe();
        this.bindEvents();
        this.animations.initScrollAnimations();
        this.loadCartFromStorage();
        this.updateCartUI();
    }

    initStripe() {
        // Initialize Stripe (replace with your publishable key)
        if (typeof Stripe !== 'undefined') {
            this.stripe = Stripe('pk_test_your_stripe_publishable_key_here');
        }
    }

    bindEvents() {
        // Product interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('buy-btn')) {
                this.handleAddToCart(e);
            }
            if (e.target.classList.contains('remove-btn')) {
                this.handleRemoveFromCart(e);
            }
            if (e.target.classList.contains('checkout-btn')) {
                this.handleCheckout(e);
            }
        });

        // Search functionality
        const searchInput = document.querySelector('#search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.products.filterProducts(e.target.value);
            });
        }

        // Quantity updates
        document.addEventListener('change', (e) => {
            if (e.target.type === 'number' && e.target.closest('.cart')) {
                this.handleQuantityChange(e);
            }
        });
    }

    handleAddToCart(e) {
        e.preventDefault();
        const productElement = e.target.closest('.product');
        const product = this.extractProductData(productElement);
        
        this.cart.addItem(product);
        this.showNotification('Product added to cart!', 'success');
        this.animations.addToCartAnimation(e.target);
        this.updateCartUI();
    }

    handleRemoveFromCart(e) {
        e.preventDefault();
        const productId = e.target.dataset.productId;
        this.cart.removeItem(productId);
        this.showNotification('Product removed from cart', 'info');
        this.updateCartUI();
        e.target.closest('tr').remove();
    }

    handleQuantityChange(e) {
        const productId = e.target.dataset.productId;
        const quantity = parseInt(e.target.value);
        this.cart.updateQuantity(productId, quantity);
        this.updateCartUI();
    }

    async handleCheckout(e) {
        e.preventDefault();
        if (this.cart.items.length === 0) {
            this.showNotification('Your cart is empty!', 'warning');
            return;
        }

        this.showLoader();
        
        try {
            if (this.stripe) {
                await this.processStripePayment();
            } else {
                // Fallback to regular checkout
                window.location.href = 'checkout.html';
            }
        } catch (error) {
            this.showNotification('Payment failed. Please try again.', 'error');
            console.error('Checkout error:', error);
        } finally {
            this.hideLoader();
        }
    }

    async processStripePayment() {
        const { error } = await this.stripe.redirectToCheckout({
            lineItems: this.cart.items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.image]
                    },
                    unit_amount: Math.round(item.price * 100)
                },
                quantity: item.quantity
            })),
            mode: 'payment',
            successUrl: window.location.origin + '/success.html',
            cancelUrl: window.location.origin + '/cart.html'
        });

        if (error) {
            throw error;
        }
    }

    extractProductData(element) {
        return {
            id: Date.now() + Math.random(),
            name: element.querySelector('.p-name')?.textContent || 'Product',
            price: parseFloat(element.querySelector('.p-price')?.textContent.replace('$', '') || '0'),
            image: element.querySelector('img')?.src || '',
            quantity: 1
        };
    }

    loadCartFromStorage() {
        const savedCart = localStorage.getItem('ecommerce_cart');
        if (savedCart) {
            this.cart.items = JSON.parse(savedCart);
        }
    }

    updateCartUI() {
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.cart.getTotalItems();
        }

        // Update cart total
        const cartTotal = document.querySelector('.cart-total-amount');
        if (cartTotal) {
            cartTotal.textContent = `$${this.cart.getTotal().toFixed(2)}`;
        }

        // Save to localStorage
        localStorage.setItem('ecommerce_cart', JSON.stringify(this.cart.items));
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    showLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-spinner">
                <div class="spinner"></div>
                <p>Processing...</p>
            </div>
        `;
        document.body.appendChild(loader);
    }

    hideLoader() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.remove();
        }
    }
}

// Shopping Cart Class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id != productId);
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id == productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeItem(productId);
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    clear() {
        this.items = [];
    }
}

// Product Manager Class
class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.loadProducts();
    }

    loadProducts() {
        // In a real app, this would fetch from an API
        const productElements = document.querySelectorAll('.product');
        this.products = Array.from(productElements).map(element => ({
            id: Date.now() + Math.random(),
            name: element.querySelector('.p-name')?.textContent || '',
            price: parseFloat(element.querySelector('.p-price')?.textContent.replace('$', '') || '0'),
            image: element.querySelector('img')?.src || '',
            element: element
        }));
        this.filteredProducts = [...this.products];
    }

    filterProducts(searchTerm) {
        const term = searchTerm.toLowerCase();
        this.filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(term)
        );
        this.displayFilteredProducts();
    }

    displayFilteredProducts() {
        this.products.forEach(product => {
            const isVisible = this.filteredProducts.includes(product);
            product.element.style.display = isVisible ? 'block' : 'none';
        });
    }
}

// Animation Manager Class
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
    }

    initScrollAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);

        // Observe elements
        document.querySelectorAll('.product, .section-title, .banner-content').forEach(el => {
            observer.observe(el);
        });
    }

    addToCartAnimation(button) {
        button.classList.add('btn-success');
        button.textContent = 'Added!';
        
        setTimeout(() => {
            button.classList.remove('btn-success');
            button.textContent = 'Buy Now';
        }, 1000);
    }

    pulseElement(element) {
        element.classList.add('pulse');
        setTimeout(() => {
            element.classList.remove('pulse');
        }, 600);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ecommerceApp = new ECommerceApp();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ECommerceApp, ShoppingCart, ProductManager, AnimationManager };
}