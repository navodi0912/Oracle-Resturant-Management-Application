import React, {useRef, useState} from 'react'
import './adminmenuupdate.css'
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideNavBar from '../../components/sidenavbar/sideNavBar';

export default function AdminMenuUpdate(props) {
    // const {_id, name, category, ingredients, portionSize, price, image} = props.data;
    const addImageRef = useRef(null);
    const location = useLocation();

    const [id, setId] = useState(location.state.data._id);
    const [name, setName] = useState(location.state.data.name);
    const [ingredients, setIngredients] = useState(location.state.data.ingredients);
    const [portionSize, setPortionSize] = useState(location.state.data.portionSize);
    const [price, setPrice] = useState(location.state.data.price);
    const [category, setCategory] = useState(location.state.data.category);

    const putUrl = `http://localhost:8070/menu/updateMenu/${id}`;

    const navigate = useNavigate();

    const data = {
        name,
        ingredients,
        portionSize,
        price,
        category
    }

    function handleSubmit(e){
        e.preventDefault();
        
        axios.put(putUrl, data).then(() => {
            alert("Item Successfully updated");
        }).catch((err) => {
            alert(err);
            console.log("error");
        })

        navigate("/admin_menu_view");
    }


    function handleClick(event){
        event.preventDefault();
        addImageRef.current.click();
    }

  return (
    <section className='admin_menu_add'>
      {/*The admin navbar should be pasted below this line. In place of navbarTest*/}
      <SideNavBar/>
      {/* <div className="navbarTest"></div> */}
      <div className="form_section">
        <form className="form_menu_add" onSubmit={handleSubmit}>
            <div className="form_input_con">
               <div className="input_sub_con">
               <div className="form_product_id form_inputs">
                    <h3>Product ID</h3>
                    <input value={id} type="text" readOnly/>
                </div>
                <div className="form_product_name form_inputs">
                    <h3>Product Name</h3>
                    <input onChange={(e)=> {setName(e.target.value)}} value={name} type="text" required maxLength={50}/>
                </div>
                <div className="form_description form_inputs">
                    <h3>Description</h3>
                    <input onChange={(e)=> {setIngredients(e.target.value)}} value={ingredients} type="text" required maxLength={500}/>
                </div>
                <div className="form_portion form_inputs">
                    <h3>Portion Size</h3>
                    <input onChange={(e)=> {setPortionSize(e.target.value)}} value={portionSize} type="number" required/>
                </div>
                <div className="form_price form_inputs">
                    <h3>Price</h3>
                    <input onChange={(e)=> {setPrice(e.target.value)}} value={price} type="number" required/>
                </div>
                <div className="form_category form_inputs">
                    <h3>Category</h3>
                    <select onChange={(e)=> {setCategory(e.target.value)}} value={category} name="productCategories" id="product_categories">
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Appetizers">Appetizers</option>
                        <option value="Starters">Starters</option>
                        <option value="Special">Special</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                </div> 
            </div>
            <button className='product_submit_btn' type='submit'>Update Product</button>
        </form>
      </div>
    </section>
  )
}

