import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.item];
    case "REMOVE":
      return state.filter((item, index) => index !== action.index);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

const ContextReducer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <div>
      <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
          {children}
        </CartStateContext.Provider>
      </CartDispatchContext.Provider>
    </div>
  );
};

export default ContextReducer;
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

export const useCartItemCount = () => {
  const cart = useCart();
  return cart.length;
};
