import React, {useState,useEffect} from 'react'
import axios from 'axios'
import './PackageMain.css'
import FixedNav from '../../components/fixednavbar/FixedNav';
import Footer from '../../components/footer/footer';


function PackageMain() {

    const[packages,setpackages]= useState([]);

    useEffect(()=>{

function getPackages(){

    axios.get("http://localhost:8070/package/").then((res)=>{
        
    setpackages(res.data);

    }).catch((err)=>{

        alert(err.message);
    })
}

    getPackages();

    },[])

  return (
<div className='packagemainfixnav'>
  
<FixedNav/>

    <div className='packagemainheader'>

  
<div class="packagemain">


    <div className="row">


 {packages.map((packages)=>(


<div class="packagemaincard" >

<h5 class="card-title"><h4><b><center>{packages.name}</center></b></h4></h5>

  <div class="card-body">

    <div class="packageimg">
    <img class="card-img-top" src={packages.imageurls[0]}/>
    </div><br></br>

  
  </div>

  <ul class="list-group list-group-flushpackage">

    <li class="list-group-item"><h6><b>Items:</b></h6>{packages.items}</li>
    <li class="list-group-item"><h6><b>Price:</b></h6>Rs:{packages.price}</li>
  
  </ul>


  
  </div>

   
))}
  
 
    
  </div>  

  
    </div>   
           
    </div>    
    <Footer/>
    </div>
    
  )
}

export default PackageMain