import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../hooks/useAdmin';

const Navbar = () => {
  const { items } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { isAdmin } = useAdmin();
  const cartCount = items?.reduce((total, item) => total + item.quantity, 0) || 0;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 fixed-top">
      <div className="container">
        <img className="logo" src="/assets/imgs/logo.jpg" alt="Logo" />
        <h2 className="brand">eValet</h2>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse nav-buttons ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shop">Shop</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/blog">Blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact Us</a>
            </li>
            {isAdmin && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  Admin
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/admin/products">Manage Products</a></li>
                  <li><a className="dropdown-item" href="/admin/orders">Manage Orders</a></li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <a href="/cart" className="position-relative">
                <i className="fas fa-shopping-bag"></i>
                <span className="cart-count">{cartCount}</span>
              </a>
              {isAuthenticated ? (
                <div className="dropdown d-inline">
                  <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                    <i className="fas fa-user"></i> {user?.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/profile">My Profile</a></li>
                    <li><a className="dropdown-item" href="/orders">My Orders</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <a href="/login"><i className="fas fa-user"></i></a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;