import { ShoppingCart, Star, Eye } from "lucide-react";

const ProductCard = ({ product, onAdd, onViewDetails }) => {
  return (
    <article className="product-card">
      <div
        className="product-image-container clickable-product"
        onClick={() => onViewDetails(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onViewDetails(product);
          }
        }}
      >
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="product-info">
        <button
          className="product-name-button"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </button>

        <p className="product-price">₱{product.price.toFixed(2)}</p>

        <div className="product-rating">
          <Star size={14} fill="#f5ad36" color="#f5ad36" />

          <span>{product.rating}</span>

          <span className="reviews">({product.reviews})</span>
        </div>

        <div className="product-card-actions">
          <button className="add-cart-btn" onClick={() => onAdd(product)}>
            <ShoppingCart size={15} />
            Add to Cart
          </button>

          <button
            className="view-details-btn"
            onClick={() => onViewDetails(product)}
            aria-label={`View ${product.name}`}
          >
            <Eye size={17} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
