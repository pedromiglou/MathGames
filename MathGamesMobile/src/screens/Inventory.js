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

import Avatar from '../components/Avatar'

const win = Dimensions.get("window");

function Inventory({ navigation }) {
	return (
		<View style={{ flex: 1, height: "100%", width: "100%", alignItems: 'stretch' }}>
			<LinearGradient
				colors={["#78c9ff", "#6699f8", "#5379f7", "#5867f7", "#8a54ee"]}
				start={[0, 0]}
				end={[1, 1]}
                style={{ flex: 1, height: "100%", width: "100%", alignItems: 'stretch' }}
			>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }} >
                        <TouchableHighlight
                            onPress={() => navigation.navigate("Profile")}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Perfil</Text>
                        </TouchableHighlight>

                    </View>
                    <View style={{ flex: 1, marginLeft: 1 }} >

                        <TouchableHighlight
                            onPress={() => navigation.navigate("LastGames")}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Ultimos Jogos</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                
				<View>
					<Text style={styles.pageTitle}>Inventario</Text>
				</View>



                   {/*  <GraphicsView
                        onContextCreate={this.onContextCreate}
                    /> */}
                 <Avatar shirtName="Camouflage2" accessorieName="PixelGlasses" />
                

			</LinearGradient>
		</View>
	);
}

export default Inventory;

const styles = StyleSheet.create({

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