import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ApiService from '../services/ApiService';
import OrderTracking from '../components/OrderTracking';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchOrders();
    }
  }, [isAuthenticated, token]);

  const fetchOrders = async () => {
    try {
      const response = await ApiService.getUserOrders(token);
      setOrders(response);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mt-5 pt-5">
        <div className="text-center">
          <h3>Please login to view your orders</h3>
          <a href="/login" className="btn btn-primary">Login</a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-5 pt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="text-center">
          <h4>No orders found</h4>
          <p>You haven't placed any orders yet.</p>
          <a href="/shop" className="btn btn-primary">Start Shopping</a>
        </div>
      ) : (
        <div className="row">
          {orders.map(order => (
            <div key={order._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Order #{order._id.slice(-6)}</h5>
                  <p className="card-text">
                    <strong>Total: ${order.totalAmount.toFixed(2)}</strong><br/>
                    Status: <span className="badge bg-warning">{order.orderStatus}</span><br/>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-3">
                    <h6>Items:</h6>
                    {order.products.map((product, index) => (
                      <div key={index} className="small">
                        {product.name} x {product.quantity} - ${(product.price * product.quantity).toFixed(2)}
                      </div>
                    ))}
                  </div>
                  <OrderTracking order={order} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;