import React from 'react';
import './Button.css';

interface ButtonProps {
    text: string;
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, style, className, onClick }) => {
    return (
        <button className={`custom-button ${className}`} style={style} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;