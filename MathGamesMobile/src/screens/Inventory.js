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

import Avatar from "../components/Avatar";
import RNPickerSelect from "react-native-picker-select";

import { hatItems } from "../data/hatItems";
import { TouchableOpacity } from "react-native-gesture-handler";
import { shirtItems } from "../data/shirtItems";
import { accessorieItems } from "../data/accessorieItems";
import { trouserItems } from "../data/trouserItems";

const win = Dimensions.get("window");

class Inventory extends React.Component {
	forceRemount = () => {
		this.setState({ uniqueValue: this.state.uniqueValue + 1 });
	};

	refreshh = () => {
		this.setState({ accessorieName: "SunGlasses" });
		this.forceRemount();
	};

	changeHat = (hatName) => {
		console.log("Changing hat ...");
		if (hatName !== undefined) {
			console.log("changed hat to " + hatName);
			this.setState({ hatNameState: hatName });
			this.forceRemount();
		}
	};

	changeShirt = (shirtName) => {
		console.log("Changing shirt ...");
		if (shirtName !== undefined) {
			console.log("changed shirt to " + shirtName);
			this.setState({ shirtNameState: shirtName });
			this.forceRemount();
		}
	};

	changeAccessorie = (accessorieName) => {
		console.log("Changing shirt ...");
		if (accessorieName !== undefined) {
			console.log("changed accessorie to " + accessorieName);
			this.setState({ accessorieNameState: accessorieName });
			this.forceRemount();
		}
	};

	changeTrousers = (trouserName) => {
		console.log("Changing trouser ...");
		if (trouserName !== undefined) {
			console.log("changed trouser to " + trouserName);
			this.setState({ trouserNameState: trouserName });
			this.forceRemount();
		}
	};

	showItem = (option) => {
		switch (option) {
			case "chapeus":
				console.log("Option: chapeus");
				this.setState({ option: "chapeus" });
				break;
			case "camisolas":
				console.log("Option: camisolas");
				this.setState({ option: "camisolas" });
				break;
			case "acessorios":
				console.log("Option: acessorios");
				this.setState({ option: "acessorios" });
				break;
			case "calcas":
				console.log("Option: calcas");
				this.setState({ option: "calcas" });
				break;
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			uniqueValue: 1,
			hatNameState: "MagicianHat",
			shirtNameState: "Camouflage1",
			accessorieNameState: "AviatorGlasses",
			trouserNameState: "TrouserJeans",
			option: "none",
		};
	}

	render() {
		const placeholder = {
			label: "Clica para escolheres ...",
			value: null,
			color: "grey",
		};

		return (
			<ScrollView contentContainerStyle={styles.scrollView}>
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
					style={{ height: win.height, width: win.width }}
				>
					
					{/* <Button
						onPress={() => this.refreshh()}
						title="Learn More"
						color="#841584"
					/> */}

					<SafeAreaView
						style={styles.container}
						key={this.state.uniqueValue}
					>
						<Avatar
							hatName={this.state.hatNameState}
							shirtName={this.state.shirtNameState}
							accessorieName={this.state.accessorieNameState}
							trouserName={this.state.trouserNameState}
						/>
					</SafeAreaView>

					<RNPickerSelect
						onValueChange={(value) => this.showItem(value)}
						items={[
							{ label: "Chapeus", value: "chapeus" },
							{ label: "Camisolas", value: "camisolas" },
							{ label: "Acessorios", value: "acessorios" },
							{ label: "Calcas", value: "calcas" },
						]}
						style={pickerSelectStyles}
						placeholder={placeholder}
					/>

					{this.state.option === "chapeus" && (
						<View style={styles.imgsContainer}>
							{hatItems.map((x) => (
								<TouchableOpacity
									onPress={() => this.changeHat(x.name)}
									key={x.id}
								>
									<View style={styles.imgView}>
										<Image
											style={styles.itemImg}
											resizeMode={"contain"}
											source={x.img}
										/>
									</View>
								</TouchableOpacity>
							))}
						</View>
					)}

					{this.state.option === "camisolas" && (
						<View style={styles.imgsContainer}>
							{shirtItems.map((x) => (
								<TouchableOpacity
									onPress={() => this.changeShirt(x.name)}
									key={x.id}
								>
									<View style={styles.imgView}>
										<Image
											style={styles.itemImg}
											resizeMode={"contain"}
											source={x.img}
										/>
									</View>
								</TouchableOpacity>
							))}
						</View>
					)}

					{this.state.option === "acessorios" && (
						<View style={styles.imgsContainer}>
							{accessorieItems.map((x) => (
								<TouchableOpacity
									onPress={() =>
										this.changeAccessorie(x.name)
									}
									key={x.id}
								>
									<View style={styles.imgView}>
										<Image
											style={styles.itemImg}
											resizeMode={"contain"}
											source={x.img}
										/>
									</View>
								</TouchableOpacity>
							))}
						</View>
					)}

					{this.state.option === "calcas" && (
						<View style={styles.imgsContainer}>
							{trouserItems.map((x) => {
								if (x.color[0] === "#") {
									return (
										<TouchableOpacity
											onPress={() =>
												this.changeTrousers(x.color)
											}
											key={x.id}
											style={{backgroundColor: x.color, height: 70, width: 70, margin: 10}}
										>
											<View >
												<Text> </Text>
											</View>
										</TouchableOpacity>
									)
								} else {
									return (
										<TouchableOpacity
											onPress={() =>
												this.changeTrousers(x.name)
											}
											key={x.id}
										>
											<View style={styles.imgView}>
												<Image
													style={styles.itemImg}
													resizeMode={"contain"}
													source={x.img}
												/>
											</View>
										</TouchableOpacity>
									);
								}
							})}
						</View>
					)}

					<View
						style={{
							flexDirection: "row",
							paddingBottom: 40,
						}}
					>
						<View>
							<TouchableHighlight
								onPress={() => navigation.navigate("Profile")}
								style={styles.buttonDownL}
							>
								<Text style={styles.buttonText}>Guardar</Text>
							</TouchableHighlight>
						</View>
						<View>
							<TouchableHighlight
								onPress={() => navigation.navigate("LastGames")}
								style={styles.buttonDownR}
							>
								<Text style={styles.buttonText}>Cancelar</Text>
							</TouchableHighlight>
						</View>
					</View>
				</LinearGradient>
			</ScrollView>
		);
	}
}

export default Inventory;


const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		fontWeight: "bold",
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 5,
		color: "white",
		paddingRight: 30, // to ensure the text is never behind the icon
		//width: 50,
		marginTop: 10,
		marginRight: 20,
		marginLeft: 20,
	},
	inputAndroid: {
		fontSize: 16,
		fontWeight: "bold",
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 5,
		color: "white",
		paddingRight: 30, // to ensure the text is never behind the icon
		//width: 50,
		marginTop: 10,
		marginRight: 20,
		marginLeft: 20,
	},
});

const styles = StyleSheet.create({
	buttonDownL: {
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: "green",
		width: win.width / 3,
		marginLeft: win.width / 10,
	},

	buttonDownR: {
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: "red",
		width: win.width / 3,
		marginLeft: win.width / 10,
	},

	picker: {
		flex: 1,
		backgroundColor: "red",
		color: "white",
		textAlign: "center",
		justifyContent: "center",
	},

	imgView: {
		//flex: 1,
		//alignItems:  "center",
		margin: 10,
		width: win.height * 0.1,
		height: win.height * 0.1, 
	},

	imgsContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		padding: 5,
	},

	scrollView: {
		flexGrow: 1,
		flex: 1,
		height: win.height
	},

	itemImg: {
		flex: 1,
		width: win.height * 0.1,
		height: win.height * 0.1,
		alignSelf: 'stretch'
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
		height: "30%",
		backgroundColor: "#6699f8",
		justifyContent: "center",
		textAlign: "center",
		marginLeft: "auto",
		marginRight: "auto",
	},
});
