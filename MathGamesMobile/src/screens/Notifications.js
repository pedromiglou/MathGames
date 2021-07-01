import * as React from 'react';
import {useState, useEffect} from 'react';
import {ScrollView, Text, Dimensions, StyleSheet, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UserService from "./../services/user.service";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { readData, saveData } from '../utilities/AsyncStorage';
import socket from '../utilities/Socket';

const win = Dimensions.get('window');

function Notifications({ navigation }) {
    const [notifications, setNotifications] = useState([]);

    function reloadNotifications() {
      readData("user").then(user=>{
        user = JSON.parse(JSON.parse(user));
        UserService.getNotifications(user.id, user.token).then(response=>{
          if ( response != null ) {
            setNotifications(response);
          }
        });
      });
    }

    useEffect(() => {
      let mounted = true;

      reloadNotifications();

      socket.on("reload_notifications", () => {
        reloadNotifications();
      });

      return () => {
        mounted = false;
      };
    }, []);

    useEffect(()=>{
      const unsubscribe = navigation.addListener('focus', () => {
        reloadNotifications();
      });

      return unsubscribe;

    }, [navigation])
    
    function process_notification(notification) {
      readData("user").then(user=> {
          user = JSON.parse(JSON.parse(user));
          UserService.delete(notification.id, user.token);

          /* Notification_Type List:
            - F -> Enviou pedido de amizade
            - A -> Aceitou pedido de amizade
            - N -> Removeu da lista de amigos
            - T -> Convidou para participar no torneio
            - P -> Convidou-te para uma partida
            - D -> Recusou convite para partida
            - R -> Iniciou um novo round do torneio
          */
          if (notification.notification_type==="F") {
            UserService.accept_friendship(notification, user.token);
            var notification_text = user.username + " aceitou o teu pedido de amizade."
            socket.emit("new_notification", {"sender": user.id, "receiver": notification.sender_user.sender_id, "notification_type": "A", "notification_text": notification_text});
            
          } else if (notification.notification_type==="P") {
            saveData("opponent", notification.sender_user.sender_id);
            saveData("gameMode", "Invited").then(()=>navigation.navigate("Game"));
          }
          reloadNotifications();
      });
    }

    function delete_notification(notification) {
      readData("user").then(user=> {
        user = JSON.parse(JSON.parse(user));
        UserService.delete(notification.id, user.token);

        reloadNotifications();
    });
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
              return (
              <View key={notification.id} style={{flex: 1, width: win.width, borderColor: 'white', borderBottomWidth: 2}}>
                  <Text style={styles.item} >{notification.notification_text}</Text>
                  <View style={{flex:1 , flexDirection: "row", justifyContent: 'center', paddingBottom: 20}}>
                      {(notification.notification_type==="F"||notification.notification_type==="P")&&
                      <TouchableOpacity style={styles.button} onPress={()=>process_notification(notification)}>
                          <Feather name="check-circle" size={34} color="lime" />
                      </TouchableOpacity>}
                      <TouchableOpacity style={styles.button} onPress={()=>{
                        delete_notification(notification);
                        if (notification.notification_type==="P") {
                          readData("user").then(user=>{
                            user = JSON.parse(JSON.parse(user));
                            var notification_text = user.username + " recusou o seu convite.";
                            socket.emit("new_notification", {"sender": user.id, "receiver": notification.sender_user.sender_id, "notification_type": "D", "notification_text": notification_text});
                          });
                        }
                      }}>
                          <Feather name="x-circle" size={34} color="red" />
                      </TouchableOpacity>
                  </View>
              </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }

export default Notifications;

const styles = StyleSheet.create({
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