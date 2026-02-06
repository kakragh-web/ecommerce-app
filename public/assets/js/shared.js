// Shared JavaScript functionality across all pages

// Cart Management
class CartManager {
    static getCart() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }
    
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
    }
    
    static addToCart(id, name, price, image, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id, name, price, image, quantity });
        }
        
        this.saveCart(cart);
    }
    
    static updateCartCount() {
        const cart = this.getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }
    
    static buyNow(id, name, price, image) {
        this.addToCart(id, name, price, image);
        window.location.href = 'checkout-enhanced.html';
    }
}

// Shared Components
class SharedComponents {
    static getNavbar() {
        return `
        <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 fixed-top">
            <div class="container">
                <img class="logo" src="assets/imgs/logo.jpg"/>
                <h2 class="brand">eValet</h2>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse nav-buttons" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="shop.html">Shop</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="blog.html">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contact.html">Contact Us</a>
                        </li>
                        <li class="nav-item">
                            <a href="cart.html" class="position-relative">
                                <i class="fas fa-shopping-bag"></i>
                                <span class="cart-count">0</span>
                            </a>
                            <a href="login.html"><i class="fas fa-user"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>`;
    }
    
    static getFooter() {
        return `
        <footer class="mt-5 py-5">
            <div class="row container mx-auto pt-5">
                <div class="footer-one col-lg-3 col-md-6 col-sm-12">
                    <img class="logo" src="assets/imgs/logo.jpg">
                    <p class="pt-3">we provide the best product for the most affordable Prices</p>
                </div>
                <div class="footer-one col-lg-3 col-sm-12">
                    <h5 class="pb-2">Featured</h5>
                    <ul class="text-uppercase">
                        <li><a href="#">men</a></li>
                        <li><a href="#">women</a></li>
                        <li><a href="#">boys</a></li>
                        <li><a href="#">girls</a></li>
                        <li><a href="#">new arrival</a></li>
                        <li><a href="#">clothes</a></li>
                    </ul>
                </div>
                <div class="footer-one col-lg-3 col-sm-12">
                    <h5 class="pb-2">Contact Us</h5>
                    <div>
                        <h6 class="text-uppercase">Phone</h6>
                        <p>1234 East Rand, Germiston</p>
                    </div>
                    <div>
                        <h6 class="text-uppercase">Address</h6>
                        <p>123 456 7890</p>
                    </div>
                    <div>
                        <h6 class="text-uppercase">Email</h6>
                        <p>info@email.com</p>
                    </div>
                </div>
                <div class="footer-one col-lg-3 col-sm-12">
                    <h5 class="pd-2">Instagram</h5>
                    <div class="row">
                        <img src="assets/imgs/Feature1.JPG" class="img-fluid w-25 h-100 m-2">
                        <img src="assets/imgs/Feature2.JPG" class="img-fluid w-25 h-100 m-2">
                        <img src="assets/imgs/Feature3.JPG" class="img-fluid w-25 h-100 m-2">
                        <img src="assets/imgs/Feature4.jpg" class="img-fluid w-25 h-100 m-2">
                        <img src="assets/imgs/clothe1.JPG" class="img-fluid w-25 h-100 m-2">
                    </div>
                </div>
            </div>
            <div class="copyright mt-5">
                <div class="row container mx-auto">
                    <div class="col-lg-3 col-md-5 col-sm-12 md-4">
                        <img src="assets/imgs/payment.PNG">
                    </div>
                    <div class="col-lg-3 col-md-5 col-sm-12 md-4 text-nowrap md-2">
                        <p>eCommerce @ 2025 All Right Reserve</p>
                    </div>
                    <div class="col-lg-3 col-md-5 col-sm-12 md-4">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-tiktok"></i></a>
                    </div>
                </div>
            </div>
        </footer>`;
    }
    
    static getHeadLinks() {
        return `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/png" href="https://i0.wp.com/lamechs.com/wp-content/uploads/2025/04/cropped-lamechs-scaled-1.png?resize=600%2C162&ssl=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
        <link rel="stylesheet" href="assets/css/style.css"/>`;
    }
    
    static getScripts() {
        return `
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script src="assets/js/shared.js"></script>`;
    }
}

// Initialize shared functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on page load
    CartManager.updateCartCount();
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }
});

// Global functions for backward compatibility
function buyNow(id, name, price, image) {
    CartManager.buyNow(id, name, price, image);
}

function updateCartCount() {
    CartManager.updateCartCount();
}