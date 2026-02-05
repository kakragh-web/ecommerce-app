import React, { useState, useEffect } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { useAuth } from '../context/AuthContext';
import ApiService from '../services/ApiService';

const AdminOrders = () => {
  const { isAdmin } = useAdmin();
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchOrders();
    }
  }, [isAdmin]);

  const fetchOrders = async () => {
    try {
      const data = await ApiService.getAllOrders(token);
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await ApiService.updateOrderStatus(orderId, newStatus, token);
      alert('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning';
      case 'processing': return 'bg-info';
      case 'shipped': return 'bg-primary';
      case 'delivered': return 'bg-success';
      case 'cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  if (!isAdmin) {
    return (
      <div className="container mt-5 pt-5">
        <div className="alert alert-danger">
          <h4>Access Denied</h4>
          <p>You need admin privileges to access this page.</p>
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
      <h2 className="mb-4">Order Management</h2>
      
      <div className="card">
        <div className="card-header">
          <h5>All Orders ({orders.length})</h5>
        </div>
        <div className="card-body">
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>#{order._id.slice(-6)}</td>
                      <td>{order.userId?.name || 'Unknown'}</td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={order.orderStatus}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      <div className="row mt-4">
        {orders.map(order => (
          <div key={order._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h6>Order #{order._id.slice(-6)}</h6>
                <p className="small text-muted">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <div className="mb-2">
                  <strong>Items:</strong>
                  {order.products.map((product, index) => (
                    <div key={index} className="small">
                      {product.name} x {product.quantity} - ${(product.price * product.quantity).toFixed(2)}
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between">
                  <span><strong>Total: ${order.totalAmount.toFixed(2)}</strong></span>
                  <span className={`badge ${getStatusBadgeClass(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;