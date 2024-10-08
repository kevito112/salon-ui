import React from 'react';
import './footer.css';
import locationIcon from '../../assets/images/location.png';
import phoneIcon from '../../assets/images/phone.png';
import yelpIcon from '../../assets/images/yelp.png';
import emailIcon from '../../assets/images/email.png';
import instagramIcon from '../../assets/images/instagram.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="main-footer">
                <div className="main-footer-content">
                    <div className="footer-section left">
                        <div className= "left-content">
                           <h2>contact info</h2>
                            <div className="footer-item location">
                                 <img src={locationIcon} alt="Location" className="location-icon" />
                                 <span>961 Crandon Blvd, Key Biscayne, FL 33149</span>
                            </div>
                            <div className="footer-item email">
                                 <img src={emailIcon} alt="Email" className="email-icon" />
                                 <span>lashesaffair@gmail.com</span>
                            </div>
                            <div className="footer-item phone">
                                 <img src={phoneIcon} alt="Phone" className="phone-icon" />
                                 <span>305-846-6823</span>
                            </div>
                        </div>
                    </div>
                    <div className="footer-section right">
                       <h2>stay in touch</h2>
                       <span>Follow me on all my socials below for any future updates.</span>
                       <br></br>
                       <a href="https://www.instagram.com/keybeautybyyeny/" target="_blank" rel="noopener noreferrer" className="social-link instagram-link">
                           <img src={instagramIcon} alt="Instagram" className="instagram-icon" />
                       </a>
                       <a href="https://www.yelp.com/biz/key-beauty-by-yenys-miami" target="_blank" rel="noopener noreferrer" className="social-link yelp-link">
                           <img src={yelpIcon} alt="Yelp" className="yelp-icon" />
                       </a>
                    </div>
                </div>
            </div>
            <div className="mini-footer">
                <p>Copyrights {new Date().getFullYear()} All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;