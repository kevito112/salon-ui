
import './navbar.css';
import keybeauty from '../../assets/images/keybeauty.png';
import hamburger from '../../assets/images/hamburger.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="content">
                <img src={keybeauty} alt="Key Beauty Logo" className="navbar-logo"/> {/* Add the image */}
                <img src={hamburger} alt="Hamburger" className="hamburger"/> {/* Add the image */}
            </div>
            <div className="separator"></div>
        </nav>
    );
};

export default Navbar;