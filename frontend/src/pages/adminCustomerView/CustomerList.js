import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './CustomerList.css';
import { useReactToPrint } from 'react-to-print';
import { Link, useNavigate } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SideNavBar from "../../components/sidenavbar/sideNavBar";

export default function CustomerList(){
    const [customers, setCustomers] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [showForm, setShowForm] = React.useState(false);

    console.log(search.toLowerCase());
    
    React.useEffect(() => {
        //fetch all data to the table
        function getCustomers() {
            axios.get("http://localhost:8070/customer/").then((res) => {
                setCustomers(res.data);
                console.log(res.data)
            }).catch((err) => {
                console.log(err.message);
            })
        }
        getCustomers();
    }, [])

    function deleteCustomer(id){
        
        axios.delete('http://localhost:8070/customer/delete/'+id)
            .then(()=>{
                alert("Deleted Successfully");
                
                // setdeletebtn((prev)=>!prev)

                const newrecords = customers.filter( (el)=> el._id != id);
                setCustomers(newrecords);

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
        <div className="customers-list">
            <SideNavBar/>
        <div className="customers">
        <div className="CustomerList-div" ref={componentRef}>
        <section className="pt-5 mt-5 container">
            <h2 className="font-weight-bold pt-5">Customer List</h2>
            <hr></hr>
        </section>

        {/* <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link to={'/'} className="finalList">View Final Deliveries</Link>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search by Contact No." aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav> */}

<form className="d-flex" role="search">
<input className="form-control me-2" id="searchBar" type="search" placeholder="Search by customer name" onChange={(e) => setSearch(e.target.value)} aria-label="Search" />
<button className="btn btn-outline-success" id="searchBtn" type="submit">Search</button>
</form>


<section id="supplierlist-container" className="container my-5">
<table className="table table-striped" width="100%">
    <thead>
        <tr>
            <td>User Name</td>
            <td>Contact No.</td>
            <td>Address</td>
            <td>Email</td>
            <td>Full Name</td>
            <td>Operations</td>
        </tr>
    </thead>
    <tbody>
    {
customers.filter((object) => {
    return search.toLowerCase() == ''?object: object.CustomerName.toLowerCase().includes(search)
}).map((object)=>
    <tr key={object._id}>
        <td>{object.CustomerName}</td>
        <td>{object.ContactNo}</td>
        <td>{object.Address}</td>
        <td>{object.Email}</td>
        <td>{object.FullName}</td>
        <td> <i id="editIcon" onClick={()=>navigate(`/admin_customer_update/${object._id}`)}><BorderColorIcon /></i> <a href="#"><i id="trashIcon" onClick={()=>{deleteCustomer(object._id)}}><DeleteForeverIcon /></i></a></td>
    </tr>
    )
    }
                
    </tbody>
    </table>
    </section>
</div>

{/* <div className="report-div"> */}
    <button type="button" className="btn" id="reportBtn" onClick={handlePrint}>Generate Report</button>
{/* </div> */}
</div>
</div>
</>
);

}