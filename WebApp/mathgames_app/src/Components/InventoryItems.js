import { React } from "react";
import { Card } from "react-bootstrap";

import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';

import { hatItems } from "../data/hatItems";
import { shirtItems } from "../data/shirtItems";
import { accessorieItems } from "../data/accessorieItems";
import { trouserItems } from "../data/trouserItems";

import './InventoryItems.css'

const InventoryItems = (props) => {

	if( props.option === "Camisolas" ) 
		var option = listShirts()
	else if ( props.option === "Acessorios" )
		option = listAccessories()
	else if ( props.option === "Chapeus" )
		option = listHats()
	else
		option = listTrousers()


	function showItemLevel(id) {
		var itemLocker = document.getElementById(id + "_hatLocker");
		itemLocker.style.zIndex = "-10";


		var itemLevel = document.getElementById(id + "_hatLevel");
		itemLevel.style.zIndex = "10";
	}

	function hiddeItemLevel(id) {
		var itemLocker = document.getElementById(id + "_hatLocker");
		itemLocker.style.zIndex = "10";


		var itemLevel = document.getElementById(id + "_hatLevel");
		itemLevel.style.zIndex = "-10";
	}



	function listHats() {

		return hatItems.map((x) => {
			if ( props.current === x.name ) {
				return (
					<Card
						key={x.id}
						id={x.id + "_hat"}
						className="item-card"
						onClick={() => props.hatName(x.name)}
					>
						<div className="card-descr">
							<img src={x.img} alt={x.name} className="item-img-current" />
							<i className="checkIcon"><FaIcons.FaCheck/></i>
						</div>
					</Card>
				);
			}

			if ( props.lvl >= x.lvl ) {
				return (
					<Card
						key={x.id}
						id={x.id + "_hat"}
						className="item-card"
						onClick={() => props.hatName(x.name)}
					>
						<div className="card-descr">
							<img src={x.img} alt={x.name} className="item-img" />
						</div>
					</Card>
				);
			} else {
				return (
					<Card
						key={x.id}
						id={x.id + "_hat"}
						className="item-card"
						onMouseOver={() => showItemLevel(x.id)}
						onMouseLeave={() => hiddeItemLevel(x.id)}
					>
						<div className="card-descr">
							<img src={x.img} alt={x.name} className="item-img-locked" />
							<i className="lockIcon" id={x.id + "_hatLocker"}><BsIcons.BsFillLockFill/></i>
							<p className="item-level" id={x.id + "_hatLevel"}>Nivel: {x.lvl}</p>
						</div>
					</Card>
				);
			}
		});
	}


	function listShirts() {

		return shirtItems.map((x) => {
			if ( props.current === x.name ) {
				return (
					<Card
						key={x.id}
						id={x.id + "_shirt"}
						className="item-card"
						onClick={() => props.shirtName(x.name)}
					>
						<div className="card-descr">
							<img src={x.img} alt={x.name} className="item-img-current" />
							<i className="checkIcon"><FaIcons.FaCheck/></i>
						</div>
					</Card>
				);
			}

			if ( props.lvl >= x.lvl ) {
				return (
					<Card
						key={x.id}
						id={x.id + "_shirt"}
						className="item-card"
						onClick={() => props.shirtName(x.name)}
					>
						<div className="card-descr">
							<img src={x.img} alt={x.name} className="item-img" />
						</div>
					</Card>
				);
			} else {
				return (
					<Card
						key={x.id}
						id={x.id + "_shirt"}
						className="item-card"
						onMouseOver={() => showItemLevel(x.id)}
						onMouseLeave={() => hiddeItemLevel(x.id)}
					>
						<div className="card-descr">
							<img src={x.img} alt={x.name} className="item-img-locked" />
							<i className="lockIcon" id={x.id + "_hatLocker"}><BsIcons.BsFillLockFill/></i>
							<p className="item-level" id={x.id + "_hatLevel"}>Nivel: {x.lvl}</p>
						</div>
					</Card>
				);
			}
		});
	}

	function listAccessories() {

		return accessorieItems.map((x) => {
			if ( props.current === x.name ) {
				return (
					<Card
						key={x.id}
						id={x.id + "_accessorie"}
						className="item-card"
						onClick={() => props.accessorieName(x.name)}
					>
						<div className="card-descr">
							<img src={x.img} alt={x.name} className="item-img-current" />
							<i className="checkIcon"><FaIcons.FaCheck/></i>
						</div>
					</Card>
				);
			}

			if ( props.lvl >= x.lvl ) {
				return (
					<Card
						key={x.id}
						id={x.id + "_accessorie"}
						className="item-card"
						onClick={() => props.accessorieName(x.name)}
					>
						<div className="card-descr">
							<img src={x.img} alt={x.name} className="item-img" />
						</div>
					</Card>
				);
			} else {
				return (
					<Card
						key={x.id}
						id={x.id + "_accessorie"}
						className="item-card"
						onMouseOver={() => showItemLevel(x.id)}
						onMouseLeave={() => hiddeItemLevel(x.id)}
					>
						<div className="card-descr">
							<img src={x.img} alt={x.name} className="item-img-locked" />
							<i className="lockIcon" id={x.id + "_hatLocker"}><BsIcons.BsFillLockFill/></i>
							<p className="item-level" id={x.id + "_hatLevel"}>Nivel: {x.lvl}</p>
						</div>
					</Card>
				);
			}
		});
	}


	function listTrousers() {

		return trouserItems.map((x) => {
			if ( props.current === x.color ) {
				if( x.color[0] !== "#" ) {
					return (
						<Card
							key={x.id}
							id={x.id + "_trouser"}
							className="item-card"
							onClick={() => props.trouserName(x.color)}
						>
							<div className="card-descr" style={{backgroundColor: x.color}}>
								<i className="checkIcon"><FaIcons.FaCheck/></i>
								<img src={x.img} alt={x.name} className="item-img-current" />
							</div>
						</Card>
					);
				} else {
					return (
						<Card
							key={x.id}
							id={x.id + "_trouser"}
							className="item-card"
							onClick={() => props.trouserName(x.color)}
						>
							<div className="card-descr item-img-current" style={{backgroundColor: x.color}}>
								<i className="checkIcon"><FaIcons.FaCheck/></i>
							</div>
						</Card>
					);
				}
			}

			if ( props.lvl >= x.lvl ) {
				if( x.color[0] !== "#" ) {
					return (
						<Card
							key={x.id}
							id={x.id + "_trouser"}
							className="item-card"
							onClick={() => props.trouserName(x.color)}
							style={{backgroundColor: x.color}}
						>
							<div className="card-descr">
								<img src={x.img} alt={x.name} className="item-img" />
							</div>
						</Card>
					);

				} else {
					return (
						<Card
							key={x.id}
							id={x.id + "_trouser"}
							className="item-card"
							onClick={() => props.trouserName(x.color)}
							style={{backgroundColor: x.color}}
						>
							<div className="card-descr" style={{backgroundColor: x.color}}>
							</div>
						</Card>
					);
				}
			} else {
				if( x.color[0] !== "#" ) {
					return (
						<Card
							key={x.id}
							id={x.id + "_trouser"}
							className="item-card"
							style={{backgroundColor: x.color}}
							onMouseOver={() => showItemLevel(x.id)}
							onMouseLeave={() => hiddeItemLevel(x.id)}
						>
							<div className="card-descr">
								<img src={x.img} alt={x.name} className="item-img-locked" />
								<i className="lockIcon" id={x.id + "_hatLocker"}><BsIcons.BsFillLockFill/></i>
								<p className="item-level" id={x.id + "_hatLevel"}>Nivel: {x.lvl}</p>
							</div>
						</Card>
					);

				} else {
					return (
						<Card
							key={x.id}
							id={x.id + "_accessorie"}
							className="item-card"
							style={{backgroundColor: x.color, opacity: 0.8}}
							onMouseOver={() => showItemLevel(x.id)}
							onMouseLeave={() => hiddeItemLevel(x.id)}
						>
							<div className="card-descr" style={{backgroundColor: x.color}}>
								<i className="lockIcon" id={x.id + "_hatLocker"}><BsIcons.BsFillLockFill/></i>
								<p className="item-level" id={x.id + "_hatLevel"}>Nivel: {x.lvl}</p>
							</div>
						</Card>
					);
				}
			}
		});
	}

	return <div className="inv-items">{option}</div>;
};

export default InventoryItems;
