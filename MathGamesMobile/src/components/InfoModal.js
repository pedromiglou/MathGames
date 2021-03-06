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
				<Text style={styles.modalTitle}>{props.title}</Text>
				<Text style={styles.modalText}>
					{props.text}
				</Text>
				<View style={{ alignItems: "center" }}>
					<TouchableOpacity
						style={[styles.buttonModal, styles.buttonOpen]}
						onPress={() => {
							props.closeAlert();
						}}
					>
						<Text style={styles.textStyle}>Fechar Aviso</Text>
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
