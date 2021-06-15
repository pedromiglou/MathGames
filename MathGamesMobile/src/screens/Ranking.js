import * as React from 'react';
import {useState, useEffect} from 'react';
import {ScrollView, Text, Dimensions, StyleSheet, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UserService from "../services/user.service";
import { Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import userService from '../services/user.service';
import { readData } from '../utilities/AsyncStorage';

const win = Dimensions.get('window');

function Ranking({ navigation }) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        let mounted = true;
        UserService.getUsers("").then(res=>{
          setUsers(res.users);
        });
        return () => {mounted=false}
      }, []);
    
    return (
      <View>
        <View style={{position:"absolute", x: 0, y:0}}>
          <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]}>
            <View style={{minHeight: win.height, minWidth: win.width}}></View>
          </LinearGradient>
        </View>
        <ScrollView>
            <Text style={styles.title}>Classificações</Text>
            {users.map(user => (
              <View key={user.id} style={{flexDirection: "row", width: win.width}}>
                <Text style={styles.item} >{user.username}</Text>
                <Text style={styles.item} >N</Text>
                <Text style={styles.item} >{user.account_level}</Text>
                <TouchableOpacity style={styles.button} onPress={()=>{
                  readData("user").then(loggedUser=>{
                    loggedUser=JSON.parse(JSON.parse(loggedUser));
                    userService.send_notification_request(loggedUser.id, user.id, "F", loggedUser.token);
                  });
                }} >
                  <AntDesign name="adduser" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{}}>
                  <Fontisto name="ban" size={30} color="white" />
                </TouchableOpacity>
                
              </View>
            ))}
        </ScrollView>
      </View>
    );
  }

export default Ranking;

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
    textAlign: 'left',
    fontFamily: 'BubblegumSans',
    color: 'white'
  },
  button: {
    marginLeft:10,
    marginTop:10,
    borderRadius:30
  },
});