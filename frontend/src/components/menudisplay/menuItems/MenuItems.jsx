import React, { useEffect, useContext } from 'react'
import { useState, useRef } from 'react';
import './menuitems.css';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { style } from '@mui/system';
import SingleItem from './singleItem/SingleItem';
import axios from 'axios';
// import { PRODUCTS } from '../../../products'; // importing the temporary database file named products.js

import { ItemContext } from '../../../context/items-context';

export default function MenuItems({scrollPosition, cartClicked, setCartClicked, searchActivity, setSearchActivity, searchItem, filterOn, setFilterOn}) {

  // const [filterOn, setFilterOn] = useState(false);
  const scrollRef = useRef(null)
  const [filterType, setFilterType] = useState(null);
  const [catPos, setcatPos] = useState(0);
  const [cart, setCart] = useState(false);
  const [PRODUCTS, setPRODUCTS] = useState([]);
  const cat_con = document.querySelector('.category_container'); 
  var scrollPosition = 0;

  useEffect(()=> {
    const url = "http://localhost:8070/menu/";
    axios.get(url).then((res)=> {
      setPRODUCTS(res.data);
    }).catch((err)=> {
      alert(err);
    })
  }, [])


  function manageFilterSearchState(){
    setFilterOn(true);
    setSearchActivity(false);
  }

  /*Do not use any variable to assign values, directly assign the value to the needed property*/
  function setScroll(direction){
    if(direction === "left"){
      scrollRef.current.scrollLeft -= 150
      
    }
    else if(direction === "right"){
      scrollRef.current.scrollLeft += 150
    }

    
  }


  return (
    <div className='menuitemDisplay'>
      <div className="item_selector">
        <div className="slider">
          <button onClick={() => {setScroll("left"); !(catPos < 100) && setcatPos(catPos - 100);}} className='toggle_btn prev'><ChevronLeftRoundedIcon sx={{ fontSize: 40 }}/></button>
          <div className="category_container" ref={scrollRef}>
            <div className="category_container_sub">
              <button className="categories" onClick={() => {setFilterOn(false); setSearchActivity(false)}}>All</button>
              <button className="categories" onClick={() => {manageFilterSearchState();setFilterType("Breakfast");}}>Breakfast</button>
              <button className="categories" onClick={() => {manageFilterSearchState();setFilterType("Lunch");}}>Lunch</button>
              <button className="categories" onClick={() => {manageFilterSearchState();setFilterType("Dinner");}}>Dinner</button>
              <button className="categories" onClick={() => {manageFilterSearchState();setFilterType("Beverages");}}>Beverages</button>
              <button className="categories" onClick={() => {manageFilterSearchState();setFilterType("Appetizers");}}>Appetizers</button>
              <button className="categories" onClick={() => {manageFilterSearchState();setFilterType("Starters");}}>Starters</button>
              <button className="categories" onClick={() => {manageFilterSearchState();setFilterType("Special");}}>Special</button>
              <button className="categories" onClick={() => {manageFilterSearchState();setFilterType("Other");}}>Other</button>
            </div>
          </div>
          <button onClick={() => {setScroll("right"); !(catPos > 500) && setcatPos(catPos + 100);}} className='toggle_btn next'><ChevronRightRoundedIcon sx={{ fontSize: 40 }}/></button>
        </div>
        <div onClick={()=> {setCartClicked(!cartClicked)}} className="cart_icon">
          <ShoppingCartIcon sx={{ fontSize: 20 }}/>
        </div>
      </div>

      {/*The code below is used for the filter and search options*/}
      {/* <div className="item_container">
        {(!filterOn && !searchActivity) ? (
          PRODUCTS.map((product) => <SingleItem data={product} />)
        ) : (
          (filterOn && !searchActivity) ? (
            PRODUCTS.filter((product) => product.category === filterType).map(
              (product) => <SingleItem data={product} />
            )
          ) : (
            PRODUCTS.filter((product) =>
              product.name.toLowerCase().includes(searchItem.toLowerCase())
            ).map((product) => <SingleItem data={product} />)
          )
        )}
      </div> */}

      <div className="item_container">
        {(!filterOn && !searchActivity) ? (
          PRODUCTS.length > 0 ? (
            PRODUCTS.map((product) => <SingleItem data={product} />)
          ) : (
            <h1>No Items </h1>
          )
        ) : (
          (filterOn && !searchActivity) ? (
            PRODUCTS.filter((product) => product.category === filterType).length > 0 ? (
              PRODUCTS.filter((product) => product.category === filterType).map(
                (product) => <SingleItem data={product} />
              )
            ) : (
              <div className="no_items_menu_cus">
                <div className="no_items_menu_cus_mssges">
                  <h1>No items under the category</h1>
                  <p>Sorry for the inconvenience caused. There are no products available from the selected category</p>
                </div>
              </div>
            )
          ) : (
            PRODUCTS.filter((product) =>
              product.name.toLowerCase().includes(searchItem.toLowerCase())
            ).length > 0 ? (
              PRODUCTS.filter((product) =>
                product.name.toLowerCase().includes(searchItem.toLowerCase())
              ).map((product) => <SingleItem data={product} />)
            ) : (
              <div className="no_items_menu_cus">
                <div className="no_items_menu_cus_mssges">
                  <h1>No search results</h1>
                  <p>Product currently unavailable. Apologies for the inconvenience. Please browse our other exotic foods.</p>
                </div>
              </div>
            )
          )
        )}
      </div>


      {/* <div className="item_container">
        {(!filterOn && !searchActivity) ? (
          PRODUCTS.map((product) => <SingleItem data={product} />)
        ) : (
          (filterOn && !searchActivity) ? (
            PRODUCTS.filter((product) => product.category === filterType).map((product) => <SingleItem data={product} />)
          ) : (
            PRODUCTS.filter((product) => product.name.toLowerCase().includes(searchItem.toLowerCase())).map((product) => <SingleItem data={product} />)
          )
        )}
        {(filterOn || searchActivity) && PRODUCTS.filter((product) => 
          product.name.toLowerCase().includes(searchItem.toLowerCase()) ||
          product.category === filterType
        ).length === 0 && 
        <div className='no_items_message_con'>
          <h1>No Items Found!</h1>
        </div>}
      </div> */}

    </div>
  )
}






