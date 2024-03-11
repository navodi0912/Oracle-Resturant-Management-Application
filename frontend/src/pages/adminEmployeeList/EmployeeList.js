import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './EmployeeList.css';
import { useReactToPrint } from 'react-to-print';
import { Link, useNavigate } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SideNavBar from "../../components/sidenavbar/sideNavBar";
;

export default function EmployeeList(){
    const [employees, setEmployees] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [showForm, setShowForm] = React.useState(false);

    console.log(search.toLowerCase());
    
    React.useEffect(() => {
        //fetch all data to the table
        function getEmployees() {
            axios.get("http://localhost:8070/employee/").then((res) => {
                setEmployees(res.data);
                console.log(res.data)
            }).catch((err) => {
                console.log(err.message);
            })
        }
        getEmployees();
    }, [])

    function deleteEmployee(id){
        
        axios.delete('http://localhost:8070/employee/delete/'+id)
            .then(()=>{
                alert("Deleted Successfully");

                const newrecords = employees.filter( (el)=> el._id != id);
                setEmployees(newrecords);

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
        <div className="employee-list">
        <SideNavBar/>
        <div className="employees">
        <div className="EmployeeList-div" ref={componentRef}>
        <section className="pt-5 mt-5 container">
            <h2 className="font-weight-bold pt-5">Employee List</h2>
            <hr></hr>
        </section>

        <button id="addEmployeeBtn" className="btn" onClick={()=>navigate(`/admin_employee_add`)}>Add New Employee</button>

<form className="d-flex" role="search">
<input className="form-control me-2" id="searchBar" type="search" placeholder="Search by employee name" onChange={(e) => setSearch(e.target.value)} aria-label="Search" />
<button className="btn btn-outline-success" id="searchBtn" type="submit">Search</button>
</form>


<section id="supplierlist-container" className="container my-5">
<table className="table table-striped" width="100%">
    <thead>
        <tr>
            <td>Employee Name</td>
            <td>Designation</td>
            <td>Address</td>
            <td>Contact No.</td>
            <td>Gender</td>
            <td>Salary</td>
            <td>Operations</td>
        </tr>
    </thead>
    <tbody>
    {
employees.filter((object) => {
    return search.toLowerCase() == ''?object: object.name.toLowerCase().includes(search)
}).map((object)=>
    <tr key={object._id}>
        <td>{object.name}</td>
        <td>{object.designation}</td>
        <td>{object.address}</td>
        <td>{object.phone}</td>
        <td>{object.gender}</td>
        <td>{object.salary}</td>
        <td><Link to={`/admin_employee_update/${object._id}`}><i id="editIcon" onClick={()=>navigate(`/admin_employee_update/${object._id}`)}><BorderColorIcon /></i></Link><a href="#"><i id="trashIcon" onClick={()=>{deleteEmployee(object._id)}}><DeleteForeverIcon /></i></a></td>
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