import * as React from "react";
import { View, ScrollView, Text, Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";

import AuthService from "./../services/auth.service";
import UserService from "./../services/user.service";
import { readData } from "../utilities/AsyncStorage";

const win = Dimensions.get("window");

function LastGames({ navigation }) {
	const [games, setGames] = useState([]);
	const [user, setUser] = useState();

	useEffect(() => {
		let mounted = true;

		readData("user").then((user) => {
			var user = JSON.parse(JSON.parse(user));

			setUser(user);

			const interval = setInterval(() => {
				UserService.getLastGames(user.id, user.token).then(
					(response) => {
						if (!response.error) setGames(response);
					}
				);
			}, 5000);

			return () => {
				mounted: false;
				clearInterval(interval);
			};
		});
	}, []);

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
				<View>
					<View style={{ flexDirection: "row" }}>
						<View style={styles.dataCol}>
							<Text style={styles.dataColText}>Data</Text>
						</View>
						<View style={styles.dataCol}>
							<Text style={styles.dataColText}>Jogo</Text>
						</View>
						<View style={styles.dataCol}>
							<Text style={styles.dataColText}>Detalhes</Text>
						</View>
					</View>

					{games.length !== 0 &&
						Object.entries(games).map(([key, value]) => (
							<View
								style={
									(value["winner"] === "1" &&
										value["player1"] === user.id) ||
									(value["winner"] === "2" &&
										value["player2"] === user.id)
										? styles.winRow
										: styles.loseRow
								}
								key={key}
							>
								<View style={styles.infoCol}>
									<Text
										style={
											(value["winner"] === "1" &&
												value["player1"] === user.id) ||
											(value["winner"] === "2" &&
												value["player2"] === user.id)
												? styles.winText
												: styles.loseText
										}
									>
										{value.updatedAt}
									</Text>
								</View>
								<View style={styles.infoCol}>
									<Text
										style={
											(value["winner"] === "1" &&
												value["player1"] === user.id) ||
											(value["winner"] === "2" &&
												value["player2"] === user.id)
												? styles.winText
												: styles.loseText
										}
									>
										Rastros
									</Text>
								</View>
								<View style={styles.infoCol}>
									<Text
										style={
											(value["winner"] === "1" &&
												value["player1"] === user.id) ||
											(value["winner"] === "2" &&
												value["player2"] === user.id)
												? styles.winText
												: styles.loseText
										}
									>
										Detalhes
									</Text>
								</View>
							</View>
						))}

					{games.length === 0 && (
						<Text style={styles.noGames}>
							O seu histório de jogos esta vazio!
						</Text>
					)}
				</View>
			</ScrollView>
		</View>
	);
}

export default LastGames;

const styles = StyleSheet.create({
	noGames: {
		flex: 1,
		alignSelf: "center",
		color: "white",
		fontSize: 20,
		marginTop: 30,
		fontWeight: "bold",
		textDecorationLine: "underline",
	},

	winRow: {
		flexDirection: "row",
		borderWidth: 2,
		borderColor: "chartreuse",
		paddingTop: 5,
		paddingBottom: 5,
		marginTop: 10,
		backgroundColor: "white",
	},

	loseRow: {
		flexDirection: "row",
		borderWidth: 2,
		borderColor: "red",
		paddingTop: 5,
		paddingBottom: 5,
		marginTop: 10,
		backgroundColor: "white",
	},

	winText: {
		fontSize: 20,
		fontFamily: "BubblegumSans",
		color: "chartreuse",
		textAlign: "center",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},

	loseText: {
		fontSize: 20,
		fontFamily: "BubblegumSans",
		color: "red",
		textAlign: "center",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},

	infoCol: {
		flex: 1,
	},

	dataCol: {
		flex: 1,
		textAlign: "center",
		justifyContent: "center",
		backgroundColor: "#7158e2",
		borderWidth: 1,
		borderColor: "white",
	},

	dataColText: {
		fontSize: 20,
		fontFamily: "BubblegumSans",
		color: "white",
		textAlign: "center",
	},

	pageTitle: {
		fontSize: 40,
		textAlign: "center",
		fontFamily: "BubblegumSans",
		color: "white",
		padding: 10,
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
});
