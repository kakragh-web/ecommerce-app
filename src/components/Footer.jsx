import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-5 py-5">
      <div className="row container mx-auto pt-5">
        <div className="footer-one col-lg-3 col-md-6 col-sm-12">
          <img className="logo" src="/assets/imgs/logo.jpg" alt="Logo" />
          <p className="pt-3">we provide the best product for the most affordable Prices</p>
        </div>
        <div className="footer-one col-lg-3 col-sm-12">
          <h5 className="pb-2">Featured</h5>
          <ul className="text-uppercase">
            <li><a href="#">men</a></li>
            <li><a href="#">women</a></li>
            <li><a href="#">boys</a></li>
            <li><a href="#">girls</a></li>
            <li><a href="#">new arrival</a></li>
            <li><a href="#">clothes</a></li>
          </ul>
        </div>
        <div className="footer-one col-lg-3 col-sm-12">
          <h5 className="pb-2">Contact Us</h5>
          <div>
            <h6 className="text-uppercase">Phone</h6>
            <p>1234 East Rand, Germiston</p>
          </div>
          <div>
            <h6 className="text-uppercase">Address</h6>
            <p>123 456 7890</p>
          </div>
          <div>
            <h6 className="text-uppercase">Email</h6>
            <p>info@email.com</p>
          </div>
        </div>
        <div className="footer-one col-lg-3 col-sm-12">
          <h5 className="pd-2">Instagram</h5>
          <div className="row">
            <img src="/assets/imgs/Feature1.JPG" className="img-fluid w-25 h-100 m-2" alt="Feature" />
            <img src="/assets/imgs/Feature2.JPG" className="img-fluid w-25 h-100 m-2" alt="Feature" />
            <img src="/assets/imgs/Feature3.JPG" className="img-fluid w-25 h-100 m-2" alt="Feature" />
            <img src="/assets/imgs/Feature4.jpg" className="img-fluid w-25 h-100 m-2" alt="Feature" />
            <img src="/assets/imgs/clothe1.JPG" className="img-fluid w-25 h-100 m-2" alt="Feature" />
          </div>
        </div>
      </div>
      <div className="copyright mt-5">
        <div className="row container mx-auto">
          <div className="col-lg-3 col-md-5 col-sm-12 md-4">
            <img src="/assets/imgs/payment.PNG" alt="Payment" />
          </div>
          <div className="col-lg-3 col-md-5 col-sm-12 md-4 text-nowrap md-2">
            <p>eCommerce @ 2025 All Right Reserve</p>
          </div>
          <div className="col-lg-3 col-md-5 col-sm-12 md-4">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;