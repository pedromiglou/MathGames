import * as React from "react";
import {
	View,
	ScrollView,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	TouchableHighlight,
} from "react-native";
import { saveData } from "./../utilities/AsyncStorage";
import { LinearGradient } from "expo-linear-gradient";
import { gamesInfo } from "./../data/GamesInfo";
import { FontAwesome5 } from "@expo/vector-icons";
const win = Dimensions.get("window");

function ChooseGame({ navigation }) {
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
				{gamesInfo.map((X) => {
					return X.toBeDone === true ? (
						<View key={X.id}>
							<TouchableHighlight
								style={styles.gameTile}
							>
								<View>
									<LinearGradient
										colors={["gray", "gray"]}
										start={[1, 1]}
										end={[0, 0]}
										style={{ flexDirection: "row" }}
									>
										<View
											style={{ width: win.width * 0.6 }}
										>
											<View
												style={{ flexDirection: "row" }}
											>
												<Text style={styles.title}>
													{X.title}
												</Text>
												<Text style={styles.title}>
													+{X.age}
												</Text>
											</View>

											<Text style={styles.description}>
												{X.description}
											</Text>
											<Text style={styles.description}>
												Toca para jogar!
											</Text>
										</View>
										<FontAwesome5
											name="hammer"
											size={(win.width * 360) / 2000}
											color="white"
											//style={styles.icon}
											style={{
												marginTop: 'auto',
                                                marginBottom: 'auto',
												marginLeft: 'auto',
                                                marginRight: 'auto',
											}}
										/>
									</LinearGradient>
								</View>
							</TouchableHighlight>
						</View>
					) : (
						<View key={X.id}>
							<TouchableHighlight
								style={styles.gameTile}
								onPress={() => {
									saveData("game", X);
									navigation.navigate("Jogo");
								}}
							>
								<View>
									<LinearGradient
										colors={["#faad06", "#b1310a"]}
										start={[1, 1]}
										end={[0, 0]}
										style={{ flexDirection: "row" }}
									>
										<View
											style={{ width: win.width * 0.6 }}
										>
											<View
												style={{ flexDirection: "row" }}
											>
												<Text style={styles.title}>
													{X.title}
												</Text>
												<Text style={styles.title}>
													+{X.age}
												</Text>
											</View>

											<Text style={styles.description}>
												{X.description}
											</Text>
											<Text style={styles.description}>
												Toca para jogar!
											</Text>
										</View>
										<Image
											style={styles.image}
											resizeMode={"contain"}
											source={X.img}
										/>
									</LinearGradient>
								</View>
							</TouchableHighlight>
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
}

export default ChooseGame;

const styles = StyleSheet.create({
	gameTile: {
		margin: 10,
		backgroundColor: "#CCFFFF",
		borderColor: "white",
		borderRadius: 2,
		borderWidth: 2,
	},
	image: {
		flex: 1,
		alignSelf: "stretch",
		width: win.width,
		height: (win.width * 360) / 1463,
		padding: 10,
		margin: 20,
	},
	icon: {
		flex: 1,
		alignSelf: "stretch",
		padding: 10,
		margin: 20,
	},
	title: {
		fontSize: 22,
		margin: 5,
		textAlign: "center",
		color: "white",
		fontFamily: "BubblegumSans",
	},
	description: {
		fontSize: 14,
		margin: 5,
		textAlign: "center",
		color: "white",
		fontFamily: "BubblegumSans",
	},
});
