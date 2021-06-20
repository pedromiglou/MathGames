import * as React from "react";
import { useState } from "react";
import {
	Text,
	Dimensions,
	StyleSheet,
	View,
	Modal,
	TouchableOpacity
} from "react-native";
import UserService from "../services/user.service";
import { Picker } from "@react-native-picker/picker";

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
			visible={props.visible}
			onRequestClose={() => {
				props.setVisible(false);
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
							alignItems: "center",
						}}
					>
						<TouchableOpacity
							style={[styles.buttonModal, styles.buttonOpen]}
							onPress={() => {
								props.setVisible(false);
								report_player(props.modalUserId);
                                setSelectedMotive("motivo");
							}}
						>
							<Text style={styles.textStyle}>Reportar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.buttonModal, styles.buttonCancel]}
							onPress={() => {
								props.setVisible(false);
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
