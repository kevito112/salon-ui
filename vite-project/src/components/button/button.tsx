import React from 'react';
import './button.css';

interface ButtonProps {
    text: string;
    style?: React.CSSProperties;
    className?: string;
    url?: string;
}

const Button: React.FC<ButtonProps> = ({ text, style, className, url = 'https://booksy.com/en-us/1369477_key-beauty-key-biscayne_brows-lashes_15888_key-biscayne?do=invite&utm_medium=social_post_creator' }) => {

    const handleClick = () => {
        window.location.href = url;
    };

    return (
        <a href={url} className={`custom-button ${className}`} style={style}>
            {text}
        </a>
    );
};

export default Button;