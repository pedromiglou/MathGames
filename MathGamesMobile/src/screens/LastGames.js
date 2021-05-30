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


function LastGames({ navigation }) {
	return (
		<ScrollView style={{ flex: 1, height: "100%" }}>
			<LinearGradient
				colors={["#78c9ff", "#6699f8", "#5379f7", "#5867f7", "#8a54ee"]}
				start={[0, 0]}
				end={[1, 1]}
			>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }} >
                        <TouchableHighlight
                            onPress={() => navigation.navigate("Games")}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Inventario</Text>
                        </TouchableHighlight>

                    </View>
                    <View style={{ flex: 1, marginLeft: 1 }} >

                        <TouchableHighlight
                            onPress={() => navigation.navigate("Profile")}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Perfil</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                
				<View>
					<Text style={styles.pageTitle}>Ultimos Jogos</Text>
				</View>

                <View >
                    <View style={{ flexDirection: "row" }}>
                        <View style={ styles.dataCol } > 
                            <Text style={ styles.dataColText }>Data</Text>
                        </View>
                        <View style={ styles.dataCol } > 
                            <Text style={ styles.dataColText }>Jogo</Text>
                        </View>
                        <View style={ styles.dataCol } > 
                            <Text style={ styles.dataColText }>Detalhes</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: "row", borderWidth: 2, borderColor: "chartreuse", paddingTop: 5, paddingBottom: 5, marginTop: 10, backgroundColor: "white" }}>
                        <View style={ styles.infoCol } > 
                            <Text style={ styles.winText }>2019-05-21</Text>
                        </View>
                        <View style={ styles.infoCol } > 
                            <Text style={ styles.winText }>Rastros</Text>
                        </View>
                        <View style={ styles.infoCol } > 
                            <Text style={ styles.winText }>Detalhes</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", borderWidth: 2, borderColor: "red", paddingTop: 5, paddingBottom: 5, marginTop: 10, backgroundColor: "white" }}>
                        <View style={ styles.infoCol } > 
                            <Text style={ styles.loseText }>2019-05-21</Text>
                        </View>
                        <View style={ styles.infoCol } > 
                            <Text style={ styles.loseText }>Rastros</Text>
                        </View>
                        <View style={ styles.infoCol } > 
                            <Text style={ styles.loseText }>Detalhes</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", borderWidth: 2, borderColor: "chartreuse", paddingTop: 5, paddingBottom: 5, marginTop: 10, backgroundColor: "white" }}>
                        <View style={ styles.infoCol } > 
                            <Text style={ styles.winText }>2019-05-21</Text>
                        </View>
                        <View style={ styles.infoCol } > 
                            <Text style={ styles.winText }>Rastros</Text>
                        </View>
                        <View style={ styles.infoCol } > 
                            <Text style={ styles.winText }>Detalhes</Text>
                        </View>
                    </View>


                    <View style={ styles.fill }>

                    </View>
                </View>

			</LinearGradient>
		</ScrollView>
	);
}

export default LastGames;

const styles = StyleSheet.create({
    fill: {
        height: 500,
    },
    winText: {
        fontSize: 20,
		fontFamily: "BubblegumSans",
        color: "chartreuse",
        textAlign: "center",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
   },

   loseText: {
    fontSize: 20,
    fontFamily: "BubblegumSans",
    color: "red",
    textAlign: "center",
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    },

    infoCol: {
        flex: 1,
    },

    dataCol: {
        flex: 1,
        textAlign: 'center',
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