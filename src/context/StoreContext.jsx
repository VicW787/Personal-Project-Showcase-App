import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch.js";
import { API_URL } from "../api.js";



const StoreContext = createContext(null);
 
export function StoreProvider({ children }) {
  const { data } = useFetch(`${API_URL}/store_info`);
 
  const store = data && data.length > 0 ? data[0] : null;
 
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}
 
export function useStore() {
  return useContext(StoreContext);
}