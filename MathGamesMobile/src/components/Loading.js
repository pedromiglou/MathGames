import * as React from 'react';
import {useState, useEffect} from 'react';
import {ScrollView, Text, Dimensions, StyleSheet} from 'react-native';
import { readData } from '../utilities/AsyncStorage';

const win = Dimensions.get('window');

function Loading() {
    const [text, setText] = useState("");

    useEffect(() => {
        let mounted = true;
        readData("gameMode").then(gameMode=>{
            if (gameMode.slice(-11,-1)!=="Computador") {
                setText("Esperando o Adversário...");
            } else {
                setText("Carregando o jogo...");
            }
        });
        return () => {
            mounted=false
        }
    }, []);

    
    return (
        <ScrollView>
            <Text style={styles.title}>{text}</Text>
        </ScrollView>
    );
}

export default Loading;

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        padding: 10,
        textAlign: 'left',
        fontFamily: 'BubblegumSans',
        color: 'white'
    }
});