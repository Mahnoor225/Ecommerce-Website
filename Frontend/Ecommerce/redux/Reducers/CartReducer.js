const initialState = {
  carts: [],
};


const CartReducer = (state = initialState, action) => {
  console.log("reducer action", action);

  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        const updatedCarts = state.carts.map((item, index) =>
          index === existingItemIndex
            ? { ...item, qty: item.qty + 1 }
            : item
        );
        return {
          ...state,
          carts: updatedCarts,
        };
      } else {
        const newItem = { ...action.payload, qty: 1 };
        return {
          ...state,
          carts: [...state.carts, newItem],
        };
      }
    }

    case "INCREMENT_QTY":
      return {
        ...state,
        carts: state.carts.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
        ),
      };

    case "DECREMENT_QTY":
      return {
        ...state,
        carts: state.carts.map((item) =>
          item.id === action.payload && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        carts: state.carts.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default CartReducer;
