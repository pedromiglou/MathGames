import * as React from "react";
import { useState } from "react";
import {
	ScrollView,
	Dimensions,
	View,
	StyleSheet,
	TouchableOpacity,
	Button,
} from "react-native";
import RastrosEngine from "./../games/rastros/RastrosEngine";
import GatosCaesEngine from "./../games/gatoscaes/GatosCaesEngine";
import { LinearGradient } from "expo-linear-gradient";
import { readData, saveData } from "./../utilities/AsyncStorage";
import Loading from "./../components/Loading";
import socket from "./../utilities/Socket";
import { Feather } from "@expo/vector-icons";
import RulesModal from "../components/RulesModal";

const win = Dimensions.get("window");

function Game({ navigation }) {
	//wait until everything is ready
	const [ready, setReady] = useState(-1);
	const [modalVisible, setModalVisible] = useState(false);
    const [game, setGame] = useState({name: ""});

	var game_id;
	var gameMode;
	var user_id;
	readData("game").then((game) => {
        readData("game").then(value => {if (value !== null) {setGame(JSON.parse(value));}})

		game_id = JSON.parse(game).id;
		readData("gameMode").then((mode) => {
			gameMode = mode.slice(1, -1);
			//se for fazer as primeiras comunicacoes com o servidor
			if (gameMode === "Competitivo") {
				readData("user_id").then((id) => {
					user_id = id.slice(1, -1);
					socket.emit("user_id", {
						user_id: user_id,
						game_id: String(game_id),
					});
					socket.on("match_found", (msg) => {
						saveData("match_id", msg["match_id"]);
						saveData("player1", msg["player1"]);
						saveData("player2", msg["player2"]);
						setReady(game_id);
					});
				});
			} else {
				setReady(game_id);
			}
		});
	});

	function toggleModalVisibility() {
		setModalVisible(!modalVisible);
	}

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

			<View style={styles.help}>
				<TouchableOpacity
					style={styles.buttonHelp}
					onPress={() => {
						//setModalVisible(true);
					}}
				>
					<View>
						<Feather name="help-circle" size={30} color="white" />
					</View>
				</TouchableOpacity>
			</View>

			{ready === -1 && <Loading />}

			{ready === 0 && (
				<ScrollView>
					<RastrosEngine></RastrosEngine>
				</ScrollView>
			)}

			{ready === 1 && (
				<ScrollView>
					<GatosCaesEngine></GatosCaesEngine>
				</ScrollView>
			)}

			{modalVisible === true && (
				{/* <RulesModal
					toggleModalVisibility={toggleModalVisibility}
					modalVisible={modalVisible}
					game={game}
				/> */}
			)}
		</View>
	);
}

export default Game;

const styles = StyleSheet.create({
	help: {
		position: "absolute",
		right: 0,
		top: 0,
		paddingRight: 20,
		paddingTop: 10,
		zIndex: 1,
	},

	buttonHelp: {
		marginLeft: 10,
		marginTop: 10,
		borderRadius: 30,
	},
});
