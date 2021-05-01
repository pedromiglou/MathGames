/* React and React-Icons */
import React from 'react';
import {IconContext} from 'react-icons';
import * as AiIcons from 'react-icons/ai';

import { Link } from 'react-router-dom';

/* Css */
import './Menu.css'

/* Data and Service */
import {sidebarData_group1, sidebarData_group2} from '../../data/SidebarData';

function Sidemenu() {
	return (
		<IconContext.Provider value={{color: 'grey'}}>
			{/* <nav className={sidebar ? "nav-menu active" : "nav-menu collapsed"}> */}
			<ul className="nav-menu-items">
				<div className="nav-item">
					<li className="nav-text">
						<Link to="/"> 
							<i className="subicon"><AiIcons.AiFillHome/></i>
							<span className="sidebar-icons icons-name">Inicio</span>
							{/* <span className={sidebar ? "icons-name" : "icons-noname"}>Inicio</span> */}
						</Link>
					</li>
				</div>

				<hr></hr>
				{sidebarData_group1.map((item) =>{
					return(
						<div key={item.id} className="nav-item">
							<li className={item.cName}>
								<Link to={item.path}> 
									<i className="subicon">{item.icon}</i>
									<span className="sidebar-icons icons-name">{item.title}</span>
									{/* <span className={sidebar ? "icons-name" : "icons-noname"}>{item.title}</span> */}
									
								</Link>
							</li>
						</div>
					);
				})}
				<hr></hr>
				{sidebarData_group2.map((item) =>{
					return(
						<div key={item.id} className="nav-item">
							<li  className={item.cName}>
								<Link to={item.path}> 
									<i className="subicon">{item.icon}</i>
									<span className="sidebar-icons icons-name">{item.title}</span>
									{/* <span className={sidebar ? "icons-name" : "icons-noname"}>{item.title}</span> */}
								</Link>
							</li>
						</div>
					);
				})}
				<hr></hr>
				
			</ul>
		</IconContext.Provider>
	)
}

export default Sidemenu;