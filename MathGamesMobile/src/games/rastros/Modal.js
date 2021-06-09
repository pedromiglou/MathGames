import React from 'react';
import { Modal, StyleSheet, Text, TouchableHighlight, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const win = Dimensions.get('window');

function GameModal(props) {
  const navigation = useNavigation();
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.title}>Jogo Terminado!</Text>
                <Text style={styles.text}>{props.text}</Text>

                <TouchableHighlight
                    style={ styles.button }
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Text style={styles.buttonText}>Voltar à página do jogo</Text>
                </TouchableHighlight>
            </View>
        </View>
    </Modal>
  );
}

export default GameModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    margin: 10
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'BubblegumSans',
    fontSize: 30,
    margin: 10
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'BubblegumSans',
    fontSize: 20,
    margin: 10
  },
  buttonText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'BubblegumSans',
    color: 'white'
  },
});
