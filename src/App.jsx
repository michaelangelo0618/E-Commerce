import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";

import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";

import products from "./data/products";

import { ArrowRight, ShoppingBag } from "lucide-react";

import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [search, setSearch] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopnest-cart")) || [];
    } catch {
      return [];
    }
  });

  // Save cart
  useEffect(() => {
    localStorage.setItem("shopnest-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Navigate between pages
  const navigate = (view) => {
    setCurrentView(view);
    setSelectedProduct(null);
  };

  // Open product details
  const viewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView("pdp");
  };

  // Add product to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove product
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + amount,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Cart count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    alert(
      `Thank you for shopping at Shop-Eh!\n\nYour total is ₱${total.toFixed(2)}.\n\nThis is a simulated checkout.`,
    );

    setCartItems([]);
    navigate("home");
  };

  // Homepage products
  const homeProducts = products.slice(0, 4);

  return (
    <div className="app">
      {/* SIDEBAR */}
      <Sidebar
        currentView={currentView}
        onNavigate={navigate}
        cartCount={cartCount}
      />

      <main className="main-content">
        {/* NAVBAR */}
        <Navbar search={search} setSearch={setSearch} />

        {/* HOMEPAGE */}
        {currentView === "home" && (
          <div className="shop-layout">
            <section className="shop-main">
              <section className="hero-banner">
                <div className="hero-content">
                  <span className="hero-label">New Arrival</span>

                  <h1>Upgrade Your Tech</h1>

                  <p>Smarter. Faster. Better.</p>

                  <button
                    className="hero-button"
                    onClick={() => navigate("plp")}
                  >
                    Shop Now
                    <ArrowRight size={18} />
                  </button>
                </div>

                <img
                  src={products[0].image}
                  alt="Featured headphones"
                  className="hero-image"
                />
              </section>

              <section className="category-section">
                <div className="section-header">
                  <div>
                    <h2>Featured Products</h2>
                    <p>Discover our latest collection</p>
                  </div>

                  <button
                    className="view-all-btn"
                    onClick={() => navigate("plp")}
                  >
                    View All
                    <ArrowRight size={17} />
                  </button>
                </div>

                <div className="product-grid">
                  {homeProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAdd={addToCart}
                      onViewDetails={viewProduct}
                    />
                  ))}
                </div>
              </section>
            </section>

            <CartSidebar
              cartItems={cartItems}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onCheckout={handleCheckout}
              onClose={() => navigate("home")}
            />
          </div>
        )}

        {/* PRODUCT LISTING PAGE */}
        {currentView === "plp" && (
          <ProductListingPage
            products={products}
            onAdd={addToCart}
            onViewDetails={viewProduct}
            onBack={() => navigate("home")}
          />
        )}

        {/* CATEGORIES PAGE */}
        {currentView === "categories" && (
          <section className="plp-page">
            <button className="back-button" onClick={() => navigate("home")}>
              ← Back to Home
            </button>

            <div className="plp-heading">
              <h1>Shop by Category</h1>
              <p>Explore our collections at ShopNest.</p>
            </div>

            <div className="category-page-grid">
              {[
                {
                  name: "Electronics",
                  image: products[0].image,
                },
                {
                  name: "Fashion",
                  image: products[2].image,
                },
                {
                  name: "Accessories",
                  image: products[3].image,
                },
              ].map((category) => (
                <button
                  className="category-page-card"
                  key={category.name}
                  onClick={() => navigate("plp")}
                >
                  <img src={category.image} alt={category.name} />

                  <h2>{category.name}</h2>

                  <span>Explore Collection →</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* PRODUCT DETAIL PAGE */}
        {currentView === "pdp" && (
          <ProductDetailPage
            product={selectedProduct}
            onAdd={addToCart}
            onBack={() => navigate("plp")}
          />
        )}

        {/* CART PAGE */}
        {currentView === "cart" && (
          <section className="cart-page">
            <h1>Shopping Cart</h1>

            <CartSidebar
              cartItems={cartItems}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onCheckout={handleCheckout}
              onClose={() => navigate("home")}
            />
          </section>
        )}

        {/* ACCOUNT PAGE */}
        {currentView === "account" && (
          <section className="simple-page">
            <ShoppingBag size={45} />
            <h1>My Account</h1>
            <p>Welcome to your ShopNest account.</p>
          </section>
        )}

        {/* MORE PAGE */}
        {currentView === "more" && (
          <section className="simple-page">
            <h1>More Information</h1>
            <p>Discover more about ShopNest.</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
