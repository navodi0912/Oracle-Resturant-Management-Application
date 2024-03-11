import React, { useEffect, useState } from "react";
import axios from "axios";
import './UpdateEmployee.css';
import { useNavigate, useParams } from "react-router-dom";
import SideNavBar from "../../components/sidenavbar/sideNavBar";


export default function EmployeeForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id);

    const [employee, setEmployee] = useState({
            // email:'',
            // password:'',
            name:'',
            designation:'',
            address:'',
            gender:'',
            phone:'',
            salary:'',
    })

    
    console.log(employee)

    function onchange(e){
        setEmployee(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }


    React.useEffect(() => {
        function fetchAllData() {
            axios.get('http://localhost:8070/employee/get/'+id)
            .then((res) => {
                setEmployee(res.data.employee)
            }).catch((err) => {
                console.log(err);
            })
        }
        fetchAllData();
    },[]);

    function updateEmployeeData(e) {
        e.preventDefault();
        
        axios.put("http://localhost:8070/employee/update/"+id, employee)
        .then((res)=> {
            alert('Updated Successfully')
            navigate(`/admin_employee_list`)
        }).catch((err)=> {
            console.log(err);
        });
    }

    
    const [showForm, setShowForm] = React.useState(false);

    return (
        <div className="EmployeeForm-div">
            <SideNavBar/>
        <div className = 'popup active'>
        <form className="form" onSubmit={updateEmployeeData}>

            <h2>Update Employee</h2>
                <div class="form-floating col-md-12">
                    <input type="text" className="form-control" name="name" value={employee.name} onChange={onchange} placeholder="Employee Name" required/>
                </div>
                <div class="form-floating col-md-12">
                    <select id="inputState" className="form-select" name="designation" value={employee.designation} onChange= {onchange} required>
                        <option selected>Vetor</option>
                        <option>Chef</option>
                        <option>Cashier</option>
                        <option>Deliver Person</option>
                    </select>
                </div>
                <div class="form-floating col-md-12">
                    <input type="text" className="form-control" id="address" placeholder="Address"
                    name="address" value={employee.address} onChange= {onchange}required/>
                </div>
                <div class="form-floating col-md-12">
                    <select id="inputState" className="form-select" name="gender" placeholder="Gender" value={employee.gender} onChange= {onchange}>
                        <option selected>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div class="form-floating col-md-12">
                    <input type="number" className="form-control" id="phone"
                    name="phone" placeholder="Contact No" value={employee.phone} onChange= {onchange}required/>
                </div>
                <div class="form-floating col-md-12">
                    <input type="text" className="form-control" id="salary" placeholder="Basic Salary"
                    name="salary" value={employee.salary} onChange= {onchange} />
                </div>
                
    
    <div className="form-element">
    <button className = "btnUpdate"> Update </button>
    </div>
</form>
</div>
</div>
);
}