import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    console.log('Adding to cart:', product);
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product text-center col-lg-3 col-md-4 col-sm-12" data-aos="fade-up">
      <img className="img-fluid mb-3" src={product.image} alt={product.name} />
      <div className="star">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </div>
      <h5 className="p-name">{product.name}</h5>
      <h4 className="p-price">${product.price}</h4>
      <button className="buy-btn" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;