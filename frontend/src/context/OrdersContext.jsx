import React, { createContext, useContext, useReducer, useEffect } from "react";

const OrdersContext = createContext();

const initialState =
  JSON.parse(localStorage.getItem("orders")) || [];

const ordersReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return [...state, action.payload];

    default:
      return state;
  }
};

export const OrdersProvider = ({ children }) => {
  const [orders, dispatch] = useReducer(ordersReducer, initialState);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <OrdersContext.Provider value={{ orders, dispatch }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
