import * as React from 'react';
import {useState, useEffect} from 'react';
import {ScrollView, Text, Dimensions, StyleSheet, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UserService from "./../services/user.service";
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

const win = Dimensions.get('window');

function Friends({ navigation }) {
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        let mounted = true;
        UserService.getFriends().then(res=>{
            setFriends(res);
            console.log(res[0].id);
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
            <Text style={styles.title}>Amigos</Text>
            {friends.map(friend => (
              <View key={friend.id} style={{flexDirection: "row", width: win.width}}>
                <Text style={styles.item} >{friend.username}</Text>
                <TouchableOpacity style={styles.button} onPress={()=>{}} >
                  <FontAwesome name="envelope-o" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{}}>
                  <Feather name="user-minus" size={30} color="white" />
                </TouchableOpacity>
                
              </View>
            ))}
        </ScrollView>
      </View>
    );
  }

export default Friends;

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