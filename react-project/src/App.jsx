import { useMemo, useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Wireless Mouse", price: 25, category: "Accessories" },
  { id: 2, name: "Mechanical Keyboard", price: 69, category: "Accessories" },
  { id: 3, name: "Noise-Canceling Headphones", price: 120, category: "Audio" },
  { id: 4, name: "USB-C Hub", price: 45, category: "Utilities" },
  { id: 5, name: "Webcam", price: 55, category: "Video" },
  { id: 6, name: "Laptop Stand", price: 35, category: "Ergonomics" },
];

function App() {
  const [cart, setCart] = useState({});

  const addToCart = (productId) => {
    setCart((previousCart) => ({
      ...previousCart,
      [productId]: (previousCart[productId] || 0) + 1,
    }));
  };

  const decrementFromCart = (productId) => {
    setCart((previousCart) => {
      const currentQty = previousCart[productId] || 0;

      if (currentQty <= 1) {
        const nextCart = { ...previousCart };
        delete nextCart[productId];
        return nextCart;
      }

      return {
        ...previousCart,
        [productId]: currentQty - 1,
      };
    });
  };

  const clearCart = () => setCart({});

  const cartItems = useMemo(
    () => products.filter((product) => cart[product.id]).map((product) => ({ ...product, quantity: cart[product.id] })),
    [cart],
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <main className="shopping-cart-app">
      <header className="app-header">
        <h1>Shopping Cart</h1>
        <p>Built with HTML, CSS, JavaScript, and React.</p>
      </header>

      <section className="product-grid" aria-label="Products">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p className="category">{product.category}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button type="button" onClick={() => addToCart(product.id)}>
              Add to cart
            </button>
          </article>
        ))}
      </section>

      <section className="cart-panel" aria-label="Cart summary">
        <div className="cart-heading">
          <h2>Your Cart</h2>
          <span>{totalItems} item(s)</span>
        </div>

        {cartItems.length === 0 ? (
          <p className="empty">Your cart is empty. Add products to get started.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <small>${item.price.toFixed(2)} each</small>
                </div>
                <div className="quantity-controls">
                  <button type="button" onClick={() => decrementFromCart(item.id)} aria-label={`Decrease ${item.name}`}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => addToCart(item.id)} aria-label={`Increase ${item.name}`}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer className="cart-footer">
          <p>
            <span>Total:</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </p>
          <button type="button" className="clear" onClick={clearCart} disabled={cartItems.length === 0}>
            Clear cart
          </button>
        </footer>
      </section>
    </main>
  );
}

export default App;
