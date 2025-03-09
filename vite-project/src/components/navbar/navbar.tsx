import './navbar.css';
import { useState } from 'react';
import keybeauty from '../../assets/images/keybeauty.png';
import hamburgerIcon from '../../assets/images/hamburger.png'; // Import the hamburger icon
import exit from '../../assets/images/exit.png';
import Button from '../../components/button/button';

const Navbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleWrapperClick = (href: string) => {
        window.location.href = href;
    };

    return (
        <div className="full-width-container">
            <nav className="navbar container">
                <div className="content">
                    <a href="/home">
                        <img
                            src={keybeauty}
                            alt="Key Beauty Logo"
                            className="navbar-logo"
                            style={{ cursor: 'pointer' }}
                        />
                    </a>
                    <div className="menu-items">
                        <a href="/home" className="menu-item">HOME</a>
                        <a href="/services" className="menu-item">SERVICES</a>
                        <a href="/gallery" className="menu-item">GALLERY</a>
                        <Button
                            text="Book Now"
                            className="book-now-button-navbar"
                        />
                    </div>
                    <div className="dropdown">
                        {!isDropdownOpen && (
                        <img
                            src={hamburgerIcon}
                            alt="Hamburger Menu"
                            className="hamburger"
                            onClick={toggleDropdown}
                            style={{ cursor: 'pointer' }}
                        />
                     )}
                        {isDropdownOpen && (
                            <div className="dropdown-content">
                                <div className="dropdown-item-wrapper exitting-row" onClick={closeDropdown} style={{ cursor: 'pointer' }}>
                                    <img src={exit} className="exit-img" alt="Exit" />
                                </div>
                                <a href="https://booksy.com/en-us/1369477_key-beauty-key-biscayne_brows-lashes_15888_key-biscayne?do=invite&utm_medium=social_post_creator" className="dropdown-item-wrapper" style={{ cursor: 'pointer' }}>
                                    <span className="dropdown-item">Book Now</span>
                                </a>
                                <a href="/home" className="dropdown-item-wrapper" style={{ cursor: 'pointer' }}>
                                    <span className="dropdown-item">Home</span>
                                </a>
                                <a href="/services" className="dropdown-item-wrapper" style={{ cursor: 'pointer' }}>
                                    <span className="dropdown-item">Services</span>
                                </a>
                                <a href="/gallery" className="dropdown-item-wrapper" style={{ cursor: 'pointer' }}>
                                    <span className="dropdown-item">Gallery</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="separator"></div>
            </nav>
        </div>
    );
};

export default Navbar;