import { FaCartPlus } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Navbar = () => {
  const { noOfItems } = useGlobalContext();

  return (
    <nav>
      <div className="nav-center">
        <h3>MyCart</h3>
        <div className="nav-container">
          <FaCartPlus className="cart-icon" />
          <div className="amount-container">
            <p className="total-amount">{noOfItems}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
