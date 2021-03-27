import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';
import {Link} from 'react-router-dom';
import {sidebarData} from './SidebarData.js';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {IconContext} from 'react-icons';

function Menu(){
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar)
    return(
        <>
        <IconContext.Provider value={{color: 'grey'}}>
            <div className="navbar">
                <div className="bars_logo">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                    <div className="nav-logo">
                        <Link to="/">
                            <img  className="logo" src={process.env.PUBLIC_URL + "/images/logo-light.png"}  alt="logo"/>
                        </Link>
                    </div>
                </div>
            </div>
            <nav className={sidebaraa ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items">
                    {/* 
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose onClick={showSidebar}/>
                        </Link>
                    </li>
                    
                    */}
                    
                    {sidebarData.map((item, index) =>{
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}

export default Menu;