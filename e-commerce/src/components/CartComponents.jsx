import React from 'react';
import { Button, EmptyState } from './UI';

// Quantity Button Component
export const QuantityButton = ({ onClick, children, className = "qty-btn" }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

// Summary Row Component
export const SummaryRow = ({ label, value, bold = false }) => (
  <div className={`d-flex justify-content-between mb-3 ${bold ? 'fw-bold' : ''}`}>
    <span>{label}:</span>
    <span>${value.toFixed(2)}</span>
  </div>
);

// Cart Item Component
export const CartItem = ({ item, updateQuantity, removeFromCart }) => (
  <div className="cart-item">
    <img src={item.image} alt={item.name} className="item-image" />
    <div className="item-details">
      <div className="item-name">{item.name}</div>
      <div className="item-price">${item.price.toFixed(2)}</div>
      <div className="quantity-controls">
        <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
          -
        </QuantityButton>
        <span className="mx-2">{item.quantity}</span>
        <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          +
        </QuantityButton>
      </div>
    </div>
    <div className="text-end">
      <div className="fw-bold">${(item.price * item.quantity).toFixed(2)}</div>
      <QuantityButton 
        className="btn btn-sm btn-outline-danger mt-2" 
        onClick={() => removeFromCart(item.id)}
      >
        <i className="fas fa-trash"></i>
      </QuantityButton>
    </div>
  </div>
);

// Cart Summary Component
export const CartSummary = ({ subtotal, shipping, total, onCheckout }) => (
  <div className="cart-summary">
    <h4 className="mb-4">Order Summary</h4>
    
    <SummaryRow label="Subtotal" value={subtotal} />
    <SummaryRow label="Shipping" value={shipping} />
    <SummaryRow label="Total" value={total} bold />
    
    <Button className="checkout-btn w-100" onClick={onCheckout}>
      <i className="fas fa-lock me-2"></i>
      Proceed to Checkout
    </Button>
    
    <div className="text-center mt-3">
      <a href="/shop" className="text-decoration-none">
        <i className="fas fa-arrow-left me-2"></i>Continue Shopping
      </a>
    </div>
  </div>
);

// Empty Cart Component
export const EmptyCart = () => (
  <EmptyState 
    icon="shopping-cart"
    title="Your cart is empty"
    message="Add some products to get started"
    actionButton={
      <a href="/shop" className="btn btn-primary">Start Shopping</a>
    }
  />
);