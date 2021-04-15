// import React from 'react';
// import './Button.css';
// import { Link } from 'react-router-dom';

// export function Button() {
//   return (
//     <Link to='sign-up'>
//       <button className='btn'>Sign Up</button>
//     </Link>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";
const STYLES = ["btn--primary", "btn--outline", "btn--test"];
const SIZES = ["btn--medium", "btn--large"];
// const ROUTING = ["Link", "HashLink"];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    address,
    routing,
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    // const checkButtonRouting = SIZES.includes(routing) ? routing : ROUTING[0];


    
    return (
        <Link to={address} className="btn-mobile">
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
    );

};
