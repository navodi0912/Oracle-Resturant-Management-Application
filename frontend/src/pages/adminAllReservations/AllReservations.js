import React, {useState,useEffect} from 'react'
import axios from 'axios'
import './AllReservations.css'
import { Link } from 'react-router-dom';
import SideNavBar from "../../components/sidenavbar/sideNavBar";


function AllReservations() {

    const[reserves,setreserves]= useState([]);
    const [search, setSearch]= useState("");

    useEffect(()=>{

function getReserves(){

    axios.get("http://localhost:8070/approvedreservation/").then((res)=>{
        
    setreserves(res.data);

    }).catch((err)=>{

        alert(err.message);
    })
}

    getReserves();

    },[])

    function handleDelete(id){
        const deleteUrl = `http://localhost:8070/approvedreservation/delete/${id}`;
        axios.delete(deleteUrl).then((res)=>{
            alert("Successfully deleted");
          }).catch((err)=> {
            console.log(err);
          })
          

    }
 

  return (

    <div className='allreservations'>
        <SideNavBar/> 

    <div className="allreservationscontainer" >
         
    <h1>All Reservations</h1><br></br>

    <div className="row" > 

    <div class="allreservationsclass">

        <input type="text" onChange={(e) => setSearch(e.target.value)}placeholder='Enter NIC' className="search"
        
        />

    </div> 

    </div>

    <div class="allreservationsCard">
    <table className="table"> 
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

        {

    reserves.filter((reserve)=>{
        return search.toLowerCase()==''?reserve:reserve.nic.toLowerCase().includes(search)
        
        
    }).map((reserve)=>

   
        <tr>
        
            <td>{reserve.nic}</td>
            <td>{reserve.name}</td>
            <td>{reserve.phonenumber}</td>
            <td>{reserve.hall}</td>
            <td>{reserve.pack}</td>
            <td>{reserve.date}</td>
            <td>{reserve.hallPackagePri}</td>

            <td>
            <Link to = "/updatereservation" state={{_id: reserve._id, nic:reserve.nic, name: reserve.name, phonenumber:reserve.phonenumber, hall: reserve.hall, pack: reserve.pack, date: reserve.date,hallPackagePri:reserve.hallPackagePri}} ><button type="button" >Update</button></Link>
            </td>
            <td>
            <button onClick={()=> {handleDelete(reserve._id)}} type="button">Delete</button>
            </td>
        
        </tr>
        


    )}


</table>

        </div>


        <a href="/addreservation"><button type="button" class="btn_addreservation" >Add Reservation</button></a>

        </div>

        </div>
  )
}

export default AllReservations