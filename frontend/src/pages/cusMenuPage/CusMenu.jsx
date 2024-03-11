import React from 'react';
import './cusMenu.css';
import FixedNav from '../../components/fixednavbar/FixedNav';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import CallIcon from '@mui/icons-material/Call';
import LocationOn from '@mui/icons-material/LocationOn';
import WatchLater from '@mui/icons-material/WatchLater';
import Description from '@mui/icons-material/Description';
import FloatNav from '../../components/floatnav/FloatNav';
import { useState, useEffect, useContext } from 'react';
import MenuDisplay from '../../components/menudisplay/MenuDisplay';
import MobileNavBar from '../../components/mobilenavbar/MobileNavBar';
import Footer from '../../components/footer/footer';

import { ItemContext } from '../../context/items-context';


export default function CusMenu() {
	const { continueFetch,getDatabase, getDefaultCart, returnDatabase, PRODUCTS } = useContext(ItemContext);
	const [passedPoint, setPassesPoint] = useState(false);
	// const [PRODUCTS, setPRODUCTS] = useState([]);
	const [pageLoaded, setPageLoaded] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(()=> {
	getDatabase();
	setPageLoaded(true);
  }, [])

  useEffect(()=>{
	getDefaultCart();
	console.log("PRODUCTS changed");
  }, [PRODUCTS])

  function handleScroll(event){
	setScrollPosition(event.target.scrollTop);
  }

//   if(scrollPosition > 50 && continueFetch && pageLoaded){
// 	getDefaultCart();
//   }



  return (
    <section className='menuMain' onScroll={handleScroll} style={{pointerEvents: `${pageLoaded} ? 'none' : 'initial'`}}>
      <div className="introduction">
		<MobileNavBar selectedPage = {"Menu"}/>
        <FixedNav selectedPage = {"Menu"}/>
        <FloatNav selectedPage = {"Menu"} scrollPosition={scrollPosition}/>
        <div className="overlay"></div>
        <div className="intro_topic_con">
          <h1 className='introTopic'>OUR MENU</h1>
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
      <MenuDisplay scrollPosition={scrollPosition}/>
	  <Footer/>
    </section>
  )
}
