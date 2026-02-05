import React from "react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const products = [
    { id: 101, name: 'Sports Shoes', price: 199.90, image: 'assets/imgs/Feature1.JPG' },
    { id: 102, name: 'Smart Watch', price: 299.90, image: 'assets/imgs/Feature2.JPG' },
    { id: 103, name: 'Mountain Bike', price: 599.90, image: 'assets/imgs/Feature3.JPG' },
    { id: 104, name: 'Sports Bag', price: 89.90, image: 'assets/imgs/Feature4.jpg' },
    { id: 105, name: 'Sports Wear', price: 199.90, image: 'assets/imgs/clothe1.JPG' },
    { id: 106, name: 'Mens Wear', price: 199.90, image: 'assets/imgs/clothe2.JPG' },
    { id: 107, name: 'Casual Wear', price: 199.90, image: 'assets/imgs/clothe3.JPG' },
    { id: 108, name: 'Grocery Bag', price: 89.90, image: 'assets/imgs/cloths4.JPG' },
    { id: 109, name: 'Running Shoes', price: 179.90, image: 'assets/imgs/shoe1.JPG' },
    { id: 110, name: 'Sneakers', price: 159.90, image: 'assets/imgs/shoe2.JPG' },
    { id: 111, name: 'Simple Shoe', price: 129.90, image: 'assets/imgs/shoe3.JPG' },
    { id: 112, name: 'Executive Bag', price: 249.90, image: 'assets/imgs/shoe4.JPG' },
    { id: 113, name: 'Winter Coat', price: 299.90, image: 'assets/imgs/Feature5.JPG' },
    { id: 114, name: 'Winter Jacket', price: 279.90, image: 'assets/imgs/Feature6.JPG' },
    { id: 115, name: 'Winter Hoodie', price: 199.90, image: 'assets/imgs/Feature7.JPG' },
    { id: 116, name: 'Winter Sweater', price: 179.90, image: 'assets/imgs/Feature8.JPG' }
  ];

  return (
    <div style={{ paddingTop: "100px" }}>
      <section id="featured" className="my-5 py-5">
        <div className="container mt-5 py-5">
          <h3>Our Products</h3>
          <hr />
          <p>Here you can check out our products</p>
        </div>
        <div className="row mx-auto container">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination mt-5">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default Shop;