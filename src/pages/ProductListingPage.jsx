import { useState } from "react";
import { Search, SlidersHorizontal, ArrowLeft } from "lucide-react";
import ProductCard from "../components/ProductCard";

const ProductListingPage = ({ products, onAdd, onViewDetails, onBack }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const categories = ["All", "Electronics", "Fashion", "Accessories"];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      if (sortOrder === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <section className="plp-page">
      {/* PAGE HEADER */}
      <div className="plp-heading">
        <div>
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={17} />
            Back to Home
          </button>

          <h1>Explore Our Collection</h1>

          <p>Discover products that match your lifestyle.</p>
        </div>
      </div>

      {/* SEARCH AND FILTER */}
      <div className="plp-toolbar">
        <div className="plp-search">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="plp-sort">
          <SlidersHorizontal size={18} />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Default Sorting</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="plp-categories">
        {categories.map((item) => (
          <button
            key={item}
            className={
              category === item ? "category-btn selected" : "category-btn"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* PRODUCT RESULTS */}
      <div className="plp-results-header">
        <h2>All Products</h2>

        <span>{filteredProducts.length} products found</span>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={onAdd}
              onViewDetails={onViewDetails}
            />
          ))
        ) : (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try another keyword or category.</p>

            <button
              className="checkout-btn"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductListingPage;
