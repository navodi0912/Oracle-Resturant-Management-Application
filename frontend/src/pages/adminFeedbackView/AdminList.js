import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './AdminList.css';
import { useReactToPrint } from 'react-to-print';
import { Link, useNavigate } from "react-router-dom";
import SideNavBar from "../../components/sidenavbar/sideNavBar";

export default function AdminList(){
    const [feedbacks, setFeedbacks] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [showForm, setShowForm] = React.useState(false);

    console.log(search.toLowerCase());
    
    React.useEffect(() => {
        //fetch all data to the table
        function getFeedbacks() {
            axios.get("http://localhost:8070/feedback/admin").then((res) => {
                setFeedbacks(res.data);
                console.log(res.data)
            }).catch((err) => {
                console.log(err.message);
            })
        }
        getFeedbacks();
    }, [])
    const navigate = useNavigate();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        onAfterPrint: ()=> alert('Report Generated Successfully')
    });
        return (
            <div className="adminFeedbackList">
            <SideNavBar/>
            <div className="feedbacks">
            <div className="feedbackList-div" ref={componentRef}>
                <section className="pt-5 mt-5 container">
                    <h2 className="font-weight-bold pt-5" id="AList">Admin List</h2>
                    <hr id="ALhr"></hr>
                </section>

                <form className="d-flex" role="search">
                    <input className="form-control me-2" id="AsearchBar" type="search" placeholder="Search by customer name" onChange={(e) => setSearch(e.target.value)} aria-label="Search" />
                    <button className="btn btn-outline-success" id="AsearchBtn" type="submit">Search</button>
                </form>
                

                <section id="Fadminlist-container" className="container my-5">
                    <table className="table table-striped" width="100%">
                        <thead>
                            <tr>
                                <td>Customer Name</td>
                                <td>E-mail Address</td>
                                <td>Contact Number</td>
                                <td>Feedback</td>
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
                                </tr>
                            )
                        }
                            
                        </tbody>
                    </table>
                </section>
            </div>

             <div className="report-div"> 
                <button type="button" className="btn" id="ALreportBtn" onClick={handlePrint}>Generate Report</button>
            </div>
            </div>
            </div>
        );

}






