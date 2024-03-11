import React, { useEffect, useState } from "react";
import axios from "axios";
import './UpdateSupplier.css';
import { useNavigate, useParams } from "react-router-dom";
import SideNavBar from "../../components/sidenavbar/sideNavBar";


export default function UpdateForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id);

    const [supplier, setSupplier] = useState({
        SupplierName:'',
        ContactNo:'',
        Address:'',
        Email:'',
        Products:'',
    })

    console.log(supplier)

    function onchange(e){
        setSupplier(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }


    React.useEffect(() => {
        function fetchAllData() {
            axios.get('http://localhost:8070/supplier/get/'+id)
            .then((res) => {
                setSupplier(res.data.supplier)
            }).catch((err) => {
                console.log(err);
            })
        }
        fetchAllData();
    },[]);

    function updateSupplierData(e) {
        e.preventDefault();
        
        axios.put("http://localhost:8070/supplier/update/"+id, supplier)
        .then((res)=> {
            alert('Updated Successfully')
            navigate(`/Supplier`)
        }).catch((err)=> {
            console.log(err);
        });
    }

    const [showForm, setShowForm] = React.useState(false);

    return (
        <>
        <SideNavBar/>
        <div className="SupplierForm-div">   
        <div className = 'popup active'>
        <form className="form" onSubmit={updateSupplierData}>
            <h2>Update Supplier</h2>
            <div class="form-floating col-md-12">
                    <input type="text" className="form-control" name="SupplierName" value={supplier.SupplierName} onChange={onchange} placeholder="Supplier Name" required/>
                    <label for="floatingName">Supplier Name</label>
                </div>
                <div class="form-floating col-md-12">
                    <input type="text" className="form-control" name="ContactNo" value={supplier.ContactNo} onChange={onchange} placeholder="Contact Number" required/>
                    <label for="floatingContact">Contact Number</label>
                </div>
                <div class="form-floating col-12">
                    <input type="text" className="form-control" name="Address" value={supplier.Address}  onChange={onchange} placeholder="Address" required/>
                    <label for="floatingAddress">Supplier Address</label>
                </div>
                <div class="form-floating col-12">
                    <input type="email" className="form-control" name="Email" value={supplier.Email}  onChange={onchange} placeholder="Supplier Email" required/>
                    <label for="floatingEmail">Supplier Email</label>
                </div>
                <div class="form-floating col-12">
                    <input type="text" className="form-control" name="Products" value={supplier.Products}  onChange={onchange} placeholder="Products" required/>
                    <label for="floatingProducts">Products</label>
                </div>
                
    
    <div className="form-element">
        <button className="btnUpdate">Update</button>
    </div>
</form>
</div>
</div>
</>
);
}
