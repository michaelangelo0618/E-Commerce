import { useState } from "react";

import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

const ProductDetailPage = ({ product, onAdd, onBack }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="no-products">
        <h2>Product not found</h2>

        <button className="checkout-btn" onClick={onBack}>
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAdd(product);
    }

    setQuantity(1);
  };

  return (
    <section className="pdp-page">
      {/* BACK BUTTON */}
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={18} />
        Back to Shop
      </button>

      {/* PRODUCT DETAILS */}
      <div className="pdp-container">
        {/* PRODUCT IMAGE */}
        <div className="pdp-image-section">
          <div className="pdp-main-image">
            <img src={product.image} alt={product.name} />

            {product.badge && (
              <span className="product-badge">{product.badge}</span>
            )}
          </div>
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="pdp-info">
          <span className="pdp-category">{product.category}</span>

          <h1>{product.name}</h1>

          {/* RATING */}
          <div className="pdp-rating">
            <Star size={18} fill="#f5ad36" color="#f5ad36" />

            <strong>{product.rating}</strong>

            <span>({product.reviews} customer reviews)</span>
          </div>

          {/* PRICE */}
          <h2 className="pdp-price">₱{product.price.toFixed(2)}</h2>

          <span className="stock-label">● In Stock</span>

          {/* DESCRIPTION */}
          <div className="pdp-description">
            <h3>Product Description</h3>

            <p>
              Discover the quality and style of the {product.name}. Designed to
              provide a great balance of functionality, comfort, and modern
              design.
            </p>

            <p>
              A perfect addition to your everyday essentials. Shop with
              confidence at ShopNest.
            </p>
          </div>

          {/* QUANTITY */}
          <div className="pdp-quantity">
            <span>Quantity:</span>

            <div className="quantity-controls">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* ADD TO CART */}
          <button className="pdp-add-btn" onClick={handleAddToCart}>
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          {/* BENEFITS */}
          <div className="pdp-benefits">
            <div>
              <Truck size={22} />

              <span>
                <strong>Free Shipping</strong>
                <small>On orders over $50</small>
              </span>
            </div>

            <div>
              <ShieldCheck size={22} />

              <span>
                <strong>Secure Shopping</strong>
                <small>Safe shopping experience</small>
              </span>
            </div>

            <div>
              <RotateCcw size={22} />

              <span>
                <strong>Easy Returns</strong>
                <small>Return policy information</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
