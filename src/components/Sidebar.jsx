import {
  Home,
  ShoppingBag,
  Tag,
  ShoppingCart,
  User,
  MoreHorizontal,
  Truck,
} from "lucide-react";

const Sidebar = ({ currentView, onNavigate, cartCount }) => {
  const menuItems = [
    { name: "Home", icon: Home, view: "home" },
    { name: "Shop", icon: ShoppingBag, view: "plp" },
    { name: "Categories", icon: Tag, view: "categories" },
    { name: "Cart", icon: ShoppingCart, view: "cart" },
    { name: "Account", icon: User, view: "account" },
    { name: "More", icon: MoreHorizontal, view: "more" },
  ];

  return (
    <aside className="sidebar">
      <div className="brand" onClick={() => onNavigate("home")}>
        <ShoppingBag size={32} />
        <h2>Shop-Eh</h2>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`nav-item ${
                currentView === item.view ? "active" : ""
              }`}
              onClick={() => onNavigate(item.view)}
            >
              <Icon size={21} />

              <span>{item.name}</span>

              {item.name === "Cart" && cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="shipping-card">
        <Truck size={35} />
        <h3>Free Shipping</h3>
        <p>On orders over $50!</p>
      </div>
    </aside>
  );
};

export default Sidebar;
