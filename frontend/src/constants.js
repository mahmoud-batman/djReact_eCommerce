const localhost = "http://127.0.0.1:8000";

const apiURL = "/api/v1";

export const endpoint = `${localhost}${apiURL}`;

export const authurl = `${endpoint}/users/rest-auth`;
export const productListURL = `${endpoint}/products/`;
export const productDetailURL = (uuid) => `${endpoint}/products/${uuid}/`;
export const addToCartURL = `${endpoint}/products/add-to-cart/`;
