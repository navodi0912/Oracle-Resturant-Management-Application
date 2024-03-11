import React, {useState,useEffect} from 'react'
import axios from 'axios'
import './AllHalls.css'
import { Link } from 'react-router-dom';
import SideNavBar from "../../components/sidenavbar/sideNavBar";

function AllHalls() {

    const[halls,sethalls]= useState([]);

    useEffect(()=>{

function getHalls(){

    axios.get("http://localhost:8070/hall/").then((res)=>{
        
    sethalls(res.data);

    }).catch((err)=>{

        alert(err.message);
    })
}

    getHalls();

    },[])


    function handleDelete(id){
        const deleteUrl = `http://localhost:8070/hall/delete/${id}`;
        axios.delete(deleteUrl).then((res)=>{
            alert("Successfully deleted");
          }).catch((err)=> {
            console.log(err);
          })
    }


  return (
    <div className='allhalls'>
    <SideNavBar/>   
    <div className="allhallscontainer" >

    <h1>All Halls</h1><br></br>

    <div className="row" > 

    <div class="searchhall">
      
    </div>
    </div>

    <div className="allhallsCard">
    <table className="halltable"> 
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Facilities</th>
            <th scope="col">Description</th>
            <th scope="col">Rent Per Day</th>
            <th scope="col">Image URL</th>
            <th scope="col"></th>
            <th scope="col"></th>

        </tr>
    </thead>
    <tbody>

    {halls.map((halls)=>(

   
        <tr>
            
            <td>{halls.name}</td>
            <td>{halls.facility}</td>
            <td>{halls.description}</td>
            <td>{halls.rentperday}</td>
            <td>{halls.imageurls}</td>
            <td>

            
           <div class="hallupdate">
           <Link to = "/updatehall" state={{_id: halls._id, name:halls.name, facility: halls.facility, description:halls.description, rentperday: halls.rentperday, imageurls: halls.imageurls}} href="/addhall"><button type="button" class="btnhallupdate" >Update</button></Link>
            </div>
            </td>
            <td>
            <div class="halldelete">
            <button onClick={()=> {handleDelete(halls._id)}} type="button" class="btnhalldelete" >Delete</button>
            </div>

            </td>
        
        </tr>
        


    ))}
</tbody>

</table>

        </div>
        </div>
        </div>
  )
}

export default AllHalls