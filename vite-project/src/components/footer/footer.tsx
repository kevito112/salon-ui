import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                <nav className="footer-nav">
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                    <a href="/contact">Contact</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;