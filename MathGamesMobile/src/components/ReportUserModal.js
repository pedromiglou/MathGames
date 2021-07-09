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

const win = Dimensions.get("window");

function ReportUserModal(props) {
	const reasons = ["Uso Batota", "Exploração de Bug", "Nome inapropriado"];
	const [selectedMotive, setSelectedMotive] = useState("");

	async function report_player(player) {
		if (selectedMotive !== "") {
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

					{reasons.map((reason, index)=>
						<TouchableOpacity key={index}
							style={selectedMotive===reason ? styles.buttonReason : styles.buttonReasonUnselected}
							onPress={()=>setSelectedMotive(reason)}
						>
							<Text style={selectedMotive===reason ? styles.textStyle : styles.textStyleUnselected}>{reason}</Text>
						</TouchableOpacity>
					)}

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: 15
						}}
					>
						{selectedMotive==="" ? <View style={{width: win.width / 3,
							marginLeft: win.width / 8,
							marginRight: 20}}></View> :
							<TouchableOpacity
								style={[styles.buttonModal, styles.buttonOpen]}
								onPress={() => {
									props.setVisible(false);
									report_player(props.modalUserId);
									setSelectedMotive("");
								}}
							>
								<Text style={styles.textStyle}>Confirmar</Text>
							</TouchableOpacity>
						}
						<TouchableOpacity
							style={[styles.buttonModal, styles.buttonCancel]}
							onPress={() => {
								props.setVisible(false);
                                setSelectedMotive("");
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

	buttonCancel: {
		backgroundColor: "red",
		width: win.width / 3,
		marginRight: win.width / 8,
	},

	buttonReason: {
		borderRadius: 20,
		padding: 5,
		elevation: 2,
		backgroundColor: "grey",
		width: win.width / 2,
		margin: 1
	},
	textStyle: {
		color: "white",
		textAlign: "center",
		fontFamily: "BubblegumSans",
		fontSize: 15
	},

	buttonReasonUnselected: {
		borderRadius: 20,
		padding: 5,
		elevation: 2,
		backgroundColor: "white",
		width: win.width / 2,
		margin: 1,
		borderWidth: 1,
		borderColor: "grey"
	},
	textStyleUnselected: {
		color: "grey",
		textAlign: "center",
		fontFamily: "BubblegumSans",
		fontSize: 15
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
		fontSize: 15
	},
});
