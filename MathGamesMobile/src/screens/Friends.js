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
import UserService from "./../services/user.service";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { readData } from "../utilities/AsyncStorage";
import ChooseGameModal from './../components/ChooseGameModal';
import RemoveFriendModal from "../components/RemoveFriendModal";
import AddFriendModal from "../components/AddFriendModal";
import socket from "../utilities/Socket";

const win = Dimensions.get("window");

function Friends({ navigation }) {
	const [friends, setFriends] = useState([]);
	const [user, setUser] = useState("");
	const [modalUserId, setModalUserId] = useState("");
	const [modalUsername, setModalUsername] = useState("");
	const [modalOperation, setModalOperation] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const [inputText, onChangeInputText] = useState("");

	function reloadFriends() {
		readData("user").then(user=>{
			user = JSON.parse(JSON.parse(user));
			UserService.getFriends(user.id, user.token).then(response=>{
				if ( response != null ) {
					setFriends(response);
				}
			});
		});
	}

	function friendRequest(username) {
		UserService.getUserByUsername(username).then(friend=>{
			onChangeInputText("");
			if (friend!==null) {
				setModalUserId(friend.id);
				setModalUsername(friend.username);
				setModalOperation("add");
				setModalVisible(true);
			}
		});
	}

	useEffect(() => {
		let mounted = true;
		readData("user").then(user=>setUser(JSON.parse(JSON.parse(user))));
		reloadFriends();
  
		return () => {
		  	mounted = false;
		};
	}, []);
    
    socket.on("reload_notifications", () => {
      reloadFriends();
    });

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
			<ScrollView     style={{ minHeight: win.height, minWidth: win.width }}>
				{friends.length === 0 && (
					<View>
						<Text style={styles.noFriends}>
							Ainda não tem amigos
						</Text>
					</View>
				)}
				{friends.map((friend) => (
					<View
						key={friend.id}
						style={{
							flexDirection: "row",
							width: win.width,
							borderBottomWidth: 2,
							borderBottomColor: "white",
						}}
					>
						<Text style={styles.item}>{friend.username}</Text>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								setModalUserId(friend.id);
								setModalUsername(friend.username);
								setModalOperation("invite");
								setModalVisible(true);
							}}
						>
							<FontAwesome
								name="envelope-o"
								size={30}
								color="white"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								setModalUserId(friend.id);
								setModalOperation("remove");
								setModalVisible(true);
							}}
						>
							<Feather
								name="user-minus"
								size={30}
								color="white"
							/>
						</TouchableOpacity>
					</View>
				))}

				<TextInput
					style={styles.input}
					placeholder="Escreva o nome do amigo para o adicionar"
					onChangeText={onChangeInputText}
					value={inputText}
				/>
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => friendRequest(inputText)}
				>
					<Text style={styles.addButtonText}>Enviar pedido de amizade</Text>
				</TouchableOpacity>

				{modalOperation === "remove" && (
					<RemoveFriendModal
						setVisible={setModalVisible}
						setFriends={setFriends}
						modalUserId={modalUserId}
						modalUsername={modalUsername}
						friends={friends}
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
					/>
				)}
				{modalOperation === "invite" && (
					<ChooseGameModal
						visible={modalVisible}
						setVisible={setModalVisible}
						opponent={modalUserId}
					/>
				)}
			</ScrollView>
			
		</View>
	);
}

export default Friends;

const styles = StyleSheet.create({
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
	},
	modalTitle: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 30,
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},

	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderColor: "white",
		borderRadius: 10,
		backgroundColor: "white",
		color: "black",
		marginTop: 70,
		textAlign: "center",
		fontFamily: "BubblegumSans"
	},
	noFriends: {
		fontSize: 30,
		padding: 20,
		paddingTop: 50,
		textAlign: "center",
		fontFamily: "BubblegumSans",
		color: "white"
	},
	title: {
		fontSize: 40,
		padding: 10,
		textAlign: "center",
		fontFamily: "BubblegumSans",
		color: "white",
	},
	item: {
		fontSize: 30,
		padding: 20,
		textAlign: "left",
		fontFamily: "BubblegumSans",
		color: "white",
		flex: 1,
	},
	button: {
		marginLeft: 20,
		marginRight: 0,
		padding: 20,
		marginRight: "auto",
		flex: 1,
	},
	addButton: {
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: 10,
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 5
	},
	addButtonText: {
		fontSize: 25,
		color: "white",
		fontFamily: "BubblegumSans",
		margin: 5
	},
});
