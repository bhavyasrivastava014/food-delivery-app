// API configuration for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://food-delivery-app-c4kw.onrender.com';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  CREATE_USER: `${API_BASE_URL}/api/createuser`,
  LOGIN_USER: `${API_BASE_URL}/api/loginuser`,
  FOOD_DATA: `${API_BASE_URL}/api/foodData`,
  ORDER_DATA: `${API_BASE_URL}/api/orderData`,
  MY_ORDER_DATA: `${API_BASE_URL}/api/myOrderData`,
  SEARCH_DATA: `${API_BASE_URL}/api/searchData`
};

export default API_ENDPOINTS;
