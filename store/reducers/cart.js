import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/order";
import { DELETE_PRODUCT } from "../actions/products";
const initialState = {
  item: {},
  totalAmount: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.products;
      const prodprice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const pushToken = addedProduct.pushToken;
      if (state.item[addedProduct.id]) {
        // already have the item in the cart
        const updatatedCartItem = new CartItem(
          state.item[addedProduct.id].quanity + 1,
          prodprice,
          prodTitle,
          pushToken,
          state.item[addedProduct.id].sum + prodprice
        );
        return {
          ...state,
          item: { ...state.item, [addedProduct.id]: updatatedCartItem },
          totalAmount: state.totalAmount + prodprice,
        };
      } else {
        const newCartItem = new CartItem(
          1,
          prodprice,
          prodTitle,
          pushToken,
          prodprice
        );
        return {
          ...state,
          item: { ...state.item, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount - prodprice,
        };
      }
    case REMOVE_FROM_CART:
      const selectedCartItem = state.item[action.pid];
      const currentQty = selectedCartItem.quanity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it , not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quanity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.item, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.item };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        item: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.item[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.item };
      const itemTotal = state.item[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        item: updatedItems,
        totalAmount: itemTotal,
      };
  }
  return state;
};
