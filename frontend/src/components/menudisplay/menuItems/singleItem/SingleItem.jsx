import React, { useContext } from 'react';
import {useState} from 'react';
import './singleitem.css';
import { ItemContext } from '../../../../context/items-context';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function SingleItem(props) {
  const {_id, name, ingredients, portionSize, price, category, image} = props.data;
  const [cartBtn, setCartBtn] = useState(false);
  const {cartItems, addToCart, removeFromCart} = useContext(ItemContext);

  return (
    <div className='single_item'>
      {/*}the div below is used to easily make the page responsive{*/}
      <div className="image_name_desc_price">
        <div className="image_con">
          <img className='item_image' src={`http://localhost:8070/images/${image}`} alt='image'/>
        </div>
        <div className="name_desc">
          <h1 className='pro_name'>{name}</h1>
          <p className='pro_desc'>{ingredients}</p>
        </div>
        <div className="price_con">
          <p>Rs. {price}</p>
        </div>
      </div>
      {/*}the div below is used to easily make the page responsive{*/}
      <div className="portion_cart">
        <p>Suitable for {portionSize} people</p>
        <button className={cartItems[_id] > 0 || cartItems[_id] == null ? 'active' : null} onClick={() => {cartItems[_id] === 0 ? addToCart(_id) : removeFromCart(_id);setCartBtn(!cartBtn);}}>{cartItems[_id] > 0 || cartItems[_id] == null ? <ShoppingCartIcon sx={{ fontSize: 20 }}/> : <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }}/>}</button>
      </div>
    </div>
  )
}
