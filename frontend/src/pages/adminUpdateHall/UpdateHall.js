import React, {useRef, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateHall.css'
import SideNavBar from "../../components/sidenavbar/sideNavBar";

export default function UpdateHall(props) {
  ;
    const location = useLocation();

    const [id, setId] = useState(location.state._id);
    const [name,setname] =useState(location.state.name);
    const [rentperday,setrentperday] =useState(location.state.rentperday);
    const [facility,setfacility] =useState(location.state.facility);
    const [description,setdescription] =useState(location.state.description);
    const [imageurls,setimageurls] =useState(location.state.imageurls);


    const putUrl = `http://localhost:8070/hall/update/${id}`;

    const navigate = useNavigate();

    const data = {

      name,
      rentperday,
      facility,
      description,
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

        navigate("/allhalls");
    }


  return (

    <div className='hallupdate'>
      <SideNavBar/>
    <div class="hallupdatebg">

<div class="addhallupdateheader">

<h1>Update Hall</h1>


<div className="hallupdatecontainer">


<form class="selecthallupdateform">
  

    <div class="form-group">
      <b><label for="name">Hall Name</label></b><br></br>
      <input onChange={(e)=> {setname(e.target.value)}} value={name} type="text" required/>
    </div>


    <div class="form-group">
     <b> <label for="facility">Facilities</label></b><br></br>
     <input onChange={(e)=> {setfacility(e.target.value)}} value={facility} type="text" required/>
    </div>


    <div class="form-group">
     <b> <label for="description">Description</label></b><br></br>
     <input onChange={(e)=> {setdescription(e.target.value)}} value={description} type="text" required/>
    </div>


    <div class="form-group">
     <b> <label for="imageurls">Image URL</label></b><br></br>
     <input onChange={(e)=> {setimageurls(e.target.value)}} value={imageurls} type="text" required/>
    </div>

    <div class="form-group">
     <b> <label for="rentperday">Rent Per Day</label></b><br></br>
     <input onChange={(e)=> {setrentperday(e.target.value)}} value={rentperday} type="number" required/>
    </div>


  
<div class="addhallupdatebutton">

<button onClick={handleSubmit} className='hall_submit_btn' type='submit'>Update</button>

</div> 

  

</form>

</div>

</div>

</div>

</div>

  )
}

