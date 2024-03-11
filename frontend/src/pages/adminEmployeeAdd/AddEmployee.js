import React,{useState}  from "react";
import axios from "axios";
import './AddEmployee.css';
import SideNavBar from "../../components/sidenavbar/sideNavBar";

export default function AddEmployee(){

    const postUrl = "http://localhost:8070/employee/add";
    
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("Vetor");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("Male");
    const [phone, setPhone] = useState(0);
    const [salary, setSalary] = useState("0");


    /*The function used to submit the data to the backen*/
    function handleSubmit(e){
        e.preventDefault();
        const newEmployee = {
            // email,
            // password,
            name,
            designation,
            address,
            gender,
            phone,
            salary
        }

        axios.post(postUrl, newEmployee).then(() => {
            alert("Employee Successfully added");
        }).catch((err) => {
            alert(err);
            console.log("error");
        })

    }

    function preventDef(event){
        event.preventDefault();
        
    }
    return(
        <div className="add-employee">
            <SideNavBar/>
            <div className="employees">
            <form class="AddEmployeeForm" onSubmit={handleSubmit}>
                <h2>Enter Employee Details</h2>
                {/* <div class="form-control">
                    <label className="label" for="email">Email</label>
                    <input class="form-control" type="email" placeholder="youremail@gmail.com" id="email" name="email" onChange={(e)=> {setEmail(e.target.value)}}required/>
                </div>
                <div class="form-control">
                    <label className="label" for="password">Password</label>
                    <input class="form-control" value={password} type="password" placeholder="***********" id="password" name="password"onChange={(e)=> {setPassword(e.target.value)}}required/>
                </div> */}
                <div class="form-control">
                    <label for="name" class="label">Name :</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter Employee Name"
                    onChange={(e)=> {setName(e.target.value)}}required />
                </div>
                <div class="form-control">
                    <label for="designation" class="label">Designation :</label>
                    <select id="inputState" class="form-select"onChange={(e)=> {setDesignation(e.target.value)}}required >
                        <option selected>Vetor</option>
                        <option>Chef</option>
                        <option>Cashier</option>
                        <option>Deliver Person</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="address" class="label">Address :</label>
                    <input type="text" class="form-control" id="address" placeholder="1234 Main St"
                    onChange={(e)=> {setAddress(e.target.value)}} required/>
                </div>
                <div class="form-control">
                    <label for="gender" class="label">Gender :</label>
                    <select id="inputState" class="form-select"onChange={(e)=> {setGender(e.target.value)}} >
                        <option selected>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="phone" class="label">Contact No. :</label>
                    <input type="number" class="form-control" id="phone"
                    onChange={(e)=> {setPhone(e.target.value)}}required/>
                </div>
                <div class="form-control">
                    <label for="salary" class="label">Basic Salary :</label>
                    <input type="text" class="form-control" id="salary" placeholder="RS.50,000/-"
                    onChange={(e)=> {setSalary(e.target.value)}} />
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" onclick={handleSubmit} class="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
        </div>
    )
}