import { useContext, useReducer, useEffect, createContext } from "react";
import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const defaultState = {
  loading: false,
  cart: new Map(), // cart: [],
  total: 0,
  noOfItems: 0,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await fetch(url);
      const newCart = await response.json();
      dispatch({ type: "ADD_TO_CART", payload: newCart });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const increaseAmount = (id) => {
    dispatch({ type: "INCREASE_AMOUNT", payload: id });
  };

  const decreaseAmount = (id) => {
    dispatch({ type: "DECREASE_AMOUNT", payload: id });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItemFromCart,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
