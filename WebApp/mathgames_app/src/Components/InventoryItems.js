import { React, useState } from "react";
import { Card } from "react-bootstrap";

import { hatItems } from "../data/hatItems";

import './InventoryItems.css'

const InventoryItems = (props) => {
	//const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	


	function listHats() {

		return hatItems.map((x) => {
			return (
				<Card
					key={x.id}
					id={x.id + "_item"}
					className="item-card"
					onClick={() => props.www(x.name)}
				>
					<div className="card-descr">
						<img src={x.img} alt={x.name} className="item-img" />
					</div>
				</Card>
			);
		});
	}

	return <div className="inv-items">{listHats()}</div>;
};

export default InventoryItems;
