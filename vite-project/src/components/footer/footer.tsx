import './footer.css';
import locationIcon from '../../assets/images/location.png';
import phoneIcon from '../../assets/images/phone.png';
import yelpIcon from '../../assets/images/yelp.png';
import emailIcon from '../../assets/images/email.png';
import instagramIcon from '../../assets/images/instagram.png';
import whatsappIcon from '../../assets/images/whatsapp.png';
import keybeauty from '../../assets/images/keybeauty.png';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="main-footer">
                    <div className="footer-section first-section">
                            <div className ="footer-items">
                                <a href="/home" className="home-link">
                                     <img src={keybeauty} alt="Key Beauty Logo" className="logo" />
                                </a>
                                <h2>contact info</h2>
                                <div className="footer-item location">
                                     <img src={locationIcon} alt="Location" className="location-icon" />
                                    <a href="geo:25.685220,-80.160910" className="location-link">
                                        <span>961 Crandon Blvd, Key Biscayne, FL 33149</span>
                                    </a>
                                </div>
                                <div className="footer-item email">
                                     <img src={emailIcon} alt="Email" className="email-icon" />
                                     <span>lashesaffair@gmail.com</span>
                                </div>
                                <div className="footer-item phone">
                                     <img src={phoneIcon} alt="Phone" className="phone-icon" />
                                     <a href="tel:305-846-6823" className="phone-num">
                                        <span>305-846-6823</span>
                                     </a>
                                </div>
                            </div>
                    </div>
                    <div className="footer-section second-section">
                       <div className="hours">
                           <h2>hours of operation</h2>
                           <span>Mon - Fri: 9:00am - 5:00pm</span>
                           <br></br>
                           <span>Sat - Sun: Appointment Only w/ Deposit</span>
                       </div>
                       <div className="socials">
                            <h2 className="stay-in-touch">stay in touch</h2>
                            <span className="span-text">Follow me on social media for updates.</span>
                            <br></br>
                            <div className="social-icons">
                                <a href="https://www.instagram.com/keybeautybyyeny/" target="_blank" rel="noopener noreferrer" className="social-link instagram-link">
                                    <img src={instagramIcon} alt="Instagram" className="instagram-icon" />
                                </a>
                                <a href="https://wa.link/0nsw8k" target="_blank" rel="noopener noreferrer" className="social-link whatsapp-link">
                                    <img src={whatsappIcon} alt="Whatsapp" className="whatsapp-icon" />
                                </a>
                                <a href="https://www.yelp.com/biz/key-beauty-by-yenys-miami" target="_blank" rel="noopener noreferrer" className="social-link yelp-link">
                                    <img src={yelpIcon} alt="Yelp" className="yelp-icon" />
                                </a>
                            </div>
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