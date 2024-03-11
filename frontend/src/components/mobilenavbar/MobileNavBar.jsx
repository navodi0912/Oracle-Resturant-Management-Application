import React from 'react'
import { useState } from 'react';
import logo from '../fixednavbar/assets/NewLogoPng.png';
import './mobilenavbar.css'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';

export default function MobileNavBar({selectedPage}) {

    const [menuBtn, setMenuBtn] = useState(false);

  return (
    <div className='mobileNavBar'>
      <nav className="header">
        <Link to={"/"} className='Logo'>
            <img className='logoImage' src={logo} alt="Logo Image" />
        </Link>
        <div className="menu_icon" onClick={()=> {setMenuBtn(!menuBtn);}}>
            {!menuBtn ? <MenuRoundedIcon sx={{ fontSize: 30 }}/> : <CloseRoundedIcon sx={{ fontSize: 30 }}/>}
        </div>
      </nav>
      <div className={`pages_drawer ${menuBtn ? 'active' : null}`}>
        <ul className={`navPagesMobile`}>
        <li className={`navPage ${selectedPage == 'Home' ? 'active' : null}`}><Link to={"/"} href="">HOME</Link></li>
            <li className={`navPage ${selectedPage == 'Menu' ? 'active' : null}`}><Link to={"/customer_menu"} href="">MENU</Link></li>
            {/* <li className={`navPage ${selectedPage == 'About' ? 'active' : null}`}><Link to={"/about_us"}>ABOUT</Link></li> */}
            <li className={`navPage ${selectedPage == 'Contact' ? 'active' : null}`}><Link to={"/cus_feedback_add"}>CONTACT</Link></li>
            <li className={`navPage ${selectedPage == 'Event' ? 'active' : null}`}><Link to={"/event"}>EVENT</Link></li>
          <li className="navPage shopping"><Link to={"/cus_register"}><AccountCircleOutlinedIcon sx={{ fontSize: 30 }}/></Link></li>
        </ul>
      </div>
    </div>
  )
}
