import React, { createContext, useState } from 'react'
// import {PRODUCTS} from '../products'
import axios from 'axios';

export const ItemContext = createContext(null);



export default function ItemsContextProvider(props) {
  const [PRODUCTS, setPRODUCTS] = useState([]); // This is for the products retrieved from the database
  const [cartItems, setCartItems] = useState([]); // This is for storing the quantities relevant to all the IDs
  const [defaultCount, setDefaultCount] = useState(0); // number of times the getDefaultCart function gets executed
  const [continueFetch, setContinueFetch] = useState(true); // informs whether to invoke the getDefaultMethod or not

   /*--- Will execute first when the page is reloaded ---*/
   const getDatabase = () => {

    const getUrl = "http://localhost:8070/menu/";
    axios.get(getUrl).then((res)=> {
      setPRODUCTS(res.data);
    }).catch((err)=> {
      alert(err);
    })

  }
  /*--- Will execute only after reaching a certain location of the website ---*/
  const getDefaultCart = () => {

    setDefaultCount(defaultCount + 1); // count the number of times the function is invoked
    
    if(defaultCount == 1){
      setContinueFetch(false); // after the function is invoked once, it will set the value to false, and this state is passed to the CusMenu which will respectively change the value
    }

      let cart = {}
  
      PRODUCTS.forEach(product => {
        cart[product._id] = 0;
      });
      
      setCartItems(cart);
      // console.log(cartItems);
      console.log(defaultCount);
  };

/*--- Will execute at the same time with getDefaultCart() ---*/
  const returnDatabase = () => {
    return PRODUCTS;
  }

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
      if(newAmount === 0){
        newAmount = null;
      }
      /*If any error occurs remove this code*/
      else if(newAmount < 0){
        newAmount = 0;
      }

      setCartItems((prev) => ({...prev, [itemId]: newAmount}));
    }

    const returnCart = () => {
      return cartItems;
    }

    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for(const item in cartItems){
        if(cartItems[item] > 0){
          // let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
          let itemInfo = PRODUCTS.find((product) => product._id === item);
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
      return totalAmount;
    };

    /*Returns the items in cart along with their quantities*/
    const getItemQuantity = () => {
      let itemQuantity = {}

      for(const item in cartItems){
        if(cartItems[item] > 0){
          let itemInfo = PRODUCTS.find((product) => product._id === item);
          itemQuantity[itemInfo.name] = cartItems[item];
        }
      }
      return itemQuantity;
    }

    const getItemQuantityPrice = () => {
      let addedItems = [];

      for(const item in cartItems){
        if(cartItems[item] > 0){
          let itemInfo = PRODUCTS.find((product) => product._id === item);
          const itemDetails = {
            "name" : itemInfo.name,
            "quantity" : cartItems[item],
            "price": itemInfo.price
          }

          addedItems.push(itemDetails);
        }
      }
      return addedItems;
    }

    const contextValue = {
      cartItems, 
      addToCart, 
      removeFromCart, 
      increaseCart, 
      deductCart, 
      updateCartItem,
      getTotalCartAmount,
      getItemQuantity,
      getItemQuantityPrice,
      getDatabase,
      getDefaultCart,
      returnDatabase,
      continueFetch,
      returnCart,
      PRODUCTS
      };
  return (
    <ItemContext.Provider value={contextValue}>
      {props.children}
    </ItemContext.Provider>
  )
}
