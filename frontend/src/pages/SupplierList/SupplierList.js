import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './SupplierList.css';
import { useReactToPrint } from 'react-to-print';
import { Link, useNavigate } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SideNavBar from '../../components/sidenavbar/sideNavBar';

export default function SupplierList(){
    const [supplies, setSupplies] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [showForm, setShowForm] = React.useState(false);

    console.log(search.toLowerCase());
    
    React.useEffect(() => {
        //fetch all data to the table
        function getSupplies() {
            axios.get("http://localhost:8070/supplier/").then((res) => {
                setSupplies(res.data);
                console.log(res.data)
            }).catch((err) => {
                console.log(err.message);
            })
        }
        getSupplies();
    }, [])

    function deleteSupplier(id){
        
        axios.delete('http://localhost:8070/supplier/delete/'+id)
            .then(()=>{
                alert("Deleted Successfully");
                
                // setdeletebtn((prev)=>!prev)

                const newrecords = supplies.filter( (el)=> el._id != id);
                setSupplies(newrecords);

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
        <div id="supplier-list">
        <SideNavBar/>
        <div className="supplies">
        <div className="SupplierList-div" ref={componentRef}>
        <section className="pt-5 mt-5 container">
            <h1 className="font-weight-bold pt-5">Supplier List</h1>
            <hr></hr>
        </section>

        <button id="addSupplierBtn" className="btn" onClick={()=>navigate(`/addSupplier`)}>Add New Supplier</button>

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
<input className="form-control me-2" id="searchBar" type="search" placeholder="Search by supplier name" onChange={(e) => setSearch(e.target.value)} aria-label="Search" />
<button className="btn btn-outline-success" id="searchBtn" type="submit">Search</button>
</form>


<section id="supplierlist-container" className="container my-5">
<table className="table table-striped" width="100%" id="supplier-table">
    <thead id="thead">
        <tr>
            <td id="thead-data">Supplier Name</td>
            <td id="thead-data">Contact No</td>
            <td id="thead-data">Address</td>
            <td id="thead-data">Email</td>
            <td id="thead-data">Products</td>
            <td id="thead-data">Operations</td>
        </tr>
    </thead>
    <tbody id="tbody">
    {
supplies.filter((object) => {
    return search.toLowerCase() == ''?object: object.SupplierName.toLowerCase().includes(search)
}).map((object)=>
    <tr key={object._id}>
        <td id="tbody-data">{object.SupplierName}</td>
        <td id="tbody-data">{object.ContactNo}</td>
        <td id="tbody-data">{object.Address}</td>
        <td id="tbody-data">{object.Email}</td>
        <td id="tbody-data">{object.Products}</td>
        <td><Link to={`/updateSupplier/${object._id}`}><i id="editIcon" onClick={()=>navigate(`/updateSupplier/${object._id}`)}><BorderColorIcon /></i></Link><a href="#"><i id="trashIcon" onClick={()=>{deleteSupplier(object._id)}}><DeleteForeverIcon /></i></a></td>
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
);

}





