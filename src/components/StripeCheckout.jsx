import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useAuth } from '../context/AuthContext';
import ApiService from '../services/ApiService';
import config from '../config/config.js';

const stripePromise = loadStripe(config.STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ total, cart, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { token } = useAuth();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      // Create payment intent
      const { clientSecret } = await fetch(`${config.API_BASE_URL}/payments/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: total })
      }).then(res => res.json());

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        onError(result.error.message);
      } else {
        // Payment successful, create order
        const orderData = {
          products: cart.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          totalAmount: total,
          paymentStatus: 'completed',
          paymentIntentId: result.paymentIntent.id
        };

        const order = await ApiService.createOrder(orderData, token);
        onSuccess(order);
      }
    } catch (error) {
      onError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="card p-4">
        <h5>Payment Details</h5>
        <div className="mb-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="btn btn-primary w-100"
        >
          {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

const StripeCheckout = ({ total, cart, onSuccess, onError }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        total={total}
        cart={cart}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
};

export default StripeCheckout;