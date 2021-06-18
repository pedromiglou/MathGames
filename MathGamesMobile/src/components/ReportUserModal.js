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
	TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import UserService from "../services/user.service";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import userService from "../services/user.service";
import { readData } from "../utilities/AsyncStorage";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";

const win = Dimensions.get("window");

function ReportUserModal(props) {
	const [selectedMotive, setSelectedMotive] = useState(null);

	async function report_player(player) {
		if (selectedMotive !== "motivo") {
			UserService.report_player(props.user.id, player, selectedMotive);
		}
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
					<Text style={styles.modalTitle}>Reportar Jogador</Text>
					<Text style={styles.modalText}>
						Tem a certeza que pretende reportar o jogador{" "}
						{props.modalUsername} ?
					</Text>
					<Picker
						style={styles.picker}
						//mode="dropdown"
						itemStyle={styles.itemStyle}
						selectedValue={selectedMotive}
						onValueChange={(itemValue, itemIndex) => {
							setSelectedMotive(itemValue);
						}}
					>
						<Picker.Item label="Motivo" value="motivo" />
						<Picker.Item label="Cheats" value="Cheats" />
						<Picker.Item label="Bug Abuse" value="Bug Abuse" />
					</Picker>
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
								report_player(props.modalUserId);
                                setSelectedMotive("motivo");
							}}
						>
							<Text style={styles.textStyle}>Reportar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.buttonModal, styles.buttonCancel]}
							onPress={() => {
								props.toggleModalVisibility();
                                setSelectedMotive("motivo");
							}}
						>
							<Text style={styles.textStyle}>Cancelar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}

export default ReportUserModal;

const styles = StyleSheet.create({
	picker: {
		width: 100,
	},
	itemStyle: {
		fontSize: 15,
		height: 75,
		color: "black",
		textAlign: "center",
		fontWeight: "bold",
		fontFamily: "BubblegumSans",
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
