import React from 'react'
import './home.css'
import Footer from '../../components/footer/footer'
import { Link } from 'react-router-dom'
import CallIcon from '@mui/icons-material/Call';
import LocationOn from '@mui/icons-material/LocationOn';
import WatchLater from '@mui/icons-material/WatchLater';
import Description from '@mui/icons-material/Description';
import { useState, useEffect, useContext } from 'react';
import { ItemContext } from '../../context/items-context';
import FixedNav from '../../components/fixednavbar/FixedNav';
import MobileNavBar from '../../components/mobilenavbar/MobileNavBar';

export default function Home() {
    useEffect(()=> {
        getDatabase();
      }, [])

    const { getDatabase } = useContext(ItemContext);
  return (
    <section className='homepage_main_con'>
      <div className="home_introduction_con">
        <FixedNav selectedPage={"Home"}/>
        <MobileNavBar selectedPage={"Home"}/>
        <div className="home_res_name_con">
          <h1>Oracle</h1>
          <h2>Restaurant</h2>
        </div>
      </div>
      <div className="info_col">
        <div className="individual_info">
	    		<div className="info_icon"><CallIcon sx={{ fontSize: 20 }}/></div>
	    		<div className="info_text">
	    			<h3 className='info_topic'>+94 11 564 6785</h3>
	    			<p className='info_para'>We welcome your feedback on your dining experience at our restaurant. Please don't hesitate to contact us at any time.</p>
	    		</div>
	    	</div>

        <div className="individual_info location_tag">
	    		<div className="info_icon"><LocationOn sx={{ fontSize: 20 }}/></div>
	    		<div className="info_text">
	    			<h3 className='info_topic'>Pannipitiya Battaramulla, Colombo</h3>
	    			<p className='info_para'>We are located at 1106, Pannipitiya Road Battaramulla, Colombo.</p>
	    		</div>
	    	</div>

        <div className="individual_info">
	    		<div className="info_icon"><WatchLater sx={{ fontSize: 20 }}/></div>
	    		<div className="info_text">
	    			<h3 className='info_topic'>Open Monday-Friday</h3>
	    			<p className='info_para'>Our business is open every day of the week, from 7:30am to 11:30pm, to provide you with optimal service.</p>
	    		</div>
	    	</div>

        <div className="individual_info">
	    		<div className="info_icon"><Description sx={{ fontSize: 20 }}/></div>
	    		<div className="info_text">
	    			<h3 className='info_topic'>Learn More About Us</h3>
	    			<p className='info_para'>Are you interested to learn more about our organization?</p>
            <a href="" className='learn_more'>Learn More</a>
	    		</div>
	    	</div>
      </div>
	  <Footer/>
    </section>
  )
}
