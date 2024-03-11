import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './PendingReservation.css'
// import SideNavBar from './sideNavBar';


function PendingReservation() {

    const[reserves,setreserves]= useState([]);
    const [search, setsearch]= useState("");
   

    useEffect(()=>{

function getReserves(){

    axios.get("http://localhost:8070/reservation/").then((res)=>{
        
    setreserves(res.data);

    }).catch((err)=>{

        alert(err.message);
    })
}

    getReserves();

    },[])

    function handleDelete(id){
        const deleteUrl = `http://localhost:8070/reservation/delete/${id}`;
        axios.delete(deleteUrl).then((res)=>{
            alert("Successfully deleted");
          }).catch((err)=> {
            console.log(err);
          })
          

    }

    

    

  return (

    <div className="allpendingreservationscontainer" >
        {/* <SideNavBar/> */}

    <h1>Pending Reservations</h1><br></br>

    <div className="row" > 

    <div class="allpendingreservationsclass">

        <input type="text" placeholder='Search.......' className="search"
        
        />

    </div> 

    </div>

    <div class="allpendingreservationsCard">
    <table className="pendingtable"> 
        <tr>
            <th scope="col">NIC</th>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Hall</th>
            <th scope="col">Package</th>
            <th scope="col">Date</th>
            <th scope="col">Total</th>
            <th scope="col"></th>
            <th scope="col"></th>

        </tr>

    {reserves.map((reserves)=>(

   
        <tr>
        
            <td>{reserves.nic}</td>
            <td>{reserves.name}</td>
            <td>{reserves.phonenumber}</td>
            <td>{reserves.hall}</td>
            <td>{reserves.pack}</td>
            <td>{reserves.date}</td>
            <td>{reserves.hallPackagePri}</td>
            <td>
            <Link to = "/approveform" state={{_id: reserves._id, nic:reserves.nic, name: reserves.name, phonenumber:reserves.phonenumber, hall: reserves.hall, pack: reserves.pack, date: reserves.date }}><button type="button" class="btn btn-primary" >Approve</button></Link>
            </td>
            <td>
            <button onClick={()=> {handleDelete(reserves._id)}} type="button" class="btn btn-danger" >Decline</button>
            </td>
        
        </tr>
        


    ))}


</table>


        </div>
        </div>
  )
}

export default PendingReservation