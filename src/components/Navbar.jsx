import { Search, Bell, ChevronDown } from "lucide-react";

const Navbar = ({ search, setSearch }) => {
  return (
    <header className="navbar">
      <div className="search-container">
        <Search size={21} />

        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="navbar-actions">
        <button className="notification-btn" aria-label="Notifications">
          <Bell size={23} />
          <span className="notification-dot">3</span>
        </button>

        <div className="profile">
          <img src="Bbm.jpg" alt="User profile" />
          <ChevronDown size={17} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
