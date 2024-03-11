import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './delivery-list.css';
import { useReactToPrint } from 'react-to-print';
import { Link, useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SideNavBar from '../../components/sidenavbar/sideNavBar';

export default function DeliveryList(){
    const [deliveries, setDeliveries] = useState([]);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);

    console.log(search.toLowerCase());
    
    useEffect(() => {
        //fetch all data to the table
        function getDeliveries() {
            axios.get("http://localhost:8070/delivery/").then((res) => {
                setDeliveries(res.data);
                console.log(res.data)
            }).catch((err) => {
                console.log(err.message);
            })
        }
        getDeliveries();
    }, [])

    function deleteDelivery(id){
        
        axios.delete('http://localhost:8070/delivery/delete/'+id)
            .then(()=>{
                alert("Deleted Successfully");

                const newrecords = deliveries.filter( (el)=> el._id != id);
                setDeliveries(newrecords);

            }).catch((err)=>{
                console.log(err);
            });
    }


    const navigate = useNavigate();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        onAfterPrint: ()=> alert('Report Generated Successfully')
    });
        return (
            <div className="delivery-list">
            <SideNavBar />
            <div className="deliveries">
            <div className="deliveryList-div" ref={componentRef}>
                <section className="pt-5 mt-5 container">
                    <h1 className="font-weight-bold pt-5">Delivery List</h1>
                    <hr></hr>
                </section>

                <form className="d-flex" role="search">
                    <input className="form-control me-2" id="searchBar" type="search" placeholder="Search by customer name" onChange={(e) => setSearch(e.target.value)} aria-label="Search" />
                    <button className="btn btn-outline-success" id="searchBtn" type="submit">Search</button>
                </form>
                

                <section id="deliverylist-container" className="container my-5">
                    <table className="table table-striped" width="100%" id="delivery-table">
                        <thead id="thead">
                            <tr>
                                <td id="thead-data">Customer Name</td>
                                <td id="thead-data">Contact Number</td>
                                <td id="thead-data">Delivery Address</td>
                                <td id="thead-data">Delivery Rider</td>
                                <td id="thead-data">Operations</td>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                        {
                            deliveries.filter((object) => {
                                return search.toLowerCase() == ''?object: object.cusName.toLowerCase().includes(search)
                            }).map((object)=>
                                <tr key={object._id}>
                                    <td id="tbody-data">{object.cusName}</td>
                                    <td id="tbody-data">{object.cusContact}</td>
                                    <td id="tbody-data">{object.delAddress}</td>
                                    <td id="tbody-data">{object.delRider}</td>
                                    {/* <td><Link to={`/assignDriver/${object._id}`}><i id="editIcon" onClick={()=>navigate(`/assignDriver/${object._id}`)} className="fas fa-pen-alt"></i></Link><a href="#"><i id="trashIcon" className="fas fa-trash-alt" onClick={()=>{deleteDelivery(object._id)}}></i></a></td> */}
                                    <td><a id="editIcon" onClick={()=>navigate(`/admin_delivery_update/${object._id}`)}><BorderColorIcon /></a><a href="#" id="trashIcon" onClick={()=>{deleteDelivery(object._id)}}><DeleteForeverIcon /></a></td>
                                </tr>
                            )
                        }
                            
                        </tbody>
                    </table>
                </section>
            </div>
            <div>
                <button type="button" className="btn" id="reportBtn" onClick={handlePrint}>Generate Report</button>
            </div>
            </div>
            </div>
        );

}






