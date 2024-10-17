import './navbar.css';
import React, { useState } from 'react';
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
                    <a href="/home" className="home-link">
                        <img src={keybeauty} alt="Key Beauty Logo" className="navbar-logo" />
                    </a>
                    <div className="menu-items">
                        <a href="/home" className="menu-item">HOME</a>
                        <a href="/services" className="menu-item">SERVICES</a>
                        <a href="/gallery" className="menu-item">GALLERY</a>
                        <Button
                            text="Book Now"
                            className="book-now-button-navbar"
                            onClick={() => handleWrapperClick('https://www.google.com')}
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
                                <div className="dropdown-item-wrapper" onClick={() => handleWrapperClick('/book-now')} style={{ cursor: 'pointer' }}>
                                    <span className="dropdown-item">Book Now</span>
                                </div>
                                <div className="dropdown-item-wrapper" onClick={() => handleWrapperClick('/services')} style={{ cursor: 'pointer' }}>
                                    <span className="dropdown-item">Services</span>
                                </div>
                                <div className="dropdown-item-wrapper" onClick={() => handleWrapperClick('/gallery')} style={{ cursor: 'pointer' }}>
                                    <span className="dropdown-item">Gallery</span>
                                </div>
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