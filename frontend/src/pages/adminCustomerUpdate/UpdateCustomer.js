import React, { useEffect, useState } from "react";
import axios from "axios";
import './UpdateCustomer.css';
import { useNavigate, useParams } from "react-router-dom";
import SideNavBar from "../../components/sidenavbar/sideNavBar";


export default function UpdateCustomer(){
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id);

    const [customer, setCustomer] = useState({
        CustomerName:'',
        ContactNo:'',
        Address:'',
        Email:'',
        FullName:'',
    })

    
    console.log(customer)

    function onchange(e){
        setCustomer(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }


    React.useEffect(() => {
        function fetchAllData() {
            axios.get('http://localhost:8070/customer/get/'+id)
            .then((res) => {
                setCustomer(res.data.customer)
            }).catch((err) => {
                console.log(err);
            })
        }
        fetchAllData();
    },[]);

    function updateCustomerData(e) {
        e.preventDefault();
        
        axios.put("http://localhost:8070/customer/update/"+id, customer)
        .then((res)=> {
            alert('Updated Successfully')
            navigate(`/admin_customer_list`)
        }).catch((err)=> {
            console.log(err);
        });
    }

    
    const [showForm, setShowForm] = React.useState(false);

    return (
        <div className="CustomerForm-div">
            <SideNavBar/>
        <div className = 'popup active'>
        <form className="form" onSubmit={updateCustomerData}>

            <h2>Update Customer</h2>
            <div class="form-floating col-md-12">
                    <input type="text" className="form-control" name="CustomerName" value={customer.CustomerName} onChange={onchange} placeholder="Customer Name" required/>
                    <label for="floatingContact">Username</label>
                </div>
                <div class="form-floating col-md-12">
                    <input type="text" className="form-control" name="ContactNo" value={customer.ContactNo} onChange={onchange} placeholder="Contact Number" required/>
                    <label for="floatingContact">Contact Number</label>
                </div>
                <div class="form-floating col-12">
                    <input type="text" className="form-control" name="Address" value={customer.Address}  onChange={onchange} placeholder="Address" required/>
                    <label for="floatingAddress">Delivery Address</label>
                </div>
                <div class="form-floating col-12">
                    <input type="email" className="form-control" name="Email" value={customer.Email}  onChange={onchange} placeholder="Customer Email" required/>
                    <label for="floatingEmail">Email</label>
                </div>
                <div class="form-floating col-12">
                    <input type="text" className="form-control" name="FullName" value={customer.FullName}  onChange={onchange} placeholder="Full Name" required/>
                    <label for="FullName">Full Name</label>
                </div>
                
    
    <div className="form-element">
    <button className = "btnUpdate"> Update </button>
    </div>
</form>
</div>
</div>
);
}