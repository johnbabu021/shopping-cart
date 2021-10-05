import React, { createContext, useContext, useReducer } from "react";
import Reducer from "./reducer";

// initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("authUser")),
  cart: null,
  order: null,
};

const Store = createContext(initialState);
Store.displayName = "Store";

export const useStore = () => useContext(Store);

// provider components
export const GlobalProvider = ({ children, user }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  // actions
  const getUserCart = (result) => {
    dispatch({ type: "GET_USER_CART", payload: result });
  };
  const getUserOrder = (result) => {
    dispatch({ type: "GET_USER_ORDER", payload: result });
  };

  return (
    <Store.Provider
      value={{
        user: user,
        cart: state.cart,
        order: state.order,
        getUserCart,
        getUserOrder,
      }}
    >
      {children}
    </Store.Provider>
  );
};
