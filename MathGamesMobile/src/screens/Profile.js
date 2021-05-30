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
import { LinearGradient } from "expo-linear-gradient";

import profileImage from "../../public/images/user-profile.png";
import { gamesInfo } from "./../data/GamesInfo";

const win = Dimensions.get("window");

const gameModess = [
	{ key: 1, name: "Competitivo" },
	{ key: 2, name: "No mesmo Computador" },
	{ key: 3, name: "Gerar link de convite" },
	{ key: 4, name: "Contra o Computador" },
];

function Profile({ navigation }) {
	return (
		<ScrollView style={{ flex: 1 }}>
			<LinearGradient
				colors={["#78c9ff", "#6699f8", "#5379f7", "#5867f7", "#8a54ee"]}
				start={[0, 0]}
				end={[1, 1]}
			>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }} >
                        <TouchableHighlight
                            onPress={() => navigation.navigate("Inventory")}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Inventario</Text>
                        </TouchableHighlight>

                    </View>
                    <View style={{ flex: 1 }} >
                        <TouchableHighlight
                            onPress={() => navigation.navigate("LastGames")}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Ultimos Jogos</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                
				<View>
					<Text style={styles.playerName}>Nome</Text>
				</View>

				<View>
					<Image
						style={styles.image}
						resizeMode={"contain"}
						source={profileImage}
					/>
				</View>

				{gamesInfo.map((x) => (
					<View key={x.id} style={{ flexDirection: "row" }}>
						<View style={styles.imgDiv}>
							<Image
								style={styles.gameImg}
								resizeMode={"contain"}
								source={x.img}
							/>
						</View>

						<View style={{ width: win.width / 3.5 }}>
							<Text style={styles.gameTitle}> {x.title} </Text>
						</View>

						<View style={{ width: win.width / 2.5 }}>
							<Image
								style={styles.rankImg}
								resizeMode={"contain"}
								source={x.img}
							/>
						</View>
					</View>
				))}
			</LinearGradient>
		</ScrollView>
	);
}

export default Profile;

const styles = StyleSheet.create({
	playerName: {
		fontSize: 40,
		textAlign: "center",
		fontFamily: "BubblegumSans",
		color: "white",
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
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#3a4e60',
        width: win.width / 2
    },

    buttonText: {
        color:'#fff',
        textAlign:'center',
        fontFamily: 'BubblegumSans',
        fontSize: 18,
        padding: 10
    }
});