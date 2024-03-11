import React, {useState, useRef} from 'react'
import './adminmenuadd.css'
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/sidenavbar/sideNavBar';

export default function AdminMenuAdd() {

    const postUrl = "http://localhost:8070/menu/add";

    const addImageRef = useRef(null);

    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [portionSize, setPortionSize] = useState(1);
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("Breakfast");
    
    const navigate = useNavigate();

    /*--- The states below are used for the validations, and to check if all the fields are completed before submission ---*/
    const [nameIsFilled, setNameIsFilled] = useState(false);
    const [descriptionIsFilled, setDescriptionIsFilled] = useState(false);
    const [portionSizeIsFilled, setPortionSizeIsFilled] = useState(false);
    const [priceIsFilled, setPriceIsFilled] = useState(false);

    // console.log(`name is ${nameIsFilled}`);
    // console.log(`description is ${descriptionIsFilled}`);
    // console.log(`portionSize is ${portionSizeIsFilled}`);
    // console.log(`price is ${priceIsFilled}`);

    /*The function used to submit the data to the backend*/
    function handleSubmit(e){
        if(nameIsFilled && descriptionIsFilled && portionSizeIsFilled && priceIsFilled){
            e.preventDefault();

            const formData = new FormData();

        formData.append('name',name);
        formData.append('ingredients',ingredients);
        formData.append('portionSize',portionSize);
        formData.append('price',price);
        formData.append('category',category);
        formData.append('image',image);

        axios.post(postUrl, formData).then(() => {
            alert("Item Successfully added");
            navigate("/admin_menu_view");
        }).catch((err) => {
            alert(err);
            console.log("error");
        })

        }
    }

    function handleClick(event){
        event.preventDefault();
        addImageRef.current.click();
    }

    function preventDef(event){
        event.preventDefault();
        
    }

    function convertToBase64(file){
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
  return (
    <section className='admin_menu_add'>
      {/*The admin navbar should be pasted below this line*/}
      <SideNavBar/>
      {/* <div className="navbarTest"></div> */}
      <div className="form_section">
        <form onSubmit={handleSubmit} className="form_menu_add" encType="multipart/form-data">
            <div className="form_input_con">
               <div className="input_sub_con">
                <div className="form_product_name form_inputs">
                    <h3>Product Name</h3>
                    <input onChange={(e)=> {setName(e.target.value); setNameIsFilled(e.target.value != "" ? true : false)}} type="text" required maxLength={50}/>
                </div>
                <div className="form_description form_inputs">
                    <h3>Description</h3>
                    <input onChange={(e)=> {setIngredients(e.target.value); setDescriptionIsFilled(e.target.value != "" ? true : false)}} type="text" required maxLength={500}/>
                </div>
                <div className="form_portion form_inputs">
                    <h3>Portion Size</h3>
                    <input onChange={(e)=> {setPortionSize(e.target.value); setPortionSizeIsFilled(e.target.value != "" ? true : false)}} type="number" required/>
                </div>
                <div className="form_price form_inputs">
                    <h3>Price</h3>
                    <input onChange={(e)=> {setPrice(e.target.value); setPriceIsFilled(e.target.value != "" ? true : false)}} type="number" required/>
                </div>
                <div className="form_category form_inputs">
                    <h3>Category</h3>
                    <select onClick={(event)=> {setCategory(event.target.value)}} name="productCategories" id="product_categories">
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
            {/* <input 
            ref={addImageRef} 
            type="file" 
            style={{display:"none"}}
            accept='.jpeg, .png, .jpg'
            onChange={(e) => handleFileUpload(e)}/> */}
            <input 
            ref={addImageRef} 
            type="file" 
            style={{display:"none"}}
            accept='.jpeg, .png, .jpg'
            onChange={(e) => {setImage(e.target.files[0]);}}
            />
            <button className='item_add_image' onClick={handleClick}><ControlPointRoundedIcon sx={{ fontSize: 30 }}/><h2>Add Image</h2></button>
            <button className='product_submit_btn' type='submit'>Add Product</button>
        </form>
      </div>
    </section>
  )
}

