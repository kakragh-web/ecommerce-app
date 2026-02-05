import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import StripeCheckout from '../components/StripeCheckout';

const Checkout = () => {
  const { items: cart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getCartTotal = () => {
    if (!cart || !Array.isArray(cart)) return 0;
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = getCartTotal();
  const shipping = cart && cart.length > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  const handlePaymentSuccess = (order) => {
    clearCart();
    alert('Payment successful! Order placed.');
    navigate('/orders');
  };

  const handlePaymentError = (error) => {
    alert(`Payment failed: ${error}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mt-5 pt-5">
        <div className="text-center">
          <h3>Please login to checkout</h3>
          <a href="/login" className="btn btn-primary">Login</a>
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="container mt-5 pt-5">
        <div className="text-center">
          <h3>Your cart is empty</h3>
          <a href="/shop" className="btn btn-primary">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">Checkout</h2>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5>Order Summary</h5>
              {cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <StripeCheckout
            total={total}
            cart={cart}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;