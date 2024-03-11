import React,{useState} from "react"
import './Event.css'
import FixedNav from '../../components/fixednavbar/FixedNav';

export default function Event(){

return(
<div>
<FixedNav selectedPage = {"Event"}/>
<div class="eventbg">

<div class="eventcontainer">

<h1> Event Management System</h1>

<div class="eventsquare1">

<div class="eventtitle1">
<center><h3><b>Book your Table Now</b></h3>

<div class="addreserv">
<a href="/addreservation"><button type="submit" class="btn btn-primary" ><b>Add Reservation</b></button></a>
</div>

</center>
</div>

</div>



</div>

</div>

</div>

    )

}