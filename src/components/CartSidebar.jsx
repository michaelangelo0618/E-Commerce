import { ShoppingCart, X, Trash2, Minus, Plus } from "lucide-react";

const CartSidebar = ({
  cartItems,
  onRemove,
  onUpdateQuantity,
  onCheckout,
  onClose,
}) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <aside className="cart-sidebar">
      <div className="cart-header">
        <h2>
          <ShoppingCart size={23} />
          Your Cart
        </h2>

        <button className="close-btn" onClick={onClose}>
          <X size={22} />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <ShoppingCart size={45} />
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-details">
                <h4>{item.name}</h4>

                <p>₱{item.price.toFixed(2)}</p>

                <div className="quantity-controls">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                <Trash2 size={19} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-footer">
        <div className="cart-total">
          <h3>Total:</h3>

          <h2>₱{total.toFixed(2)}</h2>
        </div>

        <button
          className="checkout-btn"
          disabled={cartItems.length === 0}
          onClick={onCheckout}
        >
          Proceed to Checkout →
        </button>
      </div>
    </aside>
  );
};

export default CartSidebar;
