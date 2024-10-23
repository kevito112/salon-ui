import React from 'react';
import './Button.css';

interface ButtonProps {
    text: string;
    style?: React.CSSProperties;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, style, className}) => {

    const handleClick = () => {
        window.location.href = 'https://www.fresha.com';
    };

    return (
        <button className={`custom-button ${className}`} style={style} onClick={handleClick}>
            {text}
        </button>
    );
};

export default Button;