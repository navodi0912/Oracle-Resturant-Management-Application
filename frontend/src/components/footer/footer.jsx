import React from "react";
import './footer.css';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer=()=> {
        return (
            <div className="footer">
                <div className="sb_footer section_padding">
                    <div className="sb_footer-links">
                        <div className="sb_footer-links-div">
                            <h4>Resources</h4>
                            <a href="/">
                                <p>Home</p>
                            </a>
                            <a href="/customer_menu">
                                <p>Menu</p>
                            </a>
                            <a href="/event">
                                <p>Event Reservations</p>
                            </a>
                            <a href="/cus_feedback_add">
                                <p>Feedback</p>
                            </a>
                            <a href="/admin_employee_list">
                                <p>Administration</p>
                            </a>
                        </div>
                        <div className="sb_footer-links-div">
                            <h4>Opening Hours</h4>
                            <p>Mon-Fri 11am-11pm</p>
                            <p>Sat-Sun 9am-11pm</p>
                        </div>
                        <div className="sb_footer-links-div">
                            <h4>Contact Us</h4>
                            <p>No. 1106, Pannipitiya Road, Battaramulla.</p>
                            <p>Tel: 011-2345678</p>
                        </div>
                        <div className="sb_footer-links-div">
                            <h4>Coming soon on</h4>
                            <div className="social-names">
                                <a href="https://www.facebook.com/" className="links"><FacebookOutlinedIcon /></a>
                                <a href="https://www.instagram.com/" className="links"><InstagramIcon /></a>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="sb_footer-below">
                        <div className="sb_footer-copyright">
                            <p>
                                &copy;{new Date().getFullYear()} Oracle Restaurant. All rights reserved.
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
}


export default Footer;