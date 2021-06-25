import * as React from "react";
import {
	View,
	ScrollView,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	SafeAreaView,
	Modal,
	Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Avatar from "../components/Avatar";
import { hatItems } from "../data/hatItems";
import { TouchableOpacity } from "react-native-gesture-handler";
import { shirtItems } from "../data/shirtItems";
import { accessorieItems } from "../data/accessorieItems";
import { trouserItems } from "../data/trouserItems";
import { avatarColors } from "../data/avatarColors";

import UserService from "./../services/user.service";
import { readData } from "../utilities/AsyncStorage";

import { Entypo } from "@expo/vector-icons";
import { withSafeAreaInsets } from "react-native-safe-area-context";

const win = Dimensions.get("window");

class Inventory extends React.Component {
	componentDidMount() {
		readData("user").then((user) => {
			this.setState({ userState: JSON.parse(JSON.parse(user)) });

			if (this.state.userState !== null) {
				UserService.getUserById(this.state.userState.id).then(
					(user) => {
						var trouserT;
						switch (user.avatar_trouser) {
							case "Trouser1":
								trouserT = "#34495E";
								break;
							case "Trouser2":
								trouserT = "#7B7D7D";
								break;
							case "Trouser3":
								trouserT = "#EAEDED";
								break;
							default:
								trouserT = user.avatar_trouser;
						}
						this.setState({
							skinColorState: user.avatar_color,
							hatNameState: user.avatar_hat,
							shirtNameState: user.avatar_shirt,
							accessorieNameState: user.avatar_accessorie,
							trouserNameState: trouserT,
						});
						this.forceRemount();
					}
				);
			}
		});

		if (this.state.userState !== null) {
			fetchApiUserById();
		}
	}

	forceRemount = () => {
		this.setState({ uniqueValue: this.state.uniqueValue + 1 });
	};

	refreshh = () => {
		this.setState({ accessorieName: "SunGlasses" });
		this.forceRemount();
	};

	changeHat = (hatName) => {
		if (
			hatName !== undefined &&
			this.state.hatNameState !== hatName &&
			this.state.changable === true
		) {
			this.setState({ hatNameState: hatName, changable: false });
			this.forceRemount();

			setTimeout(() => {
				this.setState({ changable: true });
			}, 3000);
		}
	};

	changeShirt = (shirtName) => {
		if (
			shirtName !== undefined &&
			this.state.shirtNameState !== shirtName &&
			this.state.changable === true
		) {
			this.setState({ shirtNameState: shirtName });
			this.forceRemount();

			setTimeout(() => {
				this.setState({ changable: true });
			}, 3000);
		}
	};

	changeAccessorie = (accessorieName) => {
		if (
			accessorieName !== undefined &&
			this.state.accessorieNameState !== accessorieName &&
			this.state.changable === true
		) {
			this.setState({ accessorieNameState: accessorieName });
			this.forceRemount();

			setTimeout(() => {
				this.setState({ changable: true });
			}, 3000);
		}
	};

	changeTrousers = (trouserName) => {
		if (
			trouserName !== undefined &&
			this.state.trouserNameState !== trouserName &&
			this.state.changable === true
		) {
			this.setState({ trouserNameState: trouserName });
			this.forceRemount();

			setTimeout(() => {
				this.setState({ changable: true });
			}, 3000);
		}
	};

	changeAvatarColor = (skinColor) => {
		if (skinColor !== undefined) {
			this.setState({ skinColorState: skinColor });
			this.forceRemount();
		}
	};

	saveAvatar = () => {
		UserService.update_user(
			this.state.skinColorState,
			this.state.hatNameState,
			this.state.shirtNameState,
			this.state.accessorieNameState,
			this.state.trouserNameState,
			this.state.userState.id
		);
	};

	getLevel = (account_level) => {
		var contador = 1;
		if (typeof account_level !== "undefined") {
			while (true) {
				var minimo =
					contador === 1 ? 0 : 400 * Math.pow(contador - 1, 1.1);
				var maximo = 400 * Math.pow(contador, 1.1);
				if (minimo <= account_level && account_level < maximo) {
					return contador;
				}
				contador++;
			}
		} else {
			return 0;
		}
	};

	listHats = () => {
		return hatItems.map((x) => {
			if (this.getLevel(this.state.userState.account_level) >= x.lvl) {
				return (
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
				);
			} else {
				return (
					<TouchableOpacity key={x.id}>
						<View style={styles.imgView}>
							<Image
								style={styles.itemLockedImg}
								resizeMode={"contain"}
								source={x.img}
							/>
							<Entypo
								name="lock"
								size={24}
								color="black"
								style={styles.lockIcon}
							/>
						</View>
					</TouchableOpacity>
				);
			}
		});
	};

	listShirts = () => {
		return shirtItems.map((x) => {
			if (this.getLevel(this.state.userState.account_level) >= x.lvl) {
				return (
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
				);
			} else {
				return (
					<TouchableOpacity key={x.id}>
						<View style={styles.imgView}>
							<Image
								style={styles.itemLockedImg}
								resizeMode={"contain"}
								source={x.img}
							/>
							<Entypo
								name="lock"
								size={24}
								color="black"
								style={styles.lockIcon}
							/>
						</View>
					</TouchableOpacity>
				);
			}
		});
	};

	listAccessories = () => {
		return accessorieItems.map((x) => {
			if (this.getLevel(this.state.userState.account_level) >= x.lvl) {
				return (
					<TouchableOpacity
						onPress={() => this.changeAccessorie(x.name)}
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
			} else {
				return (
					<TouchableOpacity key={x.id}>
						<View style={styles.imgView}>
							<Image
								style={styles.itemLockedImg}
								resizeMode={"contain"}
								source={x.img}
							/>
							<Entypo
								name="lock"
								size={24}
								color="black"
								style={styles.lockIcon}
							/>
						</View>
					</TouchableOpacity>
				);
			}
		});
	};

	listTrousers = () => {
		return trouserItems.map((x) => {
			if (this.getLevel(this.state.userState.account_level) >= x.lvl) {
				if (x.color[0] === "#") {
					return (
						<TouchableOpacity
							onPress={() => this.changeTrousers(x.name)}
							key={x.id}
							style={{
								backgroundColor: x.color,
								height: 70,
								width: 70,
								margin: 10,
							}}
						>
							<View>
								<Text> </Text>
							</View>
						</TouchableOpacity>
					);
				} else {
					return (
						<TouchableOpacity
							onPress={() => this.changeTrousers(x.name)}
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
			} else {
				if (x.color[0] === "#") {
					return (
						<TouchableOpacity
							onPress={() => this.changeTrousers(x.name)}
							key={x.id}
							style={{
								backgroundColor: x.color,
								height: 70,
								width: 70,
								margin: 10,
							}}
						>
							<View>
								<Text> </Text>
							</View>
						</TouchableOpacity>
					);
				} else {
					return (
						<TouchableOpacity key={x.id}>
							<View style={styles.imgView}>
								<Image
									style={styles.itemLockedImg}
									resizeMode={"contain"}
									source={x.img}
								/>
								<Entypo
									name="lock"
									size={24}
									color="black"
									style={styles.lockIcon}
								/>
							</View>
						</TouchableOpacity>
					);
				}
			}
		});
	};

	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
	};

	constructor(props) {
		super(props);
		this.state = {
			uniqueValue: 1,
			hatNameState: "none",
			shirtNameState: "none",
			accessorieNameState: "none",
			trouserNameState: "none",
			skinColorState: "#7B241C",
			option: "none",
			selectedLanguage: "...",
			userState: null,
			modalVisible: false,
			changable: true,
		};
		this.options = [{id: 0, label :"Chapéus", value: "chapeus"},
			{id:1, label: "Camisolas", value: "camisolas"},
			{id:2, label: "Acessórios", value: "acessorios"},
			{id:3, label: "Calças", value: "calcas"},
			{id:4, label: "Cor de Pele", value: "color"}
		];
	}

	render() {
		const { navigation } = this.props;

		return (
			<ScrollView style={styles.scrollView}>
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
					<SafeAreaView
						style={styles.container}
						key={this.state.uniqueValue}
					>
						<Avatar
							hatName={this.state.hatNameState}
							shirtName={this.state.shirtNameState}
							accessorieName={this.state.accessorieNameState}
							trouserName={this.state.trouserNameState}
							skinColor={this.state.skinColorState}
							profileCam={false}
						/>
					</SafeAreaView>

                    <View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
                            marginTop: 25
						}}
					>
						<Pressable
							style={[styles.button, styles.buttonOpen]}
							onPress={() => {
								this.setModalVisible(true);
							}}
						>
							<Text style={styles.textStyle}>Guardar</Text>
						</Pressable>
						<Pressable
							style={[styles.button, styles.buttonCancel]}
							onPress={() => navigation.navigate("Perfil")}
						>
							<Text style={styles.textStyle}>Cancelar</Text>
						</Pressable>
					</View>

					<View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 15, alignItems: "center", justifyContent: "center"}}>
						{this.options.map(option=>
							<TouchableOpacity key={option.id}
								style={{
									width: win.width/3-10,
									height: 40,
									alignItems: "center",
									margin: 5,
									borderColor: option.value===this.state.option ? "rgb(21, 161, 226)" : "white",
									borderWidth: 1,
									borderRadius: 1,
									backgroundColor: option.value===this.state.option ? "white" : "rgb(21, 161, 226)"
								}}
								onPress={()=>this.setState({
									selectedLanguage: option.value,
									option: option.value,
								})}
							>
								<Text style={{
									color: option.value===this.state.option ? "rgb(21, 161, 226)" : "white",
									fontFamily: "BubblegumSans",
									textAlign: "center",
									fontSize: 22,
									padding: 5
								}}>{option.label}</Text>
							</TouchableOpacity>
						)}
					</View>

					{this.state.option === "chapeus" && (
						<View style={styles.imgsContainer}>
							{this.listHats()}
						</View>
					)}

					{this.state.option === "camisolas" && (
						<View style={styles.imgsContainer}>
							{this.listShirts()}
						</View>
					)}

					{this.state.option === "acessorios" && (
						<View style={styles.imgsContainer}>
							{this.listAccessories()}
						</View>
					)}

					{this.state.option === "calcas" && (
						<View style={styles.imgsContainer}>
							{this.listTrousers()}
						</View>
					)}

					{this.state.option === "color" && (
						<View style={styles.imgsContainer}>
							{avatarColors.map((x) => {
								return (
									<TouchableOpacity
										onPress={() =>
											this.changeAvatarColor(x.color)
										}
										key={x.id}
										style={{
											backgroundColor: x.color,
											height: 70,
											width: 70,
											margin: 10,
										}}
									>
										<View>
											<Text> </Text>
										</View>
									</TouchableOpacity>
								);
							})}
						</View>
					)}

					<Modal
						animationType="slide"
						transparent={true}
						visible={this.state.modalVisible}
						onRequestClose={() => {
							this.setModalVisible(!this.state.modalVisible);
						}}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.modalTitle}>
									Guardar alterações
								</Text>
								<Text style={styles.modalText}>
									Tem a certeza que pretende guardar as
									alterações efetuadas?
								</Text>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<Pressable
										style={[
											styles.button,
											styles.buttonOpen,
										]}
										onPress={() => {
											this.setModalVisible(false);
											this.saveAvatar();
										}}
									>
										<Text style={styles.textStyle}>
											Guardar
										</Text>
									</Pressable>
									<Pressable
										style={[
											styles.button,
											styles.buttonCancel,
										]}
										onPress={() =>
											this.setModalVisible(
												!this.state.modalVisible
											)
										}
									>
										<Text style={styles.textStyle}>
											Cancelar
										</Text>
									</Pressable>
								</View>
							</View>
						</View>
					</Modal>
				</LinearGradient>
			</ScrollView>
		);
	}
}

export default Inventory;

const styles = StyleSheet.create({
	// Model
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "green",
		width: win.width / 3,
		marginRight: 10,
	},

	buttonCancel: {
		backgroundColor: "red",
		width: win.width / 3,
		marginLeft: 10,
	},

	textStyle: {
		color: "white",
		textAlign: "center",
		fontFamily: "BubblegumSans",
		fontSize: 20
	},
	modalTitle: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 30,
		fontFamily: "BubblegumSans"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontFamily: "BubblegumSans"
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
		//flexGrow: 1,
		flex: 1,
		//height: win.height,
		display: "flex",
		flexDirection: "column",
		//gap: 30
	},

	itemImg: {
		flex: 1,
		width: win.height * 0.1,
		height: win.height * 0.1,
		alignSelf: "stretch",
	},

	itemLockedImg: {
		flex: 1,
		width: win.height * 0.1,
		height: win.height * 0.1,
		alignSelf: "stretch",
		opacity: 0.5,
	},

	lockIcon: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},

	button: {
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: "#3a4e60",
		width: win.width / 2,
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
