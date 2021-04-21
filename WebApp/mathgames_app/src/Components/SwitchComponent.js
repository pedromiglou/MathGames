/* React */
import React, { useState, useEffect } from 'react';
import {Switch, Route, withRouter } from 'react-router-dom';

/* Css */
import './SwitchComponent.css';

/* Pages */
import MemoComponent from './MemoComponent'

/* Redux */
import { useSelector } from 'react-redux';

function SwitchComponent(){
    const action = useSelector(state => state.css_vars)[0];
    
    var other_comp = document.getElementById("other_comp");

    if (action === 'SHRINK'){
        other_comp.style.width = "calc(100% - 65px)";
        other_comp.style.marginLeft = "65px";
        other_comp.style.transition = "600ms";
    } else if (action === 'EXTEND'){
        other_comp.style.width = "calc(100% - 300px)";
        other_comp.style.marginLeft = "300px";
        other_comp.style.transition = "700ms";
    }
    
    return(
        <div id="other_comp" className="sub-component">
            <MemoComponent/>
        </div>
    )
}

export default SwitchComponent;
