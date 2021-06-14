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
import Avatar from "../components/Avatar";

import profileImage from "../../public/images/user-profile.png";
import { gamesInfo } from "./../data/GamesInfo";

import UserService from "./../services/user.service";
import { readData } from "../utilities/AsyncStorage";


const win = Dimensions.get("window");


function Profile({ navigation }) {

	const [userState, setUserState] = useState(null);

	const [skinColorState, setSkinColorState] = useState("#ffffff");
	const [hatNameState, setHatNameState] = useState("none");
	const [shirtNameState, setShirtNameState] = useState("none");
	const [accessorieNameState, setAccessorieNameState] = useState("none");
	const [trouserNameState, setTrouserNameState] = useState("none");

	const [uniqueValue, setUniqueValue] = useState(1);


	useEffect(() => {
		let mounted = true;

		readData("user").then((user) => {
			setUserState(JSON.parse(JSON.parse(user)) );


			console.log("userState w efwefwef wefweffffffffffffffffffff")
			console.log(userState)
			if (userState !== null) {
				UserService.getUserById(userState.id).then(
					(user) => {
						var trouserT;
						switch(user.avatar_trouser) {
							case "Trouser1":
								trouserT = "#34495E";
								break;
							case "Trouser2":
								trouserT = "#7B7D7D";
								break;
							case "Trouser3":
								trouserT = "#EAEDED";
								break;
							default:
								trouserT = user.avatar_trouser;
						}

						console.log("user //////////////////////////////////////////////")

						console.log(user)

						setSkinColorState(user.avatar_color);
						setHatNameState(user.avatar_hat);
						setShirtNameState(user.avatar_shirt);
						setAccessorieNameState(user.avatar_accessorie);
						setTrouserNameState(trouserT);

						forceRemount();
					}
				);
			}
		
			forceRemount();
			return () => {
				mounted: false;
			};
		});
	}, []);


	function forceRemount() {
		console.log("remounting")
		setUniqueValue(uniqueValue + 1 );
	};


	return (
		<View>
			<View style={{position:"absolute", x: 0, y:0}}>
				<LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]}>
					<View style={{minHeight: win.height, minWidth: win.width}}></View>
				</LinearGradient>
			</View>
			<ScrollView> 
				<View style={{ flexDirection: "row" }}>
					<View style={{ flex: 1 }} >
						<TouchableHighlight
							onPress={() => navigation.navigate("Inventory")}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Inventário</Text>
						</TouchableHighlight>

					</View>
					<View style={{ flex: 1 }} >
						<TouchableHighlight
							onPress={() => navigation.navigate("LastGames")}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Últimos Jogos</Text>
						</TouchableHighlight>
					</View>
				</View>
				
				<View>
					<Text style={styles.playerName}>{userState != undefined ? userState.username : "Nome"}</Text>
				</View>

					{/* <Image
						style={styles.image}
						resizeMode={"contain"}
						source={profileImage}
					/> */}
				<SafeAreaView
					style={styles.avatarContainer}
					key={uniqueValue}
				>
					<Avatar
						hatName={hatNameState}
						shirtName={shirtNameState}
						accessorieName={accessorieNameState}
						trouserName={trouserNameState}
						skinColor={skinColorState}
						profileCam={true}
					/>
				</SafeAreaView>


				{gamesInfo.map((x) => (
					<View key={x.id} style={{ flexDirection: "row", borderColor: "white", marginLeft: 5, marginRight: 5, borderBottomWidth: 2 }}>
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
			</ScrollView>
		</View>
	);
}

export default Profile;

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
	},

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
		marginBottom: 20
	},
});