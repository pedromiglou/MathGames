import React, { useState, useRef } from "react";
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import * as FaIcons from "react-icons/fa";
import './RulesTooltip.css';

export const RulesTooltip = ({rules, website}) => {
    const [show, setShow] = useState(false);
    const target = useRef(null);
  
    return (
        <>
            <Button ref={target} onClick={() => setShow(!show)} className="rule-button align-self-center">
                <FaIcons.FaQuestionCircle size={42}/>
            </Button>
            <Overlay target={target.current} show={show} placement="bottom">
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
                <div
                    {...props} 
                    style={{backgroundColor: 'black', padding: '2px 10px', color: 'white', borderRadius: 10, ...props.style, maxWidth: '20vw'}}
                    className="rules-tooltip"
                >
                <p className="text-left">
                    <b>Regras:</b>
                    <br/>
                    <p style={{paddingLeft: '5px'}}>{rules}</p>
                </p>
                </div>
            )}
            </Overlay>
        </>
    );
}
