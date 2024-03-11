import React, { useEffect, useState } from "react";
import axios from "axios";
import "./deliveryForm.css";
import SideNavBar from "../../components/sidenavbar/sideNavBar";
import { useNavigate, useParams } from "react-router-dom";

export default function DeliveryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const [delivery, setDelivery] = React.useState({
    cusName: "",
    cusContact: "",
    delAddress: "",
    delRider: "",
  });
  const [employee, setEmployee] = useState([{}]);


  console.log(employee);

  function onchange(e) {
    setDelivery((prevData) => {
      const { name, value } = e.target;
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  React.useEffect(() => {
    function fetchAllData() {
      axios
        .get("http://localhost:8070/delivery/get/" + id)
        .then((res) => {
          setDelivery(res.data.delivery);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("http://localhost:8070/employee")
        .then((res) => {
          setEmployee(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchAllData();
  }, []);

  function updateDeliveryData(e) {
    e.preventDefault();

    axios
      .put("http://localhost:8070/delivery/update/" + id, delivery)
      .then((res) => {
        navigate(`/admin_delivery_list`);
        alert("Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [showForm, setShowForm] = React.useState(false);

  return (
    <>
      <SideNavBar />
      <div className="delForm-div">
        <div className="popup active">
          <form className="form" onSubmit={updateDeliveryData}>
            <h2>Assign a Delivery Rider</h2>
            <div className="form-element">
              <label for="cusName">Customer Name</label>
              <input
                type="text"
                name="cusName"
                value={delivery.cusName}
                onChange={onchange}
                placeholder="Enter Customer Name"
                disabled
              />
            </div>
            <div className="form-element">
              <label for="cusContact">Conatct Number</label>
              <input
                type="text"
                name="cusContact"
                value={delivery.cusContact}
                onChange={onchange}
                placeholder="Enter Contact Number"
                maxLength={9}
                minLength={9}
                required
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
            <div className="form-element">
              <label for="address">Delivery Address</label>
              <input
                type="text"
                name="delAddress"
                value={delivery.delAddress}
                onChange={onchange}
                placeholder="Enter Delivery Address"
              />
            </div>
            <div className="form-element">
              <label for="driver">Delivery Rider</label>
              <select name="delRider" required onClick={onchange}>
                <option defaultValue selected hidden>
                  Select Delivery Rider...
                </option>
                {employee
                  .filter((obj) => {
                    if (obj.designation == "Deliver Person") {
                      return obj;
                    }
                  })
                  .map((obj) => {
                    return <option value={obj.name}>{obj.name}</option>;
                  })}
              </select>
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
