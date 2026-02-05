// E-Commerce API Service
class ECommerceAPI {
    constructor() {
        this.baseURL = 'https://fakestoreapi.com';
        this.products = [];
        this.categories = [];
    }

    // Fetch all products
    async fetchProducts() {
        try {
            const response = await fetch(`${this.baseURL}/products`);
            const products = await response.json();
            
            // Transform API data to match our format
            this.products = products.map(product => ({
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                rating: product.rating,
                stock: Math.floor(Math.random() * 50) + 10, // Random stock
                featured: Math.random() > 0.7 // Random featured status
            }));
            
            return this.products;
        } catch (error) {
            console.error('Error fetching products:', error);
            return this.getFallbackProducts();
        }
    }

    // Fetch products by category
    async fetchProductsByCategory(category) {
        try {
            const response = await fetch(`${this.baseURL}/products/category/${category}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching products by category:', error);
            return [];
        }
    }

    // Fetch all categories
    async fetchCategories() {
        try {
            const response = await fetch(`${this.baseURL}/products/categories`);
            this.categories = await response.json();
            return this.categories;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];
        }
    }

    // Fetch single product
    async fetchProduct(id) {
        try {
            const response = await fetch(`${this.baseURL}/products/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    }

    // Search products
    searchProducts(query) {
        return this.products.filter(product => 
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Filter products by price range
    filterByPrice(minPrice, maxPrice) {
        return this.products.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );
    }

    // Get featured products
    getFeaturedProducts() {
        return this.products.filter(product => product.featured);
    }

    // Fallback products if API fails
    getFallbackProducts() {
        return [
            {
                id: 1,
                title: "Premium Cotton T-Shirt",
                price: 29.99,
                description: "High-quality cotton t-shirt with modern fit",
                category: "men's clothing",
                image: "assets/imgs/clothe1.JPG",
                rating: { rate: 4.5, count: 120 },
                stock: 25,
                featured: true
            },
            {
                id: 2,
                title: "Running Sneakers",
                price: 89.99,
                description: "Comfortable running shoes for daily exercise",
                category: "shoes",
                image: "assets/imgs/shoe1.JPG",
                rating: { rate: 4.2, count: 89 },
                stock: 15,
                featured: true
            },
            {
                id: 3,
                title: "Smart Watch Pro",
                price: 199.99,
                description: "Advanced smartwatch with health monitoring",
                category: "electronics",
                image: "assets/imgs/watch1.JPG",
                rating: { rate: 4.8, count: 203 },
                stock: 8,
                featured: false
            }
        ];
    }
}

// Payment Processing Service
class PaymentService {
    constructor() {
        this.stripe = null;
        this.paypalClientId = 'your-paypal-client-id';
        this.initializeStripe();
    }

    // Initialize Stripe
    async initializeStripe() {
        if (typeof Stripe !== 'undefined') {
            this.stripe = Stripe('pk_test_your_stripe_publishable_key_here');
        }
    }

    // Process Stripe payment
    async processStripePayment(amount, currency = 'usd') {
        if (!this.stripe) {
            throw new Error('Stripe not initialized');
        }

        try {
            // Create payment intent on your backend
            const response = await fetch('/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount * 100, // Convert to cents
                    currency: currency
                })
            });

            const { client_secret } = await response.json();

            // Confirm payment
            const result = await this.stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: this.stripe.elements().create('card'),
                    billing_details: {
                        name: 'Customer Name',
                    },
                }
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            return result.paymentIntent;
        } catch (error) {
            console.error('Stripe payment error:', error);
            throw error;
        }
    }

    // Process PayPal payment
    async processPayPalPayment(amount, currency = 'USD') {
        return new Promise((resolve, reject) => {
            if (typeof paypal === 'undefined') {
                reject(new Error('PayPal SDK not loaded'));
                return;
            }

            paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amount.toString(),
                                currency_code: currency
                            }
                        }]
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then(details => {
                        resolve(details);
                    });
                },
                onError: (err) => {
                    reject(err);
                }
            }).render('#paypal-button-container');
        });
    }

    // Simulate Cash on Delivery
    processCODPayment(orderDetails) {
        return {
            success: true,
            paymentMethod: 'cod',
            orderId: 'COD_' + Date.now(),
            message: 'Cash on Delivery order placed successfully'
        };
    }
}

// Order Management Service
class OrderService {
    constructor() {
        this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
    }

    // Create new order
    createOrder(orderData) {
        const order = {
            id: 'ORD_' + Date.now(),
            customerId: orderData.customerId,
            customerInfo: orderData.customerInfo,
            items: orderData.items,
            subtotal: orderData.subtotal,
            tax: orderData.tax,
            shipping: orderData.shipping,
            total: orderData.total,
            paymentMethod: orderData.paymentMethod,
            paymentStatus: orderData.paymentStatus || 'pending',
            orderStatus: 'processing',
            deliveryAddress: orderData.deliveryAddress,
            estimatedDelivery: this.calculateDeliveryDate(orderData.deliveryZone),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.orders.push(order);
        this.saveOrders();
        return order;
    }

    // Update order status
    updateOrderStatus(orderId, status) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.orderStatus = status;
            order.updatedAt = new Date().toISOString();
            this.saveOrders();
            return order;
        }
        return null;
    }

    // Get orders by customer
    getOrdersByCustomer(customerId) {
        return this.orders.filter(order => order.customerId === customerId);
    }

    // Get all orders (admin)
    getAllOrders() {
        return this.orders;
    }

    // Calculate delivery date
    calculateDeliveryDate(zone) {
        const deliveryTimes = {
            'city-center': 2,
            'suburbs': 4,
            'rural': 24
        };
        
        const hours = deliveryTimes[zone] || 24;
        const deliveryDate = new Date();
        deliveryDate.setHours(deliveryDate.getHours() + hours);
        return deliveryDate.toISOString();
    }

    // Save orders to localStorage
    saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }
}

// Delivery Service
class DeliveryService {
    constructor() {
        this.zones = JSON.parse(localStorage.getItem('deliveryZones') || JSON.stringify([
            { id: 'city-center', name: 'City Center', fee: 5.00, time: 2 },
            { id: 'suburbs', name: 'Suburbs', fee: 8.00, time: 4 },
            { id: 'rural', name: 'Rural Areas', fee: 15.00, time: 24 }
        ]));
    }

    // Get delivery zones
    getDeliveryZones() {
        return this.zones;
    }

    // Calculate delivery fee
    calculateDeliveryFee(zoneId) {
        const zone = this.zones.find(z => z.id === zoneId);
        return zone ? zone.fee : 10.00; // Default fee
    }

    // Get delivery time
    getDeliveryTime(zoneId) {
        const zone = this.zones.find(z => z.id === zoneId);
        return zone ? zone.time : 24; // Default time
    }

    // Add delivery zone (admin)
    addDeliveryZone(zoneData) {
        const zone = {
            id: zoneData.name.toLowerCase().replace(/\s+/g, '-'),
            ...zoneData
        };
        this.zones.push(zone);
        this.saveZones();
        return zone;
    }

    // Update delivery zone
    updateDeliveryZone(zoneId, updates) {
        const zoneIndex = this.zones.findIndex(z => z.id === zoneId);
        if (zoneIndex !== -1) {
            this.zones[zoneIndex] = { ...this.zones[zoneIndex], ...updates };
            this.saveZones();
            return this.zones[zoneIndex];
        }
        return null;
    }

    // Save zones to localStorage
    saveZones() {
        localStorage.setItem('deliveryZones', JSON.stringify(this.zones));
    }
}

// Analytics Service
class AnalyticsService {
    constructor() {
        this.events = JSON.parse(localStorage.getItem('analytics') || '[]');
    }

    // Track event
    trackEvent(eventType, data) {
        const event = {
            id: Date.now(),
            type: eventType,
            data: data,
            timestamp: new Date().toISOString(),
            userId: localStorage.getItem('userEmail') || 'anonymous'
        };
        
        this.events.push(event);
        this.saveEvents();
    }

    // Get sales analytics
    getSalesAnalytics(period = 30) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - period);
        
        const salesEvents = this.events.filter(event => 
            event.type === 'purchase' && 
            new Date(event.timestamp) > cutoffDate
        );

        return {
            totalSales: salesEvents.length,
            totalRevenue: salesEvents.reduce((sum, event) => sum + (event.data.amount || 0), 0),
            averageOrderValue: salesEvents.length > 0 ? 
                salesEvents.reduce((sum, event) => sum + (event.data.amount || 0), 0) / salesEvents.length : 0
        };
    }

    // Get popular products
    getPopularProducts() {
        const productViews = {};
        const viewEvents = this.events.filter(event => event.type === 'product_view');
        
        viewEvents.forEach(event => {
            const productId = event.data.productId;
            productViews[productId] = (productViews[productId] || 0) + 1;
        });

        return Object.entries(productViews)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([productId, views]) => ({ productId, views }));
    }

    // Save events to localStorage
    saveEvents() {
        localStorage.setItem('analytics', JSON.stringify(this.events));
    }
}

// Initialize services
const ecommerceAPI = new ECommerceAPI();
const paymentService = new PaymentService();
const orderService = new OrderService();
const deliveryService = new DeliveryService();
const analyticsService = new AnalyticsService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ECommerceAPI,
        PaymentService,
        OrderService,
        DeliveryService,
        AnalyticsService
    };
}