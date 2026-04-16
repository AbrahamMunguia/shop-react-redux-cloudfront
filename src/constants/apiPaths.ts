const BASE_URL = `https://9yd6w4clbj.execute-api.us-east-1.amazonaws.com/prod`
const API_PATHS = {
  product: `${BASE_URL}/products`,
  order: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  import: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  bff: (id: string) => `${BASE_URL}/products/${id}`,
  cart: "https://.execute-api.eu-west-1.amazonaws.com/dev",
};

export default API_PATHS;
