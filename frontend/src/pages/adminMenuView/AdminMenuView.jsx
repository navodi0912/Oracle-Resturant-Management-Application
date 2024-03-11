import React, {useState, useEffect} from 'react'
import './adminmenuview.css'
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import SingleMenuItem from './singleMenuItem/SingleMenuItem';
// import { PRODUCTS } from '../../products'; // importing the temporary database file named products.js
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import SideNavBar from '../../components/sidenavbar/sideNavBar';

export default function AdminMenuView() {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);

  useEffect(()=>{
    const url = "http://localhost:8070/menu/";
    function getItems(){
      axios.get(url).then((res)=> {
        setItemList(res.data);
      }).catch((err)=> {
        alert(err);
      })
    }
    getItems();
  }, [])

  return (
    <section className="admin_view_menu">
       {/*The admin navbar should be pasted below this line*/}
       <SideNavBar />
       {/* <div className="navbarTest"></div> */}
       <div className="admin_menu_section">
        <div className="add_items_btn_con">
            <button onClick={() => navigate('/admin_menu_add')} className="menu_add_items_btn">
                <ControlPointRoundedIcon sx={{ fontSize: 30 }}/> 
                <h3>Add Items</h3>
            </button>
        </div>
        <div className="menu_items_con">
            {itemList.map((product) => <SingleMenuItem data={product}/>)}
        </div>
       </div>
    </section>
  )
}
