import * as React from 'react';
import {useState, useEffect} from 'react';
import {ScrollView, Text, Dimensions, StyleSheet, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UserService from "./../services/user.service";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { readData, saveData } from '../utilities/AsyncStorage';
import { EvilIcons } from '@expo/vector-icons';

const win = Dimensions.get('window');

function Notifications({ navigation }) {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        let mounted = true;
        readData("user").then(loggedUser=>{
            loggedUser=JSON.parse(JSON.parse(loggedUser));
            UserService.getNotifications(loggedUser.id, loggedUser.token).then(res=>{
                console.log(res);
                setNotifications(res);
            });
        });


        const interval = setInterval(() => {
            console.log("Notification Interval ...")
            readData("user").then(loggedUser=>{
                loggedUser=JSON.parse(JSON.parse(loggedUser));
                UserService.getNotifications(loggedUser.id, loggedUser.token).then(res=>{
                    console.log(res)
                    if( res !== notifications)
                        setNotifications(res);
                });
            });
        }, 5000);

        return () => {
            mounted=false
            clearInterval(interval);
        }
    
    }, []);
    
    function accept_game(notification) {
      readData("user").then(user=>{
        user=JSON.parse(JSON.parse(user));
        UserService.delete(notification.id, user.token);
        saveData("opponent", notification.sender_user.sender_id);
        saveData("gameMode", "Invited").then(()=>navigation.navigate("Game"));
      })
    }
    
    return (
      <View>
        <View style={{position:"absolute", x: 0, y:0}}>
          <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]}>
            <View style={{minHeight: win.height, minWidth: win.width}}></View>
          </LinearGradient>
        </View>
        <ScrollView style={{minHeight: win.height, minWidth: win.width}}>
            {notifications.map(notification => {
              if (notification.notification_type==="F") {
                return (
                <View key={notification.id} style={{flex: 1, width: win.width, borderColor: 'white', borderBottomWidth: 2}}>
                    <Text style={styles.item} >Pedido de amizade de {notification.sender_user.sender}</Text>
                    <View style={{flex:1 , flexDirection: "row", justifyContent: 'center', paddingBottom: 20}}>
                        <TouchableOpacity style={styles.button} onPress={()=> {
                            readData("user").then(user=> {
                                user = JSON.parse(JSON.parse(user));

                                UserService.accept_friendship(notification, user.token);
                            })
                        }}>
                            <Feather name="check-circle" size={34} color="lime" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>{}}>
                            <Feather name="x-circle" size={34} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
                );
              }
              if (notification.notification_type==="P") {
                  return (
                  <View key={notification.id} style={{flexDirection: "row", width: win.width}}>
                        <Text style={styles.item} >Convite de {notification.sender_user.sender}</Text>
                        <View style={{flex:1 , flexDirection: "row", justifyContent: 'center', paddingBottom: 20}}>
                            <TouchableOpacity style={styles.button} onPress={()=>accept_game(notification)} >
                                <Feather name="check-circle" size={34} color="lime" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={()=>{}}>
                                <Feather name="x-circle" size={34} color="red" />
                            </TouchableOpacity>
                        </View>
                  </View>
                  );
              }
            })}
        </ScrollView>
      </View>
    );
  }

export default Notifications;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    padding: 10,
    textAlign:'center',
    fontFamily: 'BubblegumSans',
    color: 'white'
  },
  item: {
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
    fontFamily: 'BubblegumSans',
    color: 'white'
  },
  button: {
    marginLeft:10,
    marginTop:10,
    borderRadius:30,
    paddingLeft: 20,
    paddingRight: 20
  },
});