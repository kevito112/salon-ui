import './navbar.css';
import React, { useState } from 'react';
import keybeauty from '../../assets/images/keybeauty.png';
import hamburgerIcon from '../../assets/images/hamburger.png'; // Import the hamburger icon

const Navbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="full-width-container">
            <nav className="navbar container">
                <div className="content">
                    <a href="/home" className="home-link">
                        <img src={keybeauty} alt="Key Beauty Logo" className="navbar-logo" />
                    </a>
                    <div className="dropdown">
                        <img
                            src={hamburgerIcon}
                            alt="Hamburger Menu"
                            className="hamburger"
                            onClick={toggleDropdown}
                            style={{ cursor: 'pointer' }}
                        />
                        {isDropdownOpen && (
                            <div className="dropdown-content">
                                <a href="/book-now" className="dropdown-item">Book Now</a>
                                <a href="/services" className="dropdown-item">Services</a>
                                <a href="/gallery" className="dropdown-item">Gallery</a>
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