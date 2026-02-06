// Stripe Payment Integration
class StripePaymentProcessor {
    constructor(publishableKey) {
        this.stripe = Stripe(publishableKey);
        this.elements = null;
        this.card = null;
        this.clientSecret = null;
    }

    async initializePaymentForm(containerId) {
        // Create payment form elements
        this.elements = this.stripe.elements();
        
        const style = {
            base: {
                color: '#424770',
                fontFamily: 'Poppins, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#9e2146',
                iconColor: '#9e2146'
            }
        };

        this.card = this.elements.create('card', { style });
        this.card.mount(containerId);

        // Handle real-time validation errors from the card Element
        this.card.on('change', ({ error }) => {
            const displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
            } else {
                displayError.textContent = '';
            }
        });
    }

    async createPaymentIntent(amount, currency = 'usd') {
        try {
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
            this.clientSecret = client_secret;
            return client_secret;
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw error;
        }
    }

    async processPayment(billingDetails) {
        if (!this.clientSecret) {
            throw new Error('Payment intent not created');
        }

        const { error, paymentIntent } = await this.stripe.confirmCardPayment(
            this.clientSecret,
            {
                payment_method: {
                    card: this.card,
                    billing_details: billingDetails
                }
            }
        );

        if (error) {
            throw error;
        }

        return paymentIntent;
    }

    // Quick checkout with Stripe Checkout (easier implementation)
    async redirectToCheckout(lineItems, customerEmail = null) {
        const sessionData = {
            line_items: lineItems,
            mode: 'payment',
            success_url: `${window.location.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${window.location.origin}/cart.html`,
            automatic_tax: { enabled: true },
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI']
            }
        };

        if (customerEmail) {
            sessionData.customer_email = customerEmail;
        }

        const { error } = await this.stripe.redirectToCheckout(sessionData);
        
        if (error) {
            throw error;
        }
    }
}

// Checkout Form Handler
class CheckoutFormHandler {
    constructor(stripeProcessor) {
        this.stripe = stripeProcessor;
        this.form = document.getElementById('checkout-form');
        this.submitButton = document.getElementById('submit-payment');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        this.setLoading(true);

        const formData = new FormData(this.form);
        const billingDetails = {
            name: formData.get('name'),
            email: formData.get('email'),
            address: {
                line1: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                postal_code: formData.get('zip'),
                country: formData.get('country') || 'US'
            }
        };

        try {
            const paymentIntent = await this.stripe.processPayment(billingDetails);
            
            if (paymentIntent.status === 'succeeded') {
                // Payment successful
                this.showSuccess('Payment successful! Redirecting...');
                
                // Clear cart
                localStorage.removeItem('ecommerce_cart');
                
                // Redirect to success page
                setTimeout(() => {
                    window.location.href = '/success.html';
                }, 2000);
            }
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(isLoading) {
        if (this.submitButton) {
            this.submitButton.disabled = isLoading;
            this.submitButton.textContent = isLoading ? 'Processing...' : 'Pay Now';
        }
    }

    showError(message) {
        const errorElement = document.getElementById('payment-errors');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    showSuccess(message) {
        const successElement = document.getElementById('payment-success');
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
        }
    }
}

// Quick Checkout Implementation (Recommended for simplicity)
class QuickCheckout {
    constructor(publishableKey) {
        this.stripe = Stripe(publishableKey);
    }

    async checkout(cartItems, customerInfo = {}) {
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: item.image ? [item.image] : []
                },
                unit_amount: Math.round(item.price * 100) // Convert to cents
            },
            quantity: item.quantity
        }));

        try {
            const { error } = await this.stripe.redirectToCheckout({
                line_items: lineItems,
                mode: 'payment',
                success_url: `${window.location.origin}/success.html`,
                cancel_url: `${window.location.origin}/cart.html`,
                customer_email: customerInfo.email,
                billing_address_collection: 'required',
                shipping_address_collection: {
                    allowed_countries: ['US', 'CA', 'GB', 'AU']
                }
            });

            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Checkout error:', error);
            throw error;
        }
    }
}

// Initialize Stripe when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Replace with your actual Stripe publishable key
    const STRIPE_PUBLISHABLE_KEY = 'pk_test_your_stripe_publishable_key_here';
    
    // Initialize quick checkout (recommended)
    window.quickCheckout = new QuickCheckout(STRIPE_PUBLISHABLE_KEY);
    
    // Or initialize full payment processor for custom forms
    // window.stripeProcessor = new StripePaymentProcessor(STRIPE_PUBLISHABLE_KEY);
    // window.checkoutHandler = new CheckoutFormHandler(window.stripeProcessor);
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StripePaymentProcessor, CheckoutFormHandler, QuickCheckout };
}