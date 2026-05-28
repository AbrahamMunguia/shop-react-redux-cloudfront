const BASE_URL = `https://9yd6w4clbj.execute-api.us-east-1.amazonaws.com/prod`
const CART_URL = `https://huac1psnce.execute-api.us-east-1.amazonaws.com/prod/api/profile/cart`
const API_PATHS = {
  product: `${BASE_URL}/products`,
  order: `${CART_URL}/checkout`,
  import: `${BASE_URL}/import`,
  addProduct: `${BASE_URL}/products`,
  cart: CART_URL,
  bff: `${BASE_URL}`,
};

export default API_PATHS;
