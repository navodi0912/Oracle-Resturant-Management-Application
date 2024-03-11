import React, { createContext, useState } from 'react'
import {PRODUCTS} from '../products'

export const ItemContext = createContext(null);

const getDefaultCart = () => {
    let cart = {}

    const highestId = PRODUCTS.reduce((max, product) => {
        return product.id > max ? product.id : max;
      }, 0);
      
      console.log(highestId);

    for (let i = 1; i <= highestId; i++){
        cart[i] = 0;
    }
    
    return cart;
};

export default function ItemsContextProvider(props) {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] = 1}));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] = 0}));
    };

    const increaseCart = (itemId) => {
      setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    };

    const deductCart = (itemId) => {
      setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
    };

    const updateCartItem = (newAmount, itemId) => {
      console.log(newAmount);
      if(newAmount === 0){
        newAmount = null;
      }
      /*If any error occurs remove this code*/
      else if(newAmount < 0){
        newAmount = 0;
      }

      setCartItems((prev) => ({...prev, [itemId]: newAmount}));
    }

    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for(const item in cartItems){
        if(cartItems[item] > 0){
          let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
      return totalAmount;
    };

    const contextValue = {
      cartItems, 
      addToCart, 
      removeFromCart, 
      increaseCart, 
      deductCart, 
      updateCartItem,
      getTotalCartAmount
      };
  return (
    <ItemContext.Provider value={contextValue}>
      {props.children}
    </ItemContext.Provider>
  )
}
