import CartItem from "./CartItem";
import { useGlobalContext } from "./context";

const CartContainer = () => {
  const { cart, total, clearCart } = useGlobalContext();

  const cartArray = Array.from(cart.entries());

  if (cartArray.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArray.map((cartItem) => {
          const [itemId, item] = cartItem;
          return <CartItem key={itemId} {...item} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button
          className="clear-btn"
          onClick={() => {
            clearCart();
          }}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
