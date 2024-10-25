import React from 'react';
import './button.css';

interface ButtonProps {
    text: string;
    style?: React.CSSProperties;
    className?: string;
    url?: string;
}

const Button: React.FC<ButtonProps> = ({ text, style, className, url = 'https://www.fresha.com' }) => {

    const handleClick = () => {
        window.location.href = url;
    };

    return (
        <button className={`custom-button ${className}`} style={style} onClick={handleClick}>
            {text}
        </button>
    );
};

export default Button;