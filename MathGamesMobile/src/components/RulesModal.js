import * as React from "react";
import {
	Text,
	Dimensions,
	StyleSheet,
	View,
	ScrollView,
	Modal,
	TouchableOpacity
} from "react-native";


const win = Dimensions.get("window");

function RulesModal(props) {

    return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={props.modalVisible}
			onRequestClose={() => {
				props.setModalVisible(false);
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<ScrollView style={{padding: 2}}>
						<Text style={styles.modalTitle}>Objetivo:</Text>
						<Text style={styles.modalText}>{props.game.goal}</Text>

						<Text style={styles.modalTitle}>Regras:</Text>
						<Text style={styles.modalText}>{props.game.rules}</Text>
					</ScrollView>

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
								props.setModalVisible(false);
							}}
						>
							<Text style={styles.textStyle}>Ok!</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}

export default RulesModal;

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
	},
	modalView: {
		height: win.height*0.8,
		marginLeft: win.width/20,
		marginRight: win.width/20,
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
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},

	buttonCancel: {
		backgroundColor: "red",
		width: win.width / 3,
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
		textAlign: "left",
		fontFamily: "BubblegumSans",
        fontSize: 18,
        fontWeight: '100'
	},
});
