import React, { useState, useEffect } from "react";
import "./Cart.css";
import { PageContainer } from "../components/UI";
import { CartItem, CartSummary, EmptyCart } from "../components/CartComponents";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { isAuthenticated, token } = useAuth();
  const { items: cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const getCartTotal = () => {
    if (!cart || !Array.isArray(cart)) return 0;
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = getCartTotal();
  const shipping = cart && cart.length > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  const handleProceedToCheckout = () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!isAuthenticated) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  if (!cart || cart.length === 0) {
    return (
      <PageContainer>
        <div className="cart-container mt-5 pt-5">
          <EmptyCart />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="cart-container mt-5 pt-5">
        <h2 className="mb-4">Shopping Cart</h2>

        <div className="row">
          <div className="col-lg-8">
            <div>
              {cart && cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onCheckout={handleProceedToCheckout}
              isLoading={isCreatingOrder}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Cart;
