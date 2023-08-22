const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      ...state,
      loading: true,
    };
  }

  // if (action.type === "ADD_TO_CART") {
  //   return {
  //     ...state,
  //     cart: action.payload,
  //     loading: false,
  //   };
  // }

  if (action.type === "ADD_TO_CART") {
    const newCart = new Map(
      action.payload.map((item) => {
        return [item.id, item];
      })
    );
    return {
      ...state,
      cart: newCart,
      loading: false,
    };
  }

  // if (action.type === "CLEAR_CART") {
  //   return {
  //     ...state,
  //     cart: [],
  //   };
  // }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: new Map(),
    };
  }

  // if (action.type === "REMOVE_ITEM") {
  //   const newCart = state.cart.filter((item) => {
  //     return item.id !== action.payload;
  //   });
  //   return {
  //     ...state,
  //     cart: newCart,
  //   };
  // }

  if (action.type === "REMOVE_ITEM") {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload);
    return {
      ...state,
      cart: newCart,
    };
  }

  // if (action.type === "INCREASE_AMOUNT") {
  //   const updatedCart = state.cart.map((item) => {
  //     if (item.id === action.payload) {
  //       return { ...item, amount: item.amount + 1 };
  //     } else {
  //       return item;
  //     }
  //   });
  //   return {
  //     ...state,
  //     cart: updatedCart,
  //   };
  // }

  if (action.type === "INCREASE_AMOUNT") {
    const newCart = new Map(state.cart);
    const itemToUpdate = newCart.get(action.payload);
    const updatedItem = { ...itemToUpdate, amount: itemToUpdate.amount + 1 };
    newCart.set(action.payload, updatedItem);
    return {
      ...state,
      cart: newCart,
    };
  }

  // if (action.type === "DECREASE_AMOUNT") {
  //   const updatedCart = state.cart
  //     .map((item) => {
  //       if (item.id === action.payload) {
  //         return { ...item, amount: item.amount - 1 };
  //       } else {
  //         return item;
  //       }
  //     })
  //     .filter((cartItem) => {
  //       return cartItem.amount > 0;
  //     });
  //   return {
  //     ...state,
  //     cart: updatedCart,
  //   };
  // }

  if (action.type === "DECREASE_AMOUNT") {
    const newCart = new Map(state.cart);
    const itemToUpdate = newCart.get(action.payload);
    if (itemToUpdate.amount <= 1) {
      newCart.delete(action.payload);
    } else {
      const updatedItem = { ...itemToUpdate, amount: itemToUpdate.amount - 1 };
      newCart.set(action.payload, updatedItem);
    }
    return {
      ...state,
      cart: newCart,
    };
  }

  // if (action.type === "GET_TOTALS") {
  //   let { numberOfItems, grandTotal } = state.cart.reduce(
  //     (cartTotal, item) => {
  //       const { price, amount } = item;
  //       cartTotal.numberOfItems += amount;
  //       cartTotal.grandTotal += price * amount;
  //       return cartTotal;
  //     },
  //     {
  //       numberOfItems: 0,
  //       grandTotal: 0,
  //     }
  //   );
  //   return {
  //     ...state,
  //     total: parseFloat(grandTotal).toFixed(2),
  //     amount: numberOfItems,
  //   };
  // }

  if (action.type === "GET_TOTALS") {
    let total = 0,
      noOfItems = 0;
    for (let { amount, price } of state.cart.values()) {
      noOfItems += amount;
      total += amount * price;
    }
    return {
      ...state,
      total: parseFloat(total).toFixed(2),
      noOfItems: noOfItems,
    };
  }

  throw new Error("No matching action type");
};

export default reducer;
