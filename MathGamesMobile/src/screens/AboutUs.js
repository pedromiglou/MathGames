import * as React from "react";
import {
	ScrollView,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	TouchableHighlight,
	View,
	Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
//import * as WebBrowser from 'expo-web-browser';

const win = Dimensions.get("window");

function AboutUs({ navigation }) {
    
	function openLink(url) {
		Linking.openURL("https://expo.io");
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
			<ScrollView>
				<Text style={styles.title}>A Nossa Equipa</Text>

				<View style={styles.elementRow}>
					<View style={{ flex: 0.8 }}>
						<Image
							style={styles.image}
							resizeMode={"cover"}
							source={require("../../public/images/team/ricardo.png")}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.name}>Ricardo Cruz</Text>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
								}}
							>
								<TouchableHighlight
									style={styles.buttonL}
									onPress={() => {
										openLink("https://github.com/ricardocruz29");
									}}
								>
									<Feather
										name="github"
										size={30}
										color="white"
									/>
								</TouchableHighlight>
								<TouchableHighlight
									style={styles.buttonR}
									onPress={() => {
										openLink("ola");
									}}
								>
									<Feather
										name="linkedin"
										size={30}
										color="white"
									/>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.elementRow}>
					<View style={{ flex: 0.8 }}>
						<Image
							style={styles.image}
							resizeMode={"cover"}
							source={require("../../public/images/team/diogo.png")}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.name}>Diogo Carvalho</Text>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
								}}
							>
								<TouchableHighlight
									style={styles.buttonL}
									onPress={() => {
										openLink("https://github.com/DiogoCarvalhoo");
									}}
								>
									<Feather
										name="github"
										size={30}
										color="white"
									/>
								</TouchableHighlight>
								<TouchableHighlight
									style={styles.buttonR}
									onPress={() => {
										openLink("ola");
									}}
								>
									<Feather
										name="linkedin"
										size={30}
										color="white"
									/>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.elementRow}>
					<View style={{ flex: 0.8 }}>
						<Image
							style={styles.image}
							resizeMode={"cover"}
							source={require("../../public/images/team/rafa.png")}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.name}>Rafael Baptista</Text>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
								}}
							>
								<TouchableHighlight
									style={styles.buttonL}
									onPress={() => {
										openLink("https://github.com/rafaelbaptista13");
									}}
								>
									<Feather
										name="github"
										size={30}
										color="white"
									/>
								</TouchableHighlight>
								<TouchableHighlight
									style={styles.buttonR}
									onPress={() => {
										openLink("ola");
									}}
								>
									<Feather
										name="linkedin"
										size={30}
										color="white"
									/>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.elementRow}>
					<View style={{ flex: 0.8 }}>
						<Image
							style={styles.image}
							resizeMode={"cover"}
							source={require("../../public/images/team/cunha.png")}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.name}>Diogo Cunha</Text>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
								}}
							>
								<TouchableHighlight
									style={styles.buttonL}
									onPress={() => {
										openLink("https://github.com/dgCunhaUA");
									}}
								>
									<Feather
										name="github"
										size={30}
										color="white"
									/>
								</TouchableHighlight>
								<TouchableHighlight
									style={styles.buttonR}
									onPress={() => {
										openLink("ola");
									}}
								>
									<Feather
										name="linkedin"
										size={30}
										color="white"
									/>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.elementRow}>
					<View style={{ flex: 0.8 }}>
						<Image
							style={styles.image}
							resizeMode={"cover"}
							source={require("../../public/images/team/amaral.png")}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.name}>Pedro Amaral</Text>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
								}}
							>
								<TouchableHighlight
									style={styles.buttonL}
									onPress={() => {
										openLink("https://github.com/pedromiglou");
									}}
								>
									<Feather
										name="github"
										size={30}
										color="white"
									/>
								</TouchableHighlight>
								<TouchableHighlight
									style={styles.buttonR}
									onPress={() => {
										openLink("ola");
									}}
								>
									<Feather
										name="linkedin"
										size={30}
										color="white"
									/>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.elementRow}>
					<View style={{ flex: 0.8 }}>
						<Image
							style={styles.image}
							resizeMode={"cover"}
							source={require("../../public/images/team/pedro.png")}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.name}>Pedro Santos</Text>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
								}}
							>
								<TouchableHighlight
									style={styles.buttonL}
									onPress={() => {
										openLink("https://github.com/PedroS50");
									}}
								>
									<Feather
										name="github"
										size={30}
										color="white"
									/>
								</TouchableHighlight>
								<TouchableHighlight
									style={styles.buttonR}
									onPress={() => {
										openLink("ola");
									}}
								>
									<Feather
										name="linkedin"
										size={30}
										color="white"
									/>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.elementRow}>
					<View style={{ flex: 0.8 }}>
						<Image
							style={styles.image}
							resizeMode={"cover"}
							source={require("../../public/images/team/nl.png")}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.name}>Nuno Lau</Text>
						</View>
					</View>
				</View>
				<View style={styles.elementRow}>
					<View style={{ flex: 0.8 }}>
						<Image
							style={styles.image}
							resizeMode={"cover"}
							source={require("../../public/images/team/dg.png")}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.name}>Diogo Gomes</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

export default AboutUs;

const styles = StyleSheet.create({
	name: {
		fontSize: 30,
		textAlign: "center",
		fontFamily: "BubblegumSans",
		color: "white",
	},
	elementRow: {
		flex: 1,
		flexDirection: "row",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		borderBottomColor: "white",
		borderBottomWidth: 2,
		marginTop: 10,
	},
	title: {
		fontSize: 40,
		padding: 10,
		textAlign: "center",
		fontFamily: "BubblegumSans",
		color: "white",
	},
	image: {
		alignSelf: "stretch",
		width: 110,
		height: 110,
		marginLeft: 10,
		marginBottom: 20,
		borderRadius: 450 / 2,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "white",
	},
	text: {
		fontSize: 20,
		padding: 10,
		textAlign: "center",
		fontFamily: "BubblegumSans",
		color: "white",
	},
	buttonL: {
		marginRight: 20,
		marginTop: 10,
	},
	buttonR: {
		marginLeft: 20,
		marginTop: 10,
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
		fontFamily: "BubblegumSans",
		fontSize: 24,
	},
});
