export const RECENT_FILTER = '?_sort=created_at:DESC&_limit=5';
export const PRODUCTS = '/products';
export const ADD_PRODUCTS = '/products/add';
export const UPDATE_PRODUCTS = '/products/:id';
export const CLIENTS = '/clients';
export const ADD_CLIENTS = '/clients/add';
export const UPDATE_CLIENTS = '/clients/:id';
export const REFRENCES = '/refrences';
export const ORDERS = '/orders';
export const BRANDS = '/brands';
export const GET_RECENT_PRODUCTS = `${PRODUCTS}${RECENT_FILTER}`;
export const GET_RECENT_CLIENTS = `${CLIENTS}${RECENT_FILTER}`;
export const GET_RECENT_REFRENCES = `${REFRENCES}${RECENT_FILTER}`;
export const GET_RECENT_ORDERS = `${ORDERS}${RECENT_FILTER}`;
export const GET_RECENT_BRANDS = `${BRANDS}${RECENT_FILTER}`;
