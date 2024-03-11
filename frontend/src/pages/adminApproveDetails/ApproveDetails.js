import React, {useRef, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ApprovedForm.css'
import SideNavBar from "../../components/sidenavbar/sideNavBar";

export default function ApproveDetails(props) {
  ;
    const location = useLocation();

    const [id, setId] = useState(location.state._id);
    const [nic,setnic] =useState(location.state.nic);
    const [name,setname] =useState(location.state.name);
    const [phonenumber,setphonenumber] =useState(location.state.phonenumber);
    const [hall,sethall] =useState(location.state.hall);
    const [pack,setpack] =useState(location.state.pack);
    const [date,setdate] =useState(location.state.date);
    const [hallPackagePri,sethallPackagePri] =useState(location.state.hallPackagePri);
    
    

    const postUrl = `http://localhost:8070/approvedreservation/add`;
    const deleteUrl = `http://localhost:8070/reservation/delete/${id}`;

    const navigate = useNavigate();

    const data = {

      nic,
      name,
      phonenumber,
      hall,
      pack,
      date,
      hallPackagePri,

    }
      

    function handleSubmit(e){
        e.preventDefault();
        
        axios.post(postUrl, data).then(() => {
            alert("Added to Approved Reservation");

        axios.delete(deleteUrl, data)  


        }).catch((err) => {
            alert(err);
            console.log("error");
        })

        navigate("/pendingreservations");
    }


  return (

    <div className='approvedreservation'>
      <SideNavBar/>
    <div class="approvedreservationupdatebg">

    <div class="addapprovedreservationupdateheader">
    
    <h1>Approve Form</h1>
    
    <div className="approvedreservationupdatecontainer">
    
    
    <form class="selectapprovedreservationupdateform">
      
    
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

        <div class="form-group">
         <b> <label for="price">Total</label></b><br></br>
         <input onChange={(e)=> {sethallPackagePri(e.target.value)}} value={hallPackagePri} type="text" required/>
        </div>
    
    
      
    <div class="addapprovedreservationupdatebutton">
    
    <button onClick={handleSubmit} className='hall_submit_btn' type='submit'>Approve</button>
    
    </div> 
    
      
    
    </form>
    
    </div>
    
    </div>
    
    </div>

    </div>
  )
}

