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
	const numbers = [true, true, false, true];

	if( props.option === "Camisolas" ) 
		var option = listShirts()
	else if ( props.option === "Acessorios" )
		option = listAccessories()
	else if ( props.option === "Chapeus" )
		option = listHats()
	else
		option = listTrousers()

	

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

			if ( numbers[x.id] ) {
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
					>
						<div className="card-descr">
							<img src={x.img} alt={x.name} className="item-img-locked" />
							<i className="lockIcon"><BsIcons.BsFillLockFill/></i>
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

			if ( numbers[x.id] ) {
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
					>
						<div className="card-descr">
							<img src={x.img} alt={x.name} className="item-img-locked" />
							<i className="lockIcon"><BsIcons.BsFillLockFill/></i>
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

			if ( numbers[x.id] ) {
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
					>
						<div className="card-descr">
							<img src={x.img} alt={x.name} className="item-img-locked" />
							<i className="lockIcon"><BsIcons.BsFillLockFill/></i>
						</div>
					</Card>
				);
			}
		});
	}


	function listTrousers() {

		return trouserItems.map((x) => {
			if ( props.current === x.name ) {
				return (
					<Card
						key={x.id}
						id={x.id + "_trouser"}
						className="item-card"
						onClick={() => props.trouserName(x.color)}
					>
						<div className="card-descr" style={{backgroundColor: x.color}}>
							<i className="checkIcon"><FaIcons.FaCheck/></i>
						</div>
					</Card>
				);
			}

			if ( numbers[x.id] ) {
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
			} else {
				return (
					<Card
						key={x.id}
						id={x.id + "_accessorie"}
						className="item-card"
						style={{backgroundColor: x.color, opacity: 0.8}}
					>
						<div className="card-descr" style={{backgroundColor: x.color}}>
							<i className="lockIcon"><BsIcons.BsFillLockFill/></i>
						</div>
					</Card>
				);
			}
		});
	}

	return <div className="inv-items">{option}</div>;
};

export default InventoryItems;
