import React, { useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";

const AppContext = React.createContext();

const defaultState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  function removeItemFromCart(id) {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }

  function increaseAmount(id) {
    dispatch({ type: "INCREASE_AMOUNT", payload: id });
  }

  function decreaseAmount(id) {
    dispatch({ type: "DECREASE_AMOUNT", payload: id });
  }

  async function fetchData() {
    dispatch({ type: "LOADING" });
    try {
      const response = await fetch(url);
      const newCart = await response.json();
      dispatch({ type: "ADD_TO_CART", payload: newCart });
    } catch (error) {
      console.log(error);
    }
  }

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
