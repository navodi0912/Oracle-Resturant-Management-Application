import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './FeedbackList.css';
import { useReactToPrint } from 'react-to-print';
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import FixedNav from "../../components/fixednavbar/FixedNav";
import Footer from "../../components/footer/footer";

export default function FeedbackList(){
    const [feedbacks, setFeedbacks] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [showForm, setShowForm] = React.useState(false);

    console.log(search.toLowerCase());
    
    React.useEffect(() => {
        //fetch all data to the table
        function getFeedbacks() {
            axios.get("http://localhost:8070/feedback/").then((res) => {
                setFeedbacks(res.data);
                console.log(res.data)
            }).catch((err) => {
                console.log(err.message);
            })
        }
        getFeedbacks();
    }, [])

    function deleteFeedback(id){
        
        axios.delete('http://localhost:8070/feedback/delete/'+id)
            .then(()=>{
                alert("Deleted Successfully");
                
                // setdeletebtn((prev)=>!prev)

                const newrecords = feedbacks.filter( (el)=> el._id != id);
                setFeedbacks(newrecords);

                // navigate('/');
            }).catch((err)=>{
                console.log(err);
            });
        //console.log("hello "+id);
    }


    const navigate = useNavigate();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        onAfterPrint: ()=> alert('Report Generated Successfully')
    });
        return (
            <>
            <FixedNav/> 
            <body id="FLbody">
            <div className="feedbacks">
            <div className="feedbackList-div" ref={componentRef}>
                <section className="pt-5 mt-5 container">
                    <h2 className="font-weight-bold pt-5" id="Ffblist">Feedback List</h2>
                    <hr id="FLhr"></hr>
                </section>

                <form className="d-flex" role="search">
                    <input className="form-control me-2" id="FsearchBar" type="search" placeholder="Search by customer name" onChange={(e) => setSearch(e.target.value)} aria-label="Search" />
                    <button className="btn btn-outline-success" id="FsearchBtn" type="submit">Search</button>
                </form>
                

                <section id="feedbacklist-container" className="container my-5">
                    <table className="table table-striped" width="100%">
                        <thead>
                            <tr>
                                <td>Customer Name</td>
                                <td>E-mail Address</td>
                                <td>Contact Number</td>
                                <td>Feedback</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            feedbacks.filter((object) => {
                                return search.toLowerCase() == ''?object: object.name.toLowerCase().includes(search)
                            }).map((object)=>
                                <tr key={object._id}>
                                    <td>{object.name}</td>
                                    <td>{object.email}</td>
                                    <td>{object.number}</td>
                                    <td>{object.feedback}</td>
                                    <td><Link to={`/cus_feedback_update/${object._id}`}><i id="FLupdateIcon" onClick={()=>navigate(`/cus_feedback_update/${object._id}`)} className="fas fa-pen-alt"><UpdateIcon/></i></Link><a href="#"><i id="FLDeleteIcon" className="fas fa-trash-alt" onClick={()=>{deleteFeedback(object._id)}}><DeleteIcon/></i></a></td>

                                </tr>
                            )
                        }
                            
                        </tbody>
                    </table>
                </section>
            </div>
            </div>
            </body>
            <Footer/>
            </>
        );

}






