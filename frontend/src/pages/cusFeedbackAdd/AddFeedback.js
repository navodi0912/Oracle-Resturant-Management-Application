import React,{useState,} from "react";
import axios from "axios";
import './AddFeedback.css';
import { Link, useNavigate } from "react-router-dom";



export default function AddFeedback(){

     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [number, setNumber] = useState("");
     const [feedback, setFeedback] = useState("");



       function sendData(e){
          e.preventDefault();

          const newFeedback ={
               name,
               email,
               number,
               feedback
          }
     
          axios.post("http://localhost:8070/feedback/add",newFeedback).then(()=>{

     alert("Feedback Added")
     console.log(newFeedback)
          }).catch((err)=>{
              alert(err)
          })
        
      }

      const [showForm, setShowForm] = React.useState(false);

    return(
        <div className="FLAadd">
        <div className = 'FLApopup active'>
        <div className="FLAclose-btn" onClick={()=>setShowForm(false)}>&times;</div>
        <form className="form" onSubmit={sendData}>
        <h1 id="FLAheader">FEEDBACK FORM</h1>
         
        <div className="FLAform-element">
        <label for="name">Customer Name</label>
        <input type="text" class="form-control" id="name" placeholder="Enter Customer Name"  onChange={(e)=> { setName(e.target.value);}}/>
        </div>

        <div className="FLAform-element">
        <label for="email">Email address</label>
        <input type="text" className="form-control" id="email"  placeholder="name@example.com"  onChange={(e)=> { setEmail(e.target.value);}}/>
        </div>

        <div className="FLAform-element">
        <label for="number">Phone Number</label>
        <input type="text" className="form-control" id="number"  placeholder="+94 XXX XXX XXX"  onChange={(e)=> {setNumber(e.target.value);}}/>
        </div>

        <div className="FLAform-element">
        <label for="feedback">Feedback</label>
        <textarea className="form-control" id="FLAfeedback" rows="3"  onChange={(e)=> {setFeedback(e.target.value);}}></textarea>
        </div>

        <div className="FLAform-element"> 
            <a href=""><button onClick={sendData} type="button" className="FLAdd" >Add Feedback</button></a>
         </div>
         <div className="FLAform-element">
           <a href="/cus_feedback_view"><button type="button" className="FLAdd" >View Feedback List</button></a>
         </div>
        </form>
        </div>
        </div>
    );
}