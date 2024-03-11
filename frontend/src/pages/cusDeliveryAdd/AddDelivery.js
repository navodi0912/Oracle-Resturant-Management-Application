import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddDelivery.css";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import Footer from "../../components/footer/footer";
import FixedNav from "../../components/fixednavbar/FixedNav";


export default function AddDelivery() {

  const navigate = useNavigate();
  const [delivery, setDelivery] = useState({
    cusName: "",
    cusContact: "",
    delAddress: "",
  });


  function onchange(e) {
    setDelivery((prevData) => {
      const { name, value } = e.target;
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function sendData(e) {
    e.preventDefault();

    axios
      .post("http://localhost:8070/delivery/add", delivery)
      .then(() => {
        alert("Delivery Placed");
        navigate(`/customer_menu`);
        setDelivery({
          cusName: "",
          cusContact: "",
          delAddress: "",
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="add-delivery">
      <FixedNav />
      <div className="delivery_form_con">
        <div className="AddDeliveryForm">
          <form className="row g-3" onSubmit={sendData}>
            <h3 id="heading">Enter Your Delivery Details</h3>
            <div class="form-floating col-md-6">
              <input
                type="text"
                className="form-control"
                name="cusName"
                value={delivery["cusName"]}
                onChange={onchange}
                placeholder="Name"
                required
              />
              <label for="floatingName" id="label">
                Full Name
              </label>
            </div>
            <div class="form-floating col-md-6">
              <input
                type="tel"
                className="form-control"
                name="cusContact"
                value={delivery["cusContact"]}
                onChange={onchange}
                placeholder="Contact Number"
                maxLength={10}
                minLength={10}
                required
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <label for="floatingContact" id="label">
                Contact Number
              </label>
            </div>
            <div class="form-floating col-12">
              <input
                type="text"
                className="form-control"
                name="delAddress"
                value={delivery["delAddress"]}
                onChange={onchange}
                placeholder="Address"
                required
              />
              <label for="floatingAddress" id="label">
                Delivery Address
              </label>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
              <button className="btn" type="submit" id="confirmBtn">
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
