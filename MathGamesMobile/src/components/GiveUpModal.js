import * as React from "react";
import {
	Text,
	Dimensions,
	StyleSheet,
	View,
	TouchableOpacity
} from "react-native";

const win = Dimensions.get("window");

function GiveUpModal(props) {

	return (
		<View style={styles.centeredView}>
			<View style={styles.modalView}>
				<Text style={styles.modalTitle}>Aviso</Text>
				<Text style={styles.modalText}>
					Sair da página irá resultar em derrota imediata. Queres sair?
				</Text>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						style={[styles.buttonModal, styles.buttonOpen]}
						onPress={() => {
							props.closeAlert();
						}}
					>
						<Text style={styles.textStyle}>Cancelar</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.buttonModal, styles.buttonCancel]}
						onPress={() => {
							props.leaveGame();
							props.closeAlert()}
						}
					>
						<Text style={styles.textStyle}>Sair</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default GiveUpModal;

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
		backgroundColor: "#2196F3",
		width: win.width / 3,
		marginLeft: win.width / 8,
		marginRight: 20,
	},

	buttonCancel: {
		backgroundColor: "red",
		width: win.width / 3,
		marginRight: win.width / 8,
	},

	textStyle: {
		color: "white",
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
