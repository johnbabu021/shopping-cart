export default function reducer(state, action) {
  switch (action.type) {
    case "GET_USER_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "GET_USER_ORDER":
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
}
