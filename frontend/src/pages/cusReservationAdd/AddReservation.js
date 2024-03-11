import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import './AddReservation.css'
import Footer from '../../components/footer/footer';
import FixedNav from '../../components/fixednavbar/FixedNav';



export default function AddReservation(){

  const location = useLocation();

  const [nic,setid] =useState("");
  const [name,setname] =useState("");
  const [phonenumber,setphonenumber] =useState("");
  const [hall,sethall] =useState("");
  const [pack,setpack] =useState("");
  const [date,setdate] =useState("");
  const [price,setprice] =useState("");
  const [error,seterror] =useState("");
  const[packages,setpackages]= useState([]);
  const[hallPrice,setHallPrice]=useState(0);
  const[packagePrice,setPackagePrice]=useState(0);
  const[hallPackagePri,setHallPackagePri]=useState(0);
  
  

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


  function sendData(e){

        e.preventDefault();
        
        const newReservation = {

          nic,
          name,
          phonenumber,
          hall,
          pack,
          date,
          hallPackagePri,
        }

    if(nic.length==0||name.length==0||phonenumber.length==0||hall.length==0||date.length==0){
      
      seterror(true)
    }
    
    else {
        
        seterror(false)

        axios.post("http://localhost:8070/reservation/add",newReservation).then(()=>{
   
        alert("Pending Reservation Added")
   
        
   
        }).catch((err)=>{
   
         alert(err)
        })
   
    
    
  }}

  function packageHallTotal(){
    var grandTotal=hallPrice + packagePrice;
    setHallPackagePri(grandTotal)
  }

  console.log(pack);
  console.log(hall);

return(
<div>
  
< FixedNav/>

<div className="bg">

<div className="addreservationheader">

<h1>Add Reservations</h1>


<div className="reservationcontainer">

<form class="reservationsform" >

    <div class="form-group">
      <b><h5>NIC</h5></b>
      <input type="text" minLength={10} maxLength={12} class="form-control" id="nic" placeholder="Enter NIC Number" 
      onChange={(e)=> {

        setid(e.target.value);

      }}
      required
      />
    </div>
    {error&&nic.length<=0?
      <label>NIC cannot be empty!</label>:""}

    <div class="form-group">
      <b><h5>Customer Name</h5></b>
      <input type="text" class="form-control" id="name" placeholder="Enter your Name"
      onChange={(e)=> {

        setname(e.target.value);

      }}
      />
    </div>

    {error&&name.length<=0?
    
    <label>Name cannot be empty!</label>:""}

  
    <div class="form-group">
     <b> <h5>Contact Number</h5></b>
      <input type="text" class="form-control" id="phonenumber" placeholder="Enter your Contact Number"
      
      onChange={(e)=> {

        setphonenumber(e.target.value);

      }}

      />
    </div>
    {error&&phonenumber.length<=0?
    <label>PhoneNumber cannot be empty!</label>:""}


    <div class="form-group">
      <b><h5>Date</h5></b>
      <input type="date" class="form-control" id="date" placeholder="Select Date"
      
      onChange={(e)=> {

        setdate(e.target.value);

      }}

      />
    </div>
    {error&&date.length<=0?
    <label>Date cannot be empty!</label>:""}



    <div class="form-group">
      <b><h5>Select Hall</h5></b><br></br>

      <select id="hall" class="halloptions" 
      
      onChange={(e)=> {
        
          const selectedIndex = e.target.selectedIndex
        setHallPrice(e.target.value);
        sethall(e.target[selectedIndex].getAttribute('hallName'))
        setHallPackagePri(Number(e.target.value) + Number(packagePrice))
        console.log(hallPrice);

}}
      >
        <option selected>Choose your Hall</option>
        <option hallName={'Party Room 1'} value={5000}>Party Room 1</option>
        <option hallName={'Party Room 2'} value={12000}>Party Room 2</option>

      </select>
      
      <a href="/hallmain"><button type="button" class="btn btn-submithall" ><b>View Halls</b></button></a>

    </div>
    {error&&hall.length<=0?
    <label>You must choose a Hall</label>:""}


    <div class="form-group">
      <b><h5>Select Package</h5></b><br></br>

      <select id="pack" class="packageoptions" 
      
      onChange={(e)=> {
        
        const selectedIndex = e.target.selectedIndex
        setPackagePrice(e.target.value);
        setpack(e.target[selectedIndex].getAttribute('packName'))
        // packageHallTotal();
        // console.log(packagePrice);
      

        setHallPackagePri(Number(e.target.value) + Number(hallPrice))
  
  }}
      >
        <option selected>Choose your Package</option>

{packages.map((packages)=>(

        
     <option packName={packages.name} value={packages.price}>{packages.name} </option>


 ))}


      </select>

      <a href="/packagemain"><button type="button" class="btn btn-submitpackage" ><b>View Packages</b></button></a>

    </div>

    <div class="form-group">

    <b> <h3>Total Price:</h3></b>

    <input type="text" class="form-control" id="price" value={hallPackagePri}
    

      />
 
    </div>  


<div class="addreservation"> 

<button onClick={sendData} type="button" class="btn btn-submit" >Add Reservation</button>

</div> 

  

</form>

</div>

</div>

</div>

<Footer />

</div>

)

}