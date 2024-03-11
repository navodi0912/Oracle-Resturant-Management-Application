import React,{useState} from "react";
import axios from "axios";
import './Addpackage.css'
import { useNavigate } from "react-router-dom";
import SideNavBar from "../../components/sidenavbar/sideNavBar";

export default function AddPackage(){

  const [packageid,setpackid] =useState("");
  const [name,setname] =useState("");
  const [items,setitems] =useState("");
  const [price,setprice] =useState("");
  const [imageurls,setimageurls] =useState("");
  const [error,seterror] =useState("");
  
  const navigate = useNavigate();
  



  function sendData(e){

        e.preventDefault();
        
        const newPackage = {

          packageid,
          name,
          items,
          price,
          imageurls,
          
        
        }

    if(packageid.length==0||name.length==0||items.length==0||price.length==0){
      
          seterror(true)
    }

    else{
      
     axios.post("http://localhost:8070/package/add",newPackage).then(()=>{

     alert("Package Added")

     

     }).catch((err)=>{

      alert(err)
     })

     navigate('/allpackages')
     
  }}

return(
<div class="packagemain">

<SideNavBar/>

<div class="packagebg">

<div class="addpackageheader">

<h1>Add Package</h1>


<div className="packagecontainer">



<form class="selectpackageform">

    <div class="form-group-id">
      <b><h5>Package ID</h5></b>
      <input type="text" class="form-control" id="packageid" placeholder="Enter Package ID" 
      onChange={(e)=> {

        setpackid(e.target.value);

      }}
      />
    </div>

    {error&&packageid.length<=0?
    <label>PackageID cannot be empty!</label>:""}


    <div class="form-group-name">
      <b><h5>Package Name</h5></b>
      <input type="text" class="form-control" id="name" placeholder="Enter Package Name"
      onChange={(e)=> {

        setname(e.target.value);

      }}
      />
    </div>

    {error&&name.length<=0?
    <label>Package Name cannot be empty!</label>:""}

    <div class="form-group-items">
     <b> <h5>Items Names</h5></b>
      <input type="text" class="form-control" id="items" placeholder="Enter Items"
      
      onChange={(e)=> {

        setitems(e.target.value);

      }}

      />
    </div>

    {error&&items.length<=0?
    <label>Items cannot be empty!</label>:""}


    <div class="form-group-price">
     <b> <h5>Price</h5></b>
      <input type="text" class="form-control" id="price" placeholder="Enter Price"
      
      onChange={(e)=> {

        setprice(e.target.value);

      }}

      />
    </div>

    {error&&price.length<=0?
    <label>Price cannot be empty!</label>:""}


    <div class="form-group-url">
     <b> <h5>Image URL</h5></b>
      <input type="text" class="form-control" id="imageurls" placeholder="Enter URL"
      
      onChange={(e)=> {

        setimageurls(e.target.value);

      }}

      />
    </div>

    {error&&imageurls.length<=0?
    <label>URLs cannot be empty!</label>:""}



  
<div class="addpackagebutton">

<a href=""><button onClick={sendData} type="button" class="btn btn-submit" >Add Package</button></a>

</div> 

  

</form>

</div>

</div>

</div>

</div>
)

}