import React from 'react'
import { useState, useEffect } from 'react';
import './floatnav.css'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import logo from '../fixednavbar/assets/NewLogoPng.png';
import { Link } from 'react-router-dom';

export default function FloatNav({scrollPosition, selectedPage}) {

  return (
    <nav className={`navbarDark ${scrollPosition > 20 ? 'active' : null}`}> 
        <Link to={"/"} className='Logo'>
            <img className='logoImage' src={logo} alt="Logo Image" />
        </Link>
        <ul className="navPages">
            <li className={`navPage ${selectedPage == 'Home' ? 'active' : null}`}><Link to={"/"} href="">HOME</Link></li>
            <li className={`navPage ${selectedPage == 'Menu' ? 'active' : null}`}><Link to={"/customer_menu"} href="">MENU</Link></li>
            {/* <li className={`navPage ${selectedPage == 'About' ? 'active' : null}`}><Link to={"/about_us"}>ABOUT</Link></li> */}
            <li className={`navPage ${selectedPage == 'Contact' ? 'active' : null}`}><Link to={"/cus_feedback_add"}>CONTACT</Link></li>
            <li className={`navPage ${selectedPage == 'Event' ? 'active' : null}`}><Link to={"/event"}>EVENT</Link></li>
            {/* <li className="navPage shopping"><a href=""><ShoppingCartRoundedIcon sx={{ fontSize: 20 }}/></a></li> */}
            <li className="navPage shopping"><Link to={"/cus_register"}><AccountCircleOutlinedIcon sx={{ fontSize: 30 }}/></Link></li>
        </ul>
      </nav>
  )
}
