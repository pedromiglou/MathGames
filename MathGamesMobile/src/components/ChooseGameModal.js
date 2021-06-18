import React from 'react';
import { Modal, StyleSheet, Text, TouchableHighlight, View, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {gamesInfo} from './../data/GamesInfo';
import { LinearGradient } from 'expo-linear-gradient';
import { readData, saveData } from '../utilities/AsyncStorage';
import UserService from "./../services/user.service";
import socket from "./../utilities/Socket";

const win = Dimensions.get('window');

function ChooseGameModal(props) {
  const navigation = useNavigation();
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.text}>Escolhe o jogo que queres jogar</Text>
                <ScrollView style={{backgroundColor: "#dcdfe4"}}>
                    {gamesInfo.map(X => 
                    <TouchableHighlight style={styles.gameTile} key={X.id} onPress = {() => {
                          readData("user").then(user=>{
                            user = JSON.parse(JSON.parse(user));
                            console.log("generating invite")
                            console.log("opponent:" + props.opponent);
                            console.log("me: " + user.id);
                            UserService.send_notification_request(user.id, props.opponent, "P", user.token).then(()=>{
                              saveData("opponent", props.opponent);
                              saveData("gameMode", "Inviter");
                              saveData("game", X);
                              props.setVisible(false);
                              navigation.navigate("Game");
                            });
                            
                          });
                        }
                        }>
                        <View>
                          <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]}>
                            <View style={{width: win.width*0.6}}>
                              <Text style={styles.title}>{X.title}</Text>
                              
                            </View>
                          </LinearGradient>
                        </View>
                    </TouchableHighlight>
                    )}
                </ScrollView>

                <TouchableHighlight
                    style={ styles.button }
                    onPress={() => {
                      props.setVisible(false);
                    }}>
                    <Text style={styles.buttonText}>Voltar à página do jogo</Text>
                </TouchableHighlight>
            </View>
        </View>
    </Modal>
  );
}

export default ChooseGameModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
    margin: 20,
    marginTop: win.height*0.4,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: win.height*0.5
    },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "rgb(175, 76, 76)",
    margin: 10
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'BubblegumSans',
    fontSize: 30,
    margin: 10
  },
  text: {
    color: 'rgb(0, 86, 179)',
    textAlign: 'center',
    fontFamily: 'BubblegumSans',
    fontSize: 20,
    marginBottom: 20
  },
  buttonText: {
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'BubblegumSans',
    color: 'white',
    fontSize: 20
  },
  gameTile: {
    margin: 10,
    backgroundColor: "#CCFFFF",
    borderColor: "white",
    borderRadius: 2,
    borderWidth: 2
  },
  image: {
      alignSelf: 'center',
      height: win.width*360/1463
  },
  description: {
    fontSize: 14,
    margin: 5,
    textAlign:'center',
    color: "white",
    fontFamily: 'BubblegumSans'
  }
});
