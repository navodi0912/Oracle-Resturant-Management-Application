import React, {useState,useEffect} from 'react'
import axios from 'axios'
import './AllPackages.css'
import { Link } from 'react-router-dom';
import SideNavBar from "../../components/sidenavbar/sideNavBar";

function AllPackages() {

    const[packages,setpackages]= useState([]);
    const[id,setid] =useState("");
    const[search,setSearch] =useState("");

    

    useEffect(()=>{

function getPackages(){

    axios.get(`http://localhost:8070/package/`).then((res)=>{
        
    setpackages(res.data);

    }).catch((err)=>{

        alert(err.message);
    })
}

    
    getPackages();


    },[])

   
    function handleDelete(id){
        const deleteUrl = `http://localhost:8070/package/delete/${id}`;
        axios.delete(deleteUrl).then((res)=>{
            alert("Successfully deleted");
          }).catch((err)=> {
            console.log(err);
          })
    }

   
  return (
    <div className='allpackages'>
    <SideNavBar/>  
    <div class="allpackagescontainer">
  

    <h1>All Packages</h1>

   <div className="row" > 
   <div class="allpackagessearch">
        <input type="search"  onChange={(e) => setSearch(e.target.value)} placeholder='Enter Name' className="search"/>
        
    </div>

    </div>
    <div className="allpackagesCard">
    <table className="packagetable"> 
        <tr>
            <th scope="col">Package ID</th>
            <th scope="col">Name</th>
            <th scope="col">Items</th>
            <th scope="col">Price</th>
            <th scope="col">Image URL</th>
            <th scope="col"></th>
            <th scope="col"></th>

        </tr>
{
    packages.filter((packages)=>{
        return search.toLowerCase()==''?packages:packages.name.toLowerCase().includes(search)
        
    }).map((packages)=>
        <tr key={packages._id}>
        
            <td>{packages.packageid}</td>
            <td>{packages.name}</td>
            <td>{packages.items}</td>
            <td>{packages.price}</td>
            <td>{packages.imageurls}</td>
            <td>
            <Link to = "/updatepackage" state={{_id: packages._id, packageId:packages.packageid, name: packages.name, items:packages.items, description: packages.description, price: packages.price, imageurls: packages.imageurls }} href="/addpackage"><button type="button" class="btnpackageupdate" >Update</button></Link>
            </td>
            <td>
            <button onClick={()=> {handleDelete(packages._id)}} type="button" class="btnpackagedelete" >Delete</button>
            </td>
        
        </tr>
        


    )}

         

</table>

</div>

< a href="/addpackage"><button type="button" class="btnpackageadd" >Add Package</button></a>

        </div>

        </div>
  )
}

export default AllPackages