import React, { useEffect } from "react";
import axios from "axios";
import './UpdateForm.css';
import { useNavigate, useParams } from "react-router-dom";


export default function FUpdateForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id);

    const [feedback, setFeedback] = React.useState({
        name:'',
        email:'',
        number:'',
        feedback:''
    })

    console.log(feedback)

    function onchange(e){
        setFeedback(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }


    React.useEffect(() => {
        function fetchAllData() {
            axios.get('http://localhost:8070/feedback/get/'+id)
            .then((res) => {
                setFeedback(res.data.feedback)
            }).catch((err) => {
                console.log(err);
            })
        }
        fetchAllData();
    },[]);

    function updateFeedback(e) {
        e.preventDefault();
        
        axios.put("http://localhost:8070/feedback/update/"+id, feedback)
        .then((res)=> {
            alert('Updated Successfully')
            navigate(`/cus_feedback_view`)
        }).catch((err)=> {
            console.log(err);
        });
    }




    const [showForm, setShowForm] = React.useState(false);

    return (
        <body id="FLUbody">
        <div className="FLForm-div">
            <div className = 'FLUpopup active'>
                <div className="FLUclose-btn" onClick={()=>setShowForm(false)}>&times;</div>
                <form className="form" onSubmit={updateFeedback}>
                    <h2 id="FLUpdate">Update Feedback</h2>
                    <div className="FLUform-element">
                        <label for="name">Customer Name</label>
                        <input type="text" name="name" value={feedback.name} onChange={onchange} placeholder="Enter Customer Name" />
                    </div>
                    <div className="FLUform-element">
                        <label for="email">E-mail Address</label>
                        <input type="text" name="email" value={feedback.email} onChange={onchange} placeholder="name@example.com" />
                    </div>
                    <div className="FLUform-element">
                        <label for="number">Contact Number</label>
                        <input type="text" name="number" value={feedback.number} onChange={onchange} placeholder="+94 XXX XXX XXX" />
                    </div>

                    <div className="FLUform-element">
                        <label for="feedback">Feedback</label>
                        <input type="text" name="feedback" value={feedback.feedback} onChange={onchange} />
                    </div>
                    
                    <div className="FLUform-element">
                        <button className="btnUpdate">Update Feedback</button>
                    </div>
                </form>
            </div>
        </div>
        </body>
    );
}
