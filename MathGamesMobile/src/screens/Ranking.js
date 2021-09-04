import * as React from "react";
import { useState, useEffect } from "react";
import {
	ScrollView,
	Text,
	Dimensions,
	StyleSheet,
	View,
	TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import UserService from "../services/user.service";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { readData } from "../utilities/AsyncStorage";
import { Feather } from "@expo/vector-icons";

import AddFriendModal from "../components/AddFriendModal";
import ReportUserModal from "../components/ReportUserModal";
import RemoveFriendModal from "../components/RemoveFriendModal";

const win = Dimensions.get("window");

function Ranking({ navigation }) {
	const [usersFound, setUsersFound] = useState([]);

	const [user, setUser] = useState(null);
	const [friends, setFriends] = useState([]);

	const [modalOperation, setModalOperation] = useState("");
	const [modalUserId, setModalUserId] = useState("");
	const [modalUsername, setModalUsername] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const [searchVisibility, setSearchVisibility] = useState(false);
	const [inputText, onChangeInputText] = useState(null);

	function reloadFriends() {
		readData("user").then(user=>{
			if (user!==null) {
				user = JSON.parse(JSON.parse(user));
				UserService.getFriends(user.id, user.token).then(response=>{
					if ( response != null ) {
						setFriends(response);
					}
				});
			}
		});
	}

	useEffect(() => {
		let mounted = true;
		readData("user").then(user=>{
			setUser(JSON.parse(JSON.parse(user)));
		})
		reloadFriends();
		UserService.getUsers("", "", "", 0, 10).then((res) => {
			setUsersFound(res.users);
		});
  
		return () => {
		  	mounted = false;
		};
	}, []);

	useEffect(()=>{
		const unsubscribe = navigation.addListener('focus', () => {
			reloadFriends();
			UserService.getUsers("", "", "", 0, 10).then((res) => {
				setUsersFound(res.users);
			});
		});
  
		return unsubscribe;
  
	}, [navigation])

	const getLevel = (account_level) => {
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

	function resetRanks() {
		UserService.getUsers("").then((res) => {
			setUsersFound(res.users);
		});
	}

	function fetchUserByUsername(username) {
		UserService.getUsers(username, "", "", 0, 10).then((result) => {
			const usersFoundInFecth = result.users;
			setUsersFound(usersFoundInFecth);
		});
	}

	var rankPosition = 1;

	return (
		<View>
			<View style={{ position: "absolute", x: 0, y: 0 }}>
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
					<View
						style={{ minHeight: win.height, minWidth: win.width }}
					></View>
				</LinearGradient>
			</View>
			<ScrollView>
				<Text style={styles.title}>Classificações</Text>
				{searchVisibility === false ? (
					<View style={styles.searchButtonToggle}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								setSearchVisibility(!searchVisibility);
							}}
						>
							<View>
								<Feather
									name="search"
									size={30}
									color="white"
								/>
							</View>
						</TouchableOpacity>
					</View>
				) : (
					<>
						<View style={styles.resetButtonToggle}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									resetRanks();
									setSearchVisibility(!searchVisibility);
								}}
							>
								<View>
									<Feather
										name="refresh-ccw"
										size={30}
										color="white"
									/>
								</View>
							</TouchableOpacity>
						</View>
						<View style={styles.searchButtonToggle}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									setSearchVisibility(!searchVisibility);
								}}
							>
								<View>
									<Feather name="x" size={30} color="white" />
								</View>
							</TouchableOpacity>
						</View>
						<View>
							<TextInput
								style={styles.input}
								placeholder="Escreve o nome para procurar"
								onChangeText={onChangeInputText}
							/>
							<TouchableOpacity
								style={styles.searchButton}
								onPress={() => {
									fetchUserByUsername(inputText);
								}}
							>
								<View
									style={{
										flexDirection: "row",
									}}
								>
									<View>
										<Feather
											name="search"
											size={30}
											color="white"
										/>
									</View>
									<View style={{ marginLeft: 10 }}>
										<Text style={styles.searchButtonText}>
											Pesquisar
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					</>
				)}

				{user !== null ? (
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							marginBottom: 10,
							marginTop: 10,
						}}
					>
						<View style={styles.topBoxName}>
							<Text style={styles.topText}>Nome</Text>
						</View>
						<View style={styles.topBoxLevel}>
							<Text style={styles.topText}>Nivel</Text>
						</View>
						<View style={styles.topBoxExp}>
							<Text style={styles.topText}>Experiência</Text>
						</View>
						<View style={styles.topBoxActions}>
							<Text style={styles.topText}>Ações</Text>
						</View>
					</View>
				) : (
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							marginBottom: 10,
						}}
					>
						<View style={styles.topBoxName}>
							<Text style={styles.topText}>Nome</Text>
						</View>
						<View style={styles.topBoxLevel}>
							<Text style={styles.topText}>Nivel</Text>
						</View>
						<View style={styles.topBoxExp}>
							<Text style={styles.topText}>Experiência</Text>
						</View>
					</View>
				)}

				{usersFound.map((found) => {
					return user !== null ? (
						<View key={found.id} style={styles.playerRow}>
							<View style={styles.itemName}>
								<Text style={styles.itemTextName}>
									{rankPosition++ + ".  " + found.username}
								</Text>
							</View>
							<View style={styles.itemLevel}>
								<Text style={styles.itemText}>
									{getLevel(found.account_level)}
								</Text>
							</View>
							<View style={styles.itemExp}>
								<Text style={styles.itemText}>
									{found.account_level}
								</Text>
							</View>

							<View style={{ flex: 1, flexDirection: "row" }}>
								{friends.some(
									(element) =>
										element.username === found.username
								) === false ? (
									<>
										{found.username !== user.username && (
											<>
												<TouchableOpacity
													style={styles.button}
													onPress={() => {
														setModalOperation(
															"add"
														);
														setModalVisible(true);
														setModalUserId(
															found.id
														);
														setModalUsername(
															found.username
														);
													}}
												>
													<AntDesign
														name="adduser"
														size={30}
														color="white"
													/>
												</TouchableOpacity>
												<TouchableOpacity
													style={styles.button}
													onPress={() => {
														setModalOperation(
															"report"
														);
														setModalVisible(true);
														setModalUserId(
															found.id
														);
														setModalUsername(
															found.username
														);
													}}
												>
													<MaterialIcons
														name="report"
														size={25}
														color="white"
													/>
												</TouchableOpacity>
											</>
										)}
									</>
								) : (
									<>
										<TouchableOpacity
											style={styles.button}
											onPress={() => {
												setModalOperation("remove");
												setModalVisible(true);
												setModalUserId(found.id);
												setModalUsername(
													found.username
												);
											}}
										>
											<AntDesign
												name="deleteuser"
												size={30}
												color="white"
											/>
										</TouchableOpacity>
										<TouchableOpacity
											style={styles.button}
											onPress={() => {
												setModalOperation("report");
												setModalVisible(true);
												setModalUserId(found.id);
												setModalUsername(
													found.username
												);
											}}
										>
											<MaterialIcons
												name="report"
												size={25}
												color="white"
											/>
										</TouchableOpacity>
									</>
								)}
							</View>
						</View>
					) : (
						<View
							key={found.id}
							style={{
								flex: 1,
								flexDirection: "row",
								borderBottomWidth: 2,
								borderColor: "white",
							}}
						>
							<View style={styles.itemName}>
								<Text style={styles.itemTextName}>
									{rankPosition++ + ".  " + found.username}
								</Text>
							</View>
							<View style={styles.itemLevel}>
								<Text style={styles.itemText}>
									{getLevel(found.account_level)}
								</Text>
							</View>
							<View style={styles.itemExp}>
								<Text style={styles.itemText}>
									{found.account_level}
								</Text>
							</View>
						</View>
					);
				})}

				{modalOperation === "report" && (
					<ReportUserModal
						setVisible={setModalVisible}
						modalUserId={modalUserId}
						modalUsername={modalUsername}
						user={user}
						visible={modalVisible}
					/>
				)}
				{modalOperation === "add" && (
					<AddFriendModal
						setVisible={setModalVisible}
						modalUserId={modalUserId}
						modalUsername={modalUsername}
						user={user}
						visible={modalVisible}
						reloadFriends={reloadFriends}
					/>
				)}
				{modalOperation === "remove" && (
					<RemoveFriendModal
						setVisible={setModalVisible}
						setFriends={setFriends}
						modalUserId={modalUserId}
						modalUsername={modalUsername}
						friends={friends}
						user={user}
						visible={modalVisible}
						reloadFriends={reloadFriends}
					/>
				)}
			</ScrollView>
		</View>
	);
}

export default Ranking;

const styles = StyleSheet.create({
	playerRow: {
		flex: 1,
		flexDirection: "row",
		borderBottomWidth: 2,
		borderColor: "white",
	},
	playerRowUser: {
		flex: 1,
		flexDirection: "row",
		borderBottomWidth: 2,
		borderBottomColor: "white",
		borderLeftWidth: 2,
		borderLeftColor: "gold",
	},
	searchButtonToggle: {
		position: "absolute",
		right: 0,
		top: 0,
		paddingRight: 20,
		paddingTop: 10,
	},

	resetButtonToggle: {
		position: "absolute",
		left: 0,
		top: 0,
		paddingRight: 20,
		paddingTop: 10,
	},

	// Model
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		//marginTop: 22,
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
	buttonModal: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "green",
		width: win.width / 3,
		marginLeft: win.width / 8,
		marginRight: 20,
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},

	buttonCancel: {
		backgroundColor: "red",
		width: win.width / 3,
		marginRight: win.width / 8,
	},

	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: "BubblegumSans",
	},
	modalTitle: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 30,
		fontFamily: "BubblegumSans",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontFamily: "BubblegumSans",
	},

	//
	topText: {
		alignSelf: "center",
		color: "white",
		fontWeight: "bold",
		fontFamily: "BubblegumSans",
	},

	itemStyle: {
		fontSize: 15,
		height: 75,
		color: "black",
		textAlign: "center",
		fontWeight: "bold",
		fontFamily: "BubblegumSans",
	},
	title: {
		fontSize: 40,
		padding: 10,
		textAlign: "center",
		fontFamily: "BubblegumSans",
		color: "white",
	},

	topBoxName: {
		flex: 1.5,
	},
	topBoxLevel: {
		flex: 0.5,
	},
	topBoxExp: {
		flex: 1,
	},
	topBoxActions: {
		flex: 1,
	},

	itemName: {
		flex: 1.5,
		padding: 10,
	},
	itemLevel: {
		flex: 0.5,
		padding: 10,
	},
	itemExp: {
		flex: 1,
		padding: 10,
	},

	itemText: {
		fontSize: 20,
		alignSelf: "center",
		textAlign: "left",
		fontFamily: "BubblegumSans",
		color: "white",
	},

	itemTextName: {
		fontSize: 20,
		textAlign: "left",
		fontFamily: "BubblegumSans",
		color: "white",
	},

	itemTextNameUser: {
		fontSize: 20,
		textAlign: "left",
		fontFamily: "BubblegumSans",
		color: "white",
		fontWeight: "bold",
	},

	button: {
		marginLeft: 10,
		marginTop: 10,
		borderRadius: 30,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderColor: "white",
		borderRadius: 10,
		backgroundColor: "white",
		color: "black",
		marginTop: 10,
		alignContent: "center",
		alignSelf: "center",
		width: win.width * 0.8,
		textAlign: "center",
	},
	searchButton: {
		marginLeft: "auto",
		marginRight: "auto",
		//marginTop: 10,
		marginBottom: 30,
	},
	searchButtonText: {
		fontSize: 25,
		color: "white",
	},
});
