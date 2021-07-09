/* React and React-Icons */
import React, { useState, useEffect } from 'react';
import {IconContext} from 'react-icons';
import * as AiIcons from 'react-icons/ai';

import { Link } from 'react-router-dom';

/* Css */
import './Menu.css'

/* Data and Service */
import {sidebarData_group_user,sidebarData_group_nouser, sidebarData_group2, sidebarData_group_admin} from '../../data/SidebarData';
import AuthService from '../../Services/auth.service';

function Sidemenu() {
	const [Admin, setAdmin] = useState(false);
	const [withoutUser, setWithoutUser] = useState(true);
	const [normalUser, setNormalUser] = useState(false);
	

	// Tem de colocar no redux o tipo de user
    useEffect(() => {
		var current_user = AuthService.getCurrentUser();

		if (current_user === null){
			setWithoutUser(true)
		} else if (current_user['account_type'] === 'A') {
			setWithoutUser(false)
			setAdmin(true);
		} else {
			setWithoutUser(false)
			setNormalUser(true);
		}
		
    }, [])

	return (
		<IconContext.Provider value={{color: 'grey'}}>
			{/* <nav className={sidebar ? "nav-menu active" : "nav-menu collapsed"}> */}
			<ul className="nav-menu-items">
				<div className="nav-item">
					<li className="nav-text">
						<Link to="/"> 
							<i className="subicon"><AiIcons.AiFillHome/></i>
							<span className="sidebar-icons icons-noname">Inicio</span>
							{/* <span className={sidebar ? "icons-name" : "icons-noname"}>Inicio</span> */}
						</Link>
					</li>
				</div>

				<hr></hr>

				{ Admin && 
					<div>
						{sidebarData_group_admin.map((item) =>{
						return(
							<div key={item.id} className="nav-item">
								<li  className={item.cName}>
									<Link to={item.path}> 
										<i className="subicon">{item.icon}</i>
										<span className="sidebar-icons icons-noname">{item.title}</span>
										{/* <span className={sidebar ? "icons-name" : "icons-noname"}>{item.title}</span> */}
									</Link>
								</li>
							</div>
							);
						})}
					</div>
				}

				{ normalUser && 
					<div>
						{sidebarData_group_user.map((item) =>{
						return(
							<div key={item.id} className="nav-item">
								<li className={item.cName}>
									<Link to={item.path}> 
										<i className="subicon">{item.icon}</i>
										<span className="sidebar-icons icons-noname">{item.title}</span>
										{/* <span className={sidebar ? "icons-name" : "icons-noname"}>{item.title}</span> */} 
										
									</Link>
								</li>
							</div>
							);
						})}
					</div>
				}

				{ withoutUser && 
					<div>
						{sidebarData_group_nouser.map((item) =>{
						return(
							<div key={item.id} className="nav-item">
								<li className={item.cName}>
									<Link to={item.path}> 
										<i className="subicon">{item.icon}</i>
										<span className="sidebar-icons icons-noname">{item.title}</span>
										{/* <span className={sidebar ? "icons-name" : "icons-noname"}>{item.title}</span> */} 
										
									</Link>
								</li>
							</div>
							);
						})}
					</div>
				}
				

				<hr></hr>
				
				{sidebarData_group2.map((item) =>{
					return(
						<div key={item.id} className="nav-item">
							<li  className={item.cName}>
								<Link to={item.path}> 
									<i className="subicon">{item.icon}</i>
									<span className="sidebar-icons icons-noname">{item.title}</span>
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