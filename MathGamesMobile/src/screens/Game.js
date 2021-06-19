import * as React from 'react';
import {useState} from 'react';
import {ScrollView, Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import RastrosEngine from './../games/rastros/RastrosEngine';
import GatosCaesEngine from './../games/gatoscaes/GatosCaesEngine';
import { LinearGradient } from 'expo-linear-gradient';
import {readData, saveData} from './../utilities/AsyncStorage';
import Loading from './../components/Loading';
import {gamesInfo} from "./../data/GamesInfo";
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
    readData("game").then(value => {if (value !== null) {setGame(JSON.parse(value));}})

    readData('gameMode').then(mode=>{
        gameMode = mode.slice(1,-1);

        //code executed by an invited user
        if (gameMode==="Invited"&&ready===-1) {
            saveData("gameMode", "Amigo");
            readData("user_id").then(user_id=>{
                user_id = user_id.slice(1,-1);
                readData("opponent").then(opponent=>{
                    socket.once("match_link", (msg) => {
                        if (msg["match_id"]) {
                            saveData("match_id", msg['match_id']);
                            saveData("game", gamesInfo[Number(msg['game_id'])]);
                            socket.emit("entered_invite", {"user_id": user_id, "outro_id": opponent,
                                "match_id": msg['match_id'], "game_id": Number(msg['game_id'])});
                        } else if (msg["error"]) {
                            Alert.alert("Error inviting player", "there was an error");
                        }
                    });
                    
                    socket.emit("get_match_id", {"user_id": user_id, "outro_id": opponent})
        
                    socket.once("match_found", (msg) => {
                        saveData('match_id', msg['match_id']);
                        saveData('player1', msg['player1']);
                        saveData('player2', msg['player2']);
                        readData('game').then(game=>{
                            game = JSON.parse(game);
                            setReady(game.id);
                        });
                    });
                });
            });

        //code executed by an inviting user
        } else if (gameMode==="Inviter"&&ready===-1) {
            saveData("gameMode", "Amigo");
            socket.once("invite_link", (msg) => {
                if (msg["match_id"]) {
                  saveData("match_id", msg['match_id']);
                } else {
                  Alert.alert("Não foi possível convidar", "Criaste um link recentemente, espera mais um pouco até criares um novo.")
                }
            });
            readData("user_id").then(user_id=>{
                user_id = user_id.slice(1,-1);
                readData("opponent").then(opponent=>{
                    readData("game").then(game=>{
                        game=JSON.parse(game);
                        socket.emit("generate_invite", {"user_id": user_id, "outro_id": opponent, "game_id": game.id});
                    })
                })
            });

            socket.once("match_found", (msg) => {
                saveData('match_id', msg['match_id']);
                saveData('player1', msg['player1']);
                saveData('player2', msg['player2']);
                readData('game').then(game=>{
                    game = JSON.parse(game);
                    setReady(game.id);
                });
            });

        //code executed for competitive, AI and in same device
        } else if (gameMode!=="Amigo"&&ready===-1) { 
            readData('game').then(game=>{
                game_id = JSON.parse(game).id;
                //se for fazer as primeiras comunicacoes com o servidor
                if (gameMode==="Competitivo") {
                    readData('user_id').then(id=>{
                        user_id = id.slice(1,-1);
                        socket.emit("user_id", {"user_id": user_id, "game_id": String(game_id)});
                        socket.on("match_found", (msg) => {
                            saveData('match_id', String(msg['match_id']));
                            saveData('player1', msg['player1']);
                            saveData('player2', msg['player2']);
                            setReady(game_id);
                        });
                    });
                } else {
                    setReady(game_id);
                }
            });

        }
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
