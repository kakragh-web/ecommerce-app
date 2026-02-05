import React from 'react';

const OrderTracking = ({ order }) => {
  const getStatusSteps = () => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: 'fas fa-shopping-cart' },
      { key: 'processing', label: 'Processing', icon: 'fas fa-cog' },
      { key: 'shipped', label: 'Shipped', icon: 'fas fa-truck' },
      { key: 'delivered', label: 'Delivered', icon: 'fas fa-check-circle' }
    ];

    const currentIndex = steps.findIndex(step => step.key === order.orderStatus);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  const steps = getStatusSteps();

  return (
    <div className="order-tracking">
      <h6>Order Status: #{order._id.slice(-6)}</h6>
      <div className="tracking-steps">
        {steps.map((step, index) => (
          <div key={step.key} className="tracking-step">
            <div className={`step-icon ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}`}>
              <i className={step.icon}></i>
            </div>
            <div className="step-label">
              <small>{step.label}</small>
            </div>
            {index < steps.length - 1 && (
              <div className={`step-line ${step.completed ? 'completed' : ''}`}></div>
            )}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .tracking-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 20px 0;
          position: relative;
        }
        .tracking-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          flex: 1;
        }
        .step-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e9ecef;
          color: #6c757d;
          margin-bottom: 8px;
        }
        .step-icon.completed {
          background: #28a745;
          color: white;
        }
        .step-icon.active {
          background: #007bff;
          color: white;
        }
        .step-line {
          position: absolute;
          top: 20px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: #e9ecef;
          z-index: -1;
        }
        .step-line.completed {
          background: #28a745;
        }
        .step-label {
          text-align: center;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

export default OrderTracking;