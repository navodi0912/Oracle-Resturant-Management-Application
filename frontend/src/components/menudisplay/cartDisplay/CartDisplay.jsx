import React, { useContext, useEffect, useState } from 'react'
import './cartdisplay.css'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import { PRODUCTS } from '../../../products';
import { ItemContext } from '../../../context/items-context';
import CartSingleItem from './cartSingleItem/CartSingleItem';
import empty_cart from '../../../assets/empty_cart.png';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


export default function CartDisplay({scrollPosition, cartClicked, setCartClicked}) {
  const [PRODUCTS, setPRODUCTS] = useState([]);
  const [pickupOption, setPickupOption] = useState("DineIn");

  useEffect(()=> {
    const url = "http://localhost:8070/menu/";
    axios.get(url).then((res)=> {
      setPRODUCTS(res.data);
    }).catch((err)=> {
      alert(err);
    })
  }, [])

  const { cartItems, getTotalCartAmount, getItemQuantity, getItemQuantityPrice } = useContext(ItemContext);
  let countItems = 0;
  const totalAmount = getTotalCartAmount();

  const postUrl = "http://localhost:8070/order/staff/add";
  const postUrlAdmin = "http://localhost:8070/order/admin/add";
  const navigate = useNavigate();

  function handleSubmit(){
    const itemQuantity = getItemQuantity();
    getItemQuantityPrice();
    const data = {
      "product": itemQuantity
    }

    const total = getTotalCartAmount();
    const adminReportData = {
      total
    }

    axios.post(postUrl, data).then(() => {
      console.log("Item Successfully added");
      }).catch((err) => {
        alert(err);
        console.log("error");
  })

    axios.post(postUrlAdmin, adminReportData).then(() => {
      console.log("Item Successfully added");
      }).catch((err) => {
        alert(err);
        console.log("error");
  })
  navigate('/customer_order_bill', {state: {pickup: pickupOption}});
  }

  return (
    <div className={`cartDisplay ${cartClicked ? 'active' : null}`}>
        <div className="closeButton" onClick={()=> {setCartClicked(!cartClicked)}}>
          <CloseRoundedIcon sx={{ fontSize: 40 }}/>
        </div>
        <div className="cart_content_con">
          <div className="table_con">
            {
            PRODUCTS.map((product) => {
              if(cartItems[product._id] !== 0){
                countItems = countItems + 1;
                return <CartSingleItem data={product}/>
              }
            })}
            {countItems === 0 && 
              <div className='cart_empty_con'>
                <div className="cart_empty_image_name_con">
                  <div className="cart_empty_img_con">
                    <img src={empty_cart} alt="empty cart image" />
                  </div>
                  <div className="cart_empty_message">
                    <h1>Your Cart is Empty!</h1>
                  </div>
                </div>
              </div>}
          </div>
          {countItems > 0 &&
            <div className="cart_total_checkout_pickupOption_con">
            <div className="cart_total_con">
              <div className="cart_total_topic cart_total_sub">
                <h2>Total: </h2>
              </div>
              <div className="cart_total_amount cart_total_sub">
                <h2>Rs. {totalAmount}</h2>
              </div>
            </div>
            <div className="cart_continue_checkout_con">
              <button onClick={()=> {setCartClicked(false)}} className='cart_add_more'>Continue Shopping</button>
              <button onClick={()=> {handleSubmit()}} className='cart_checkout_btn'>Place Order</button>
            </div>
            <div className="cart_pickup_opt_con">
              <div className="cart_dinein_con cart_pickup_cons">
                <label htmlFor="dine_in" className="cart_dine_in">Dine In</label>
                <input id='dine_in' value={"Dine In"} type="radio" name='pickup_option' onClick={()=> {setPickupOption("DineIn")}}/>
              </div>
              <div className="cart_takeaway_con cart_pickup_cons">
                <label htmlFor="take_away" className="cart_take_away">Take Away</label>
                <input id='take_away' value={"Take Away"} type="radio" name='pickup_option' onClick={()=> {setPickupOption("TakeAway")}}/>
              </div>
              <div className="cart_deliver_con cart_pickup_cons">
                <label htmlFor="deliver" className="cart_deliver">Deliver</label>
                <input style={{color : "orange"}} id='deliver' value={"Deliver"} type="radio" name='pickup_option' onClick={()=> {setPickupOption("Delivery")}}/>
              </div>
            </div>
          </div>
          }
        </div>
    </div>
  )
}
