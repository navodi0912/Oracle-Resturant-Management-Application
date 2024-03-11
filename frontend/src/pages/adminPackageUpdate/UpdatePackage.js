import React, {useRef, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdatePackage.css'
import SideNavBar from "../../components/sidenavbar/sideNavBar";

export default function UpdatePackage(props) {
  ;
    const location = useLocation();

    const [id, setId] = useState(location.state._id);
    const [packageid,setpackid] =useState(location.state.packageId);
    const [name,setname] =useState(location.state.name);
    const [items,setitems] =useState(location.state.items);
    const [description,setdes] =useState(location.state.description);
    const [price,setprice] =useState(location.state.price);
    const [imageurls,setimageurls] =useState(location.state.imageurls);


    const putUrl = `http://localhost:8070/package/update/${id}`;

    const navigate = useNavigate();

    const data = {

      packageid,
      name,
      items,
      description,
      price,
      imageurls,

    }
      

    function handleSubmit(e){
        e.preventDefault();
        
        axios.put(putUrl, data).then(() => {
            alert("Item Successfully updated");
        }).catch((err) => {
            alert(err);
            console.log("error");
        })

        navigate("/allpackages");
    }


  return (
    <div className='packageupdate'>
      <SideNavBar/>
      
    <div class="packageupdatebg">

    <div class="addpackageupdateheader">
    
    <h1>Update Package</h1>

    
    <div className="packageupdatecontainer">
    
    
    <form class="selectpackageupdateform">
      
    
        <div class="form-group">
          <b><label for="id">ID</label></b><br></br>
          <input value={id} type="text" readOnly/>
        </div>
    
    
        <div class="form-group">
         <b> <label for="packageid">PackageID</label></b><br></br>
         <input onChange={(e)=> {setpackid(e.target.value)}} value={packageid} type="text" required/>
        </div>
    
    
        <div class="form-group">
         <b> <label for="name">Name</label></b><br></br>
         <input onChange={(e)=> {setname(e.target.value)}} value={name} type="text" required/>
        </div>
    
    
        <div class="form-group">
         <b> <label for="items">Items</label></b><br></br>
         <input onChange={(e)=> {setitems(e.target.value)}} value={items} type="text" required/>
        </div>
    
        <div class="form-group">
         <b> <label for="description">Description</label></b><br></br>
         <input onChange={(e)=> {setdes(e.target.value)}} value={description} type="text" required/>
        </div>
    
        <div class="form-group">
         <b> <label for="imageurls">Image URL</label></b><br></br>
         <input onChange={(e)=> {setimageurls(e.target.value)}} value={imageurls} type="text" required/>
        </div>
    

        <div class="form-group">
         <b> <label for="price">Price</label></b><br></br>
         <input onChange={(e)=> {setprice(e.target.value)}} value={price} type="text" required/>
        </div>
    
    
      
    <div class="addpackageupdatebutton">
    
    <button onClick={handleSubmit} className='hall_submit_btn' type='submit'>Update</button>
    
    </div> 
    
      
    
    </form>
    
    </div>
    
    </div>
    
    </div>

    </div>
  )
}

