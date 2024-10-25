import React, { useState } from 'react';
import './dropdown.css';
import Button from '../button/button';
import type { CardData } from '../services/services';

interface DropdownProps {
    generalServiceName: string;
    imgSrc: string;
    cards: CardData[];
}

const Dropdown: React.FC<DropdownProps> = ({ imgSrc, cards, generalServiceName }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setIsClicked(!isClicked);
    };

  return (
    <div className="dropdown">
        <div className={`initial-dropdown ${isClicked ? 'clicked' : ''}`} onClick={toggleDropdown}>
            <div className="dropdown-icon">
                <span></span>
                <span></span>
            </div>
            <h2 className="general-service-name">{generalServiceName}</h2>
        </div>
                <div className={`full-dropdown ${isDropdownOpen ? 'open' : ''}`}>
                   <div className="dropdown-image">
                        <img src={imgSrc} className="img-src" alt ="Service Image" />
                   </div>
                   <div className="dropdown-menu">
                    {cards.map((card, index) => (
                        <div className="card" key={index}>
                            <div className="name-price">
                                <h3 className="card-title">{card.title}</h3>
                                <h3 className="card-price">{card.hourPrice}</h3>
                            </div>
                            <p className="card-description">{card.description}</p>
                            <div className="space"></div>
                            <Button
                                text="Book Now"
                                className="book-now-button-card"
                            />
                        </div>
                    ))}
                   </div>
              </div>
    </div>
  );
};

export default Dropdown;