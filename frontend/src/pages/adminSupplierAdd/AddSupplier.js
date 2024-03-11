import React, {useState} from "react";
import axios from "axios";
import './AddSupplier.css';
import '/node_modules/bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import SideNavBar from "../../components/sidenavbar/sideNavBar";

export default function AddSupplier() {

    // const [cusName, setName] = useState("");
    // const [cusContact, setContact] = useState("");
    // const [delAddress, setAddress] = useState("");

    const navigate = useNavigate();

    const [supplier, setSupplier] = useState({
        SupplierName:'',
        ContactNo:'',
        Address:'',
        Email:'',
        Products:'',
    })

    // function sendData(e) {
    //     e.preventDefault();

    //     const newDelivery = {
    //         cusName,
    //         cusContact,
    //         delAddress
    //     }
        
    //     axios.post("http://localhost:8070/delivery/add", newDelivery).then(()=>{
    //         alert("Delivery Placed")
    //         setName("");
    //         setContact("");
    //         setAddress("");
    //     }).catch((err)=>{
    //         alert(err)
    //     })
    // }



    function onchange(e){
        setSupplier(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }


    function sendData(e) {
        e.preventDefault();
        
        axios.post("http://localhost:8070/supplier/add", supplier).then(()=>{
            alert("supplier added");
            navigate(`/Supplier`)
            setSupplier({
                SupplierName:'',
                ContactNo:'',
                Address:'',
                Email:'',
                Products:'',
            })
        }).catch((err)=>{
            alert(err)
        })
    }



    return (
        <div>
            <SideNavBar />
        <div className="AddSupplierForm">
            <form className="row g-3" onSubmit={sendData}> 
                <h3>Enter your supplier details</h3>
                <div class="form-floating col-md-12">
                    <input type="text" className="form-control" name="SupplierName" value={supplier["SupplierName"]} onChange={onchange} placeholder="Supplier Name" required/>
                    <label for="floatingName" id="suplabel">Supplier Name</label>
                </div>
                <div class="form-floating col-md-12">
                    <input type="text" className="form-control" name="ContactNo" value={supplier["ContactNo"]} onChange={onchange} placeholder="Contact Number" required/>
                    <label for="floatingContact" id="suplabel">Contact Number</label>
                </div>
                <div class="form-floating col-12">
                    <input type="text" className="form-control" name="Address" value={supplier["Address"]}  onChange={onchange} placeholder="Address" required/>
                    <label for="floatingAddress" id="suplabel">Supplier Address</label>
                </div>
                <div class="form-floating col-12">
                    <input type="email" className="form-control" name="Email" value={supplier["Email"]}  onChange={onchange} placeholder="Supplier Email" required/>
                    <label for="floatingEmail" id="suplabel">Supplier Email</label>
                </div>
                <div class="form-floating col-12">
                    <input type="text" className="form-control" name="Products" value={supplier["Products"]}  onChange={onchange} placeholder="Products" required/>
                    <label for="floatingProducts" id="suplabel">Products</label>
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button className="btn" type="submit" id="proceedBtn">Proceed</button>
                </div>
                
            </form>
        </div>
        </div>
    )


}