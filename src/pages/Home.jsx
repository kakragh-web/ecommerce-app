import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const clothesProducts = [
    {
      id: 5,
      name: "Premium T-Shirt",
      price: 49.99,
      image: "/assets/imgs/clothe1.JPG",
    },
    {
      id: 6,
      name: "Slim Fit Shirt",
      price: 79.99,
      image: "/assets/imgs/clothe2.JPG",
    },
    {
      id: 7,
      name: "Winter Coat",
      price: 159.99,
      image: "/assets/imgs/clothe3.JPG",
    },
    {
      id: 8,
      name: "Casual Shirt",
      price: 39.99,
      image: "/assets/imgs/cloths4.JPG",
    },
  ];

  const shoesProducts = [
    {
      id: 9,
      name: "Premium Sneakers",
      price: 129.99,
      image: "/assets/imgs/shoe1.JPG",
    },
    {
      id: 10,
      name: "Running Shoes",
      price: 149.99,
      image: "/assets/imgs/shoe2.JPG",
    },
    {
      id: 11,
      name: "Casual Shoes",
      price: 99.99,
      image: "/assets/imgs/shoe3.JPG",
    },
    {
      id: 12,
      name: "Formal Shoes",
      price: 179.99,
      image: "/assets/imgs/shoe4.JPG",
    },
  ];

  useEffect(() => {
    // Initialize AOS if available
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
      });
    }
  }, []);

  return (
    <>
      {/* Home Section */}
      <section id="home">
        <div
          className="container"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <h5>NEW ARRIVALS</h5>
          <h1>
            <span>Best Prices</span> This Season
          </h1>
          <p>
            eValet offers the best products for the{" "}
            <span>most affordable prices</span>
          </p>
          <button
            className="text-uppercase"
            onClick={() => (window.location.href = "/shop")}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Clothes Section */}
      <section id="clothes" className="my-5">
        <div className="container text-center mt-5 py-5">
          <h3 data-aos="fade-up">Dresses & Coats</h3>
          <hr className="mx-auto" />
          <p data-aos="fade-up" data-aos-delay="100">
            Here you can check out our amazing clothe
          </p>
        </div>
        <div className="row mx-auto container-fluid">
          {clothesProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              data-aos="fade-up"
              data-aos-delay={`${(index + 1) * 100}`}
            />
          ))}
        </div>
      </section>

      {/* Shoes Section */}
      <section id="shoes" className="my-5">
        <div className="container text-center mt-5 py-5">
          <h3 data-aos="fade-up">Premium Shoes</h3>
          <hr className="mx-auto" />
          <p data-aos="fade-up" data-aos-delay="100">
            Here you can check out our amazing shoes collection
          </p>
        </div>
        <div className="row mx-auto container-fluid">
          {shoesProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              data-aos="fade-up"
              data-aos-delay={`${(index + 1) * 100}`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
