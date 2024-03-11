import React, {useContext} from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './cartsingleitem.css'
import { ItemContext } from '../../../../context/items-context';

export default function CartSingleItem(props) {
    const {_id, name, ingredients, portionSize, price, category, image} = props.data;
    const { cartItems, increaseCart, deductCart, addToCart, removeFromCart, updateCartItem } = useContext(ItemContext);
    
  return (
    <div className='cart_single_item'>
      {/*}the div below is used to easily make the page responsive{*/}
      <div className="cart_image_name_desc_price">
        <div className="cart_image_con">
          <img className='cart_item_image' src={`http://localhost:8070/images/${image}`} alt='image'/>
        </div>
        <div className="cart_name_desc">
          <h1 className='cart_pro_name'>{name}</h1>
          <p className='cart_pro_desc'>{ingredients}</p>
        </div>
        <div className="cart_price_con">
          <p>Rs. {price}</p>
        </div>
      </div>
      {/*}the div below is used to easily make the page responsive{*/}
      <div className="cart_portion_cart">
        <button className='active' onClick={() => {removeFromCart(_id)}}><DeleteForeverIcon sx={{ fontSize: 20 }}/></button>
        <input type='number' onChange={(e) => {updateCartItem(Number(e.target.value), _id)}} value={cartItems[_id]} className="cart_quantity" />
      </div>
    </div>
  )
}
