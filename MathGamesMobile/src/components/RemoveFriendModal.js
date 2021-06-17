import * as React from "react";
import { useState, useEffect } from "react";
import {
	ScrollView,
	Text,
	Dimensions,
	StyleSheet,
	View,
	Modal,
	TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import UserService from "../services/user.service";
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import userService from "../services/user.service";
import { readData } from "../utilities/AsyncStorage";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";

const win = Dimensions.get("window");

function RemoveFriendModal(props) {

	function remove_friend(friendId) {
		UserService.remove_friend(props.user.id, friendId).then((result) => {
			if (result != "error") {
				const newFriends = props.friends.filter(
					(user) => user.id !== friendId
				);

				props.settingFriends(newFriends);
			}
		});
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={props.modalVisible}
			onRequestClose={() => {
				props.toggleModalVisibility();
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalTitle}>Remover</Text>
					<Text style={styles.modalText}>
						Tem a certeza que pretende remover {props.modalUsername} da
						lista de amigos?
					</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<TouchableOpacity
							style={[styles.buttonModal, styles.buttonOpen]}
							onPress={() => {
								props.toggleModalVisibility();
								remove_friend(props.modalUserId);
							}}
						>
							<Text style={styles.textStyle}>Remover</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.buttonModal, styles.buttonCancel]}
							onPress={() => props.toggleModalVisibility()}
						>
							<Text style={styles.textStyle}>Cancelar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}

export default RemoveFriendModal;

const styles = StyleSheet.create({
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
});
