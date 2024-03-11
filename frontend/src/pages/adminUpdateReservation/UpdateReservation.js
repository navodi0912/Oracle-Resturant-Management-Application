import React, {useRef, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateReservation.css'
import SideNavBar from "../../components/sidenavbar/sideNavBar";

export default function UpdateReservation(props) {
  ;
    const location = useLocation();

    const [id, setId] = useState(location.state._id);
    const [nic,setnic] =useState(location.state.nic);
    const [name,setname] =useState(location.state.name);
    const [phonenumber,setphonenumber] =useState(location.state.phonenumber);
    const [hall,sethall] =useState(location.state.hall);
    const [pack,setpack] =useState(location.state.pack);
    const [date,setdate] =useState(location.state.date);
    

    const putUrl = `http://localhost:8070/approvedreservation/update/${id}`;

    const navigate = useNavigate();

    const data = {

      nic,
      name,
      phonenumber,
      hall,
      pack,
      date,

    }
      

    function handleSubmit(e){
        e.preventDefault();
        
        axios.put(putUrl, data).then(() => {
            alert("Item Successfully updated");
        }).catch((err) => {
            alert(err);
            console.log("error");
        })

        navigate("/allreservations");
    }


  return (

    <div className='reservationupdate'>
      <SideNavBar/>

    <div class="reservationupdatebg">

    <div class="addreservationupdateheader">
    
    <h1>Update Reservation</h1>
    
    <div className="reservationupdatecontainer">
    
    
    <form class="selectreservationupdateform">
      
    
        <div class="form-group">
          <b><label for="name">NIC</label></b><br></br>
          <input onChange={(e)=> {setnic(e.target.value)}} value={nic} type="text" required/>
        </div>

        <div class="form-group">
          <b><label for="name">Customer Name</label></b><br></br>
          <input onChange={(e)=> {setname(e.target.value)}} value={name} type="text" required/>
        </div>
    
    
        <div class="form-group">
         <b> <label for="phonenumber">Phone Number</label></b><br></br>
         <input onChange={(e)=> {setphonenumber(e.target.value)}} value={phonenumber} type="number" required/>
        </div>
    
    
        <div class="form-group">
         <b> <label for="hall">Hall</label></b><br></br>
         <input onChange={(e)=> {sethall(e.target.value)}} value={hall} type="text" required/>
        </div>
    
    
        <div class="form-group">
         <b> <label for="pack">Package</label></b><br></br>
         <input onChange={(e)=> {setpack(e.target.value)}} value={pack} type="text" required/>
        </div>
    
        <div class="form-group">
         <b> <label for="date">Date</label></b><br></br>
         <input onChange={(e)=> {setdate(e.target.value)}} value={date} type="text" required/>
        </div>
    
    
      
    <div class="addreservationupdatebutton">
    
    <button onClick={handleSubmit} className='hall_submit_btn' type='submit'>Update</button>
    
    </div> 
    
      
    
    </form>
    
    </div>
    
    </div>
    
    </div>

    </div>
  )
}

