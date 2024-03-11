import React, {useState} from 'react'
import './singlemenuitem.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';


export default function SingleMenuItem(props) {
  const navigate = useNavigate();
    const {_id, name, ingredients, portionSize, price, category, image} = props.data;
    const data = {
      _id,
      name,
      ingredients,
      portionSize,
      price,
      category,
      image
    }

    const deleteUrl = `http://localhost:8070/menu/delete/${_id}`

    const [deleteClicked, setDeleteClicked] = useState(false);

    function handleDelete(){
      axios.delete(deleteUrl).then((res)=>{
        alert("Successfully deleted");
      }).catch((err)=> {
        console.log(err);
      })

      setDeleteClicked(true);
    }
  return (
    <div className={`single_menu_item ${deleteClicked ? 'deleted_hide' : null} `}>
      <div className="image_con">
        <img src={`http://localhost:8070/images/${image}`} alt="product image" />
      </div>
      <div className="product_detail_con">
        <div className="product_id">
            <h4>{_id} - {category}</h4>
        </div>
        <div className="product_name">
            <h4>{name}</h4>
        </div>
        <div className="product_description">
            <p>{ingredients}</p>
        </div>
        <div className="portion_price">
            <div className="portion_con">
                <h4>Portion: {portionSize}</h4>
            </div>
            <div className="price_con">
                <h4>Rs. {price}</h4>
            </div>
        </div>
      </div>
      <div className="options_con">
        <Link state={{data: data}} to="/admin_menu_update" className="edit_icon_con options_con_sub">
            <EditIcon sx={{ fontSize: 30 }}/>
        </Link>
        <div onClick={handleDelete} className="delete_icon_con options_con_sub">
            <DeleteForeverIcon sx={{ fontSize: 30 }}/>
        </div>
      </div>
    </div>
  )
}
