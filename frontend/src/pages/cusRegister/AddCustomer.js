import React,{useState}  from "react";
import axios from "axios";
import './AddCustomer.css';
import Footer from "../../components/footer/footer";
import FixedNav from "../../components/fixednavbar/FixedNav";

export default function AddCustomer(){

    const postUrl = "http://localhost:8070/Customer/add";
    
    const [CustomerName,setCustomerName] = useState('');
    // const [password,setPassword] = useState('');
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [ContactNo, setContactNo] = useState(0);


    /*The function used to submit the data to the backend*/

    function handleSubmit(e){
        e.preventDefault();
        const newCustomer = {
            CustomerName,
            ContactNo,
            Address,
            Email,
            FullName
        }

        axios.post(postUrl, newCustomer).then(() => {
            alert("Customer Successfully added");
        }).catch((err) => {
            alert(err);
            console.log("error");
        })

    }

    function preventDef(event){
        event.preventDefault();
        
    }

    /*function convertToBase64(file){
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }*/

    

    return(
        <div classname="customers">
        <FixedNav/>
        <div className="customermain">

        <div className="add-customers"> 
            <form class="AddCustomerForm" onSubmit={handleSubmit}>
                <h2>Enter Customer Details</h2>

                <div class="form-control">
                    <label for="CustomerName" class="label">Username :</label>
                    <input type="text" class="form-control" id="CustomerName" placeholder="Enter Customer User Name"
                    onChange={(e)=> {setCustomerName(e.target.value)}} />
                </div>

                <div class="form-control">
                    <label for="ContactNo" class="label">Contact No :</label>
                    <input type="number" class="form-control" id="ContactNo" placeholder="0751231234"
                    onChange={(e)=> {setContactNo(e.target.value)}}/>
                </div>

                <div class="form-control">
                    <label for="Address" class="label">Address :</label>
                    <input type="text" class="form-control" id="Address" placeholder="1234, Main St, Colombo"
                    onChange={(e)=> {setAddress(e.target.value)}} />
                </div>

                <div class="form-control">
                    <label className="label" for="email">Email :</label>
                    <input class="form-control" type="email" placeholder="youremail@gmail.com" id="email" name="email" 
                    onChange={(e)=> {setEmail(e.target.value)}}/>
                </div>

                <div class="form-control">
                    <label for="FullName" class="label">FullName :</label>
                    <input type="text" class="form-control" id="FullName" placeholder="Samantha Perera"
                    onChange={(e)=> {setFullName(e.target.value)}} />
                </div>



                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" onclick={handleSubmit} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        </div>
        <Footer/>
        </div>
    )
}

