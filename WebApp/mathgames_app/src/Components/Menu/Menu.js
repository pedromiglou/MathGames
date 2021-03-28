/* import React, {useState} from 'react';
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
        <IconContext.Provider value={{color: 'red'}}>
            <div className="nav-logo">
                <Link to="/">
                    <figure><img src={process.env.PUBLIC_URL + "/images/logo-light.png"}  alt="logo"/></figure>
                </Link>
            </div>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose onClick={showSidebar}/>
                        </Link>
                    </li>
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

export default Menu; */