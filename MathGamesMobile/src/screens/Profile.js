import * as React from "react";
import { useState, useEffect } from "react";
import {
	View,
	ScrollView,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	SafeAreaView,
	TouchableHighlight,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import Avatar from "../components/Avatar";
import { gamesInfo } from "./../data/GamesInfo";
import { ranksInfo } from "../data/ranksInfo";

import { readData } from "../utilities/AsyncStorage";
import UserService from "../services/user.service";

// import * as Progress from 'react-native-progress';

const win = Dimensions.get("window");
//import { navigationRef } from "../App";
//import { DrawerActions } from "@react-navigation/native";

function Profile({ navigation }) {

	const [userInfos, setUserInfos] = useState({
		user: "",
		dict: [],
	});

	useEffect(() => {
		readData("user").then((user) => {
			var current_user = JSON.parse(JSON.parse(user));

			setUserInfos({
				user: current_user,
				dict: [],
			});
		});

		const interval = setInterval(() => {
			readData("user").then((user) => {
                var current_user = JSON.parse(JSON.parse(user));

				UserService.getUserRanksById(current_user.id).then(
					(response) => {
						var ranks_dict = getRanks(response);

						if (ranks_dict != undefined)
							setUserInfos({
								user: current_user,
								dict: ranks_dict,
							});
					}
				);
			});
		}, 10000);

		return () => {
			mounted: false;
			clearInterval(interval);
		};
	}, []);

	const getLevel = (account_level) => {
		var contador = 1;
		if (typeof account_level !== "undefined") {
			while (true) {
				var minimo =
					contador === 1 ? 0 : 400 * Math.pow(contador - 1, 1.1);
				var maximo = 400 * Math.pow(contador, 1.1);
				if (minimo <= account_level && account_level < maximo) {
					return contador;
				}
				contador++;
			}
		} else {
			return 0;
		}
	};

	const getBarProgression = (account_level) => {
		var nivel_atual = getLevel(account_level);
		var minimo = 400 * Math.pow(nivel_atual - 1, 1.1);
		var maximo = 400 * Math.pow(nivel_atual, 1.1);
		return ((account_level - minimo) / (maximo - minimo)) * 100;
	};

	const getRanks = (current_user_rank) => {
		var ranks_dict = {};
		for (const [, value] of Object.entries(gamesInfo)) {
			if (value["toBeDone"] === false) {
				var userRankValue;
				var userRank = 0;
				switch (value["id"]) {
					case 0:
						userRankValue = current_user_rank.rastros;
						break;
					case 1:
						userRankValue = current_user_rank.gatos_e_caes;
						break;
					default:
						userRankValue = 0;
						break;
				}

				if (userRankValue <= 25) userRank = 0;
				else if (userRankValue <= 75) userRank = 1;
				else if (userRankValue <= 175) userRank = 2;
				else if (userRankValue <= 275) userRank = 3;
				else if (userRankValue <= 400) userRank = 4;
				else if (userRankValue <= 550) userRank = 5;
				else if (userRankValue <= 700) userRank = 6;
				else if (userRankValue <= 850) userRank = 7;
				else if (userRankValue <= 1050) userRank = 8;
				else if (userRankValue <= 1250) userRank = 9;
				else if (userRankValue <= 1450) userRank = 10;
				else if (userRankValue <= 1700) userRank = 11;
				else userRank = 12;

				ranks_dict[value["id"]] = userRank;
			}
		}
        return ranks_dict;
	};

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
			<ScrollView>
				<View style={{ flexDirection: "row" }}>
					<View style={{ flex: 1 }}>
						<TouchableHighlight
							onPress={() => navigation.navigate("Inventario")}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Inventário</Text>
						</TouchableHighlight>
					</View>
					<View style={{ flex: 1 }}>
						<TouchableHighlight
							onPress={() => navigation.navigate("Ultimos Jogos")}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Últimos Jogos</Text>
						</TouchableHighlight>
					</View>
				</View>

				<View>
					<Text style={styles.playerName}>
						{userInfos.user != undefined
							? userInfos.user.username
							: "Nome"}
					</Text>
				</View>

				<Text style={{ textAlign: "center", color: "white" }}>
					{getLevel(userInfos.user.account_level)} Nivel{" "}
					{getLevel(userInfos.user.account_level) + 1}
				</Text>
				<View style={styles.levelProgress}>
					{/* <Text style={{flex: 1}}>{getLevel(userInfos.user.account_level)}</Text> */}
					{/* <View style={styles.progressBar}>
						<Progress.Bar progress={ getBarProgression(userInfos.user.account_level)/100 } width={200} color={'orange'}/>
					</View> */}
					{/* <Text style={{flex: 1}}>{getLevel(userInfos.user.account_level) + 1}</Text> */}
				</View>

				{Object.entries(gamesInfo).map(
					([key, value]) =>
						value["toBeDone"] === false && (
							<View
								key={key}
								style={{
									flexDirection: "row",
									borderColor: "white",
									marginLeft: 5,
									marginRight: 5,
									borderBottomWidth: 2,
								}}
							>
								<View style={styles.imgDiv}>
									<Image
										style={styles.gameImg}
										resizeMode={"contain"}
										source={value["img"]}
									/>
								</View>

								<View style={{ width: win.width / 3.5 }}>
									<Text style={styles.gameTitle}>
										{value["title"]}
									</Text>
								</View>

								<View style={{ width: win.width / 2.5 }}>
									{ranksInfo[userInfos.dict[key]] !=
										undefined &&
										ranksInfo[userInfos.dict[key]] !=
											null && (
											<Image
												style={styles.rankImg}
												resizeMode={"contain"}
												source={
													ranksInfo[
														userInfos.dict[key]
													].image
												}
											/>
										)}
								</View>
							</View>
						)
				)}
			</ScrollView>
		</View>
	);
}

export default Profile;

const styles = StyleSheet.create({
	levelProgress: {
		flexDirection: "row",
		marginBottom: 40,
	},

	progressBar: {
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: 30,
		marginTop: 15,
	},

	scrollView: {
		//flex: 1,
		display: "flex",
		flexDirection: "column",
	},

	playerName: {
		fontSize: 40,
		textAlign: "center",
		fontFamily: "BubblegumSans",
		color: "white",
		padding: 15,
	},

	image: {
		width: win.width,
		height: (win.width * 360) / 1463,
		padding: 10,
		margin: 5,
	},

	gameImg: {
		width: win.width / 3,
		height: (win.width * 360) / 1363,
		marginLeft: 0,
	},

	rankImg: {
		width: win.width / 2,
		height: (win.width * 360) / 1863,
		marginLeft: 0,
		marginTop: 15,
	},

	imgDiv: {
		flexDirection: "row",
	},

	gameTitle: {
		width: win.width / 3,
		fontFamily: "BubblegumSans",
		color: "white",
		justifyContent: "center",
		marginTop: (win.width * 360) / 1450 / 2,
		fontSize: 20,
	},

	button: {
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: "#3a4e60",
		width: win.width / 2,
	},

	buttonText: {
		color: "#fff",
		textAlign: "center",
		fontFamily: "BubblegumSans",
		fontSize: 18,
		padding: 10,
	},

	avatarContainer: {
		alignItems: "center",
		width: "60%",
		height: "30%",
		backgroundColor: "#6699f8",
		justifyContent: "center",
		textAlign: "center",
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: 20,
	},
});
