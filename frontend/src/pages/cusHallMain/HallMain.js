import React, {useState,useEffect} from 'react'
import axios from 'axios'
import './HallMain.css'
import FixedNav from '../../components/fixednavbar/FixedNav';
import Footer from '../../components/footer/footer';


function HallMain() {

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


  return (
    <div>
        <FixedNav/>
        
    <div class="hallmain">


    <div class="heading">

        <h1>Select Hall</h1>
        <h3>As you Like</h3>

    </div>

<div className="row">


{halls.map((halls)=>(


    <div class="card" >

<div class="hallimg">

<img src={halls.imageurls[0]}/>

</div>


<div class="card-body">

<h5 class="card-title"><h4><b><center>{halls.name}</center></b></h4></h5>

<p class="card-text"><h6><b>Facilities:</b></h6>{halls.facility}</p>

</div>

<div class="desandrentbody">
<ul class="list-group list-group-flush">

<li class="list-group-item"><h6><b>Description:</b></h6>{halls.description}</li>
<li class="list-group-item"><h6><b>Rent Per Day:</b></h6>{halls.rentperday}</li>

</ul>

</div>

<div class="booknowbutton">
<center><a href="/add" class="card-link"><button class="btn btn-primary"type="button">Book now</button></a></center> 




</div>

</div>


))}


</div>  


</div>  
<Footer/>      
</div>
   
    
  )
}

export default HallMain