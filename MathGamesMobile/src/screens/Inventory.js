import React, { useState } from "react";
import {
	View,
	ScrollView,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	TouchableHighlight,
	SafeAreaView,
	Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Avatar2 from "../components/Avatar2";
import RNPickerSelect from "react-native-picker-select";

/* import Avatar from "../components/Avatar"; */
import { hatItems } from "../data/hatItems";

const win = Dimensions.get("window");

class Inventory extends React.Component {
	state = {
		uniqueValue: 1,
	};

	forceRemount = () => {
		this.setState(({ uniqueValue }) => ({
			uniqueValue: uniqueValue + 1,
		}));
	};

	refreshh = () => {
		this.setState({ accessorieName: "SunGlasses" });
		this.forceRemount();
	};

	showItem = (option) => {
		switch (option) {
			case "chapeus":
				console.log("chapeus");
				this.setState({ option: "chapeus" });
				break;
			case "camisolas":
				console.log("camisolas");
				this.setState({ option: "camisolas" });
				break;
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			hatName: "WhichHat",
			accessorieName: "AviatorGlasses",
			option: "none",
		};
	}

	render() {
		return (
			<ScrollView
				contentContainerStyle={styles.scrollView}
			>
				<LinearGradient
					colors={[
						"#78c9ff",
						"#6699f8",
						"#5379f7",
						"#5867f7",
						"#8a54ee",
					]}
					start={[0, 0]}
					end={[1, 1]}
				>
					<View style={{ flexDirection: "row" }}>
						<View style={{ flex: 1 }}>
							<TouchableHighlight
								onPress={() => navigation.navigate("Profile")}
								style={styles.button}
							>
								<Text style={styles.buttonText}>Perfil</Text>
							</TouchableHighlight>
						</View>
						<View style={{ flex: 1, marginLeft: 1 }}>
							<TouchableHighlight
								onPress={() => navigation.navigate("LastGames")}
								style={styles.button}
							>
								<Text style={styles.buttonText}>
									Ultimos Jogos
								</Text>
							</TouchableHighlight>
						</View>
					</View>
					<View>
						<Text style={styles.pageTitle}>Inventario</Text>
					</View>

					<SafeAreaView
						style={styles.container}
						key={this.state.uniqueValue}
					>
						<Avatar2
							hatName="none"
							shirtName="Camouflage1"
							accessorieName={this.state.accessorieName}
						/>
					</SafeAreaView>

					<RNPickerSelect
						onValueChange={(value) => this.showItem(value)}
						items={[
							{ label: "Chapeus", value: "chapeus" },
							{ label: "Camisolas", value: "camisolas" },
							{ label: "Calcas", value: "calcas" },
							{ label: "Acessorios", value: "acessorios" },
						]}
					/>

					{this.state.option === "chapeus" ? 
						<InventoryItems
							option="chapeus"
						/>
					: null }


					<Button
						onPress={() => this.refreshh()}
						title="Learn More"
						color="#841584"
					/>
				</LinearGradient>
			</ScrollView>
		);
	}
}

export default Inventory;




class InventoryItems extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {

		return (

			<View style={styles.imgsContainer}>
				{hatItems.map(x => 
					<View style={styles.imgView} key={x.id}>
						<Image
							style={styles.itemImg}
							resizeMode = {'contain'}
							source={x.img}
						/>
					</View>
				)}
			</View>
		)
	}
}


const styles = StyleSheet.create({
	imgView: {
		flex: 3,
		alignItems:  "center",
	},

	imgsContainer: {
		flex: 1,
		flexDirection: "row",
		padding: 10
	},

	scrollView: {
        flexGrow: 1,
        flex:1
    },

	itemImg: {
		height: 100,
		width: 100,
	},

	pageTitle: {
		fontSize: 40,
		textAlign: "center",
		fontFamily: "BubblegumSans",
		color: "white",
		padding: 10,
	},

	button: {
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: "#3a4e60",
		width: win.width / 2,
	},

	buttonText: {
		color: "#fff",
		textAlign: "center",
		fontFamily: "BubblegumSans",
		fontSize: 18,
		padding: 10,
	},

	container: {
		alignItems: "center",
		width: "60%",
		height: "40%",
		backgroundColor: "red",
		justifyContent: "center",
		textAlign: "center",
		marginLeft: "auto",
		marginRight: "auto",
	},
});
