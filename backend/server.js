//assigning variables and importing the dependencies installed
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

//photo upload
const fileUpload = require('express-fileupload')

//Routes
app.get("/", (req, res) => {
    res.send("Home Page");
})

//defining the port numbers (if 8070 is not available, assign any available port number)
const PORT = process.env.PORT || 8070;


//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// photo upload middleware
app.use(fileUpload());

// Serve the uploaded images from the public directory
app.use('/images', express.static('public/images'));

//connecting the database
const URL = process.env.MONGODB_URL;

//mongoDB configurations
mongoose.connect(URL, {
    
});

//accesing the deliveries.js
const deliveryRouter = require("./routes/deliveries");

app.use("/delivery" , deliveryRouter)

/*--------- Binoosh ---------*/

// Access the menu.js routes file
const menuRouter = require("./routes/menu.js");

// Access the orderstaff.js routes file
const orderstaffRouter = require("./routes/orderstaff.js");

// Access the orderadmin.js routes file
const orderadminRouter = require("./routes/orderadmin.js");

app.use("/menu", menuRouter);
app.use("/order/staff", orderstaffRouter);
app.use("/order/admin", orderadminRouter);

/*--------- Binoosh ---------*/

/*--------- Moksha ---------*/

const supplierRouter = require("./routes/Suppliers.js");
app.use("/supplier",supplierRouter);

/*--------- banula ---------*/

const feedbackRouter = require("./routes/feedback.js");
app.use("/feedback",feedbackRouter);

/*------------ Navodi ---------- */

const employeeRouter = require("./routes/employee.js");
app.use("/employee",employeeRouter);

/*------------ Chenura ---------- */

const reservationRouter = require("./routes/reservation");
app.use("/reservation",reservationRouter);

const approvedReservationRouter = require("./routes/approvedreservation");
app.use("/approvedreservation",approvedReservationRouter);

const packageRouter = require("./routes/package");
app.use("/package",packageRouter);

const hallRouter = require("./routes/hall");
app.use("/hall",hallRouter);

/*------------ Sahan ---------- */
const customerRouter = require("./routes/customers.js")
app.use("/customer", customerRouter);

//creating the connection
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Success")
})

//run this in the port
app.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`)
})