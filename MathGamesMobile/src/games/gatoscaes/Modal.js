import React from 'react';
import { Modal, StyleSheet, Text, TouchableHighlight, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EndGameStatements } from '../../data/EndGameStatements';

const win = Dimensions.get('window');

function GameModal(props) {
  const navigation = useNavigation();

  var text = "";

  let storage = props.storage;
  let endMode = props.endMode;
  let winner = props.winner;

  if (storage.gameMode==="No mesmo Computador") {
    if (winner===1) {
      text+="Parabéns "+storage.player1+"! ";
    } else {
      text+="Parabéns "+storage.player2+"! ";
    }
    text+="Venceste o jogo! ";
    if (endMode==="no_moves") {
      text+=EndGameStatements.win[1].no_moves;
    } else if (endMode==="timeout") {
      text+=EndGameStatements.win.timeout;
    }

  } else if (storage.gameMode==="Contra o Computador") {
    let dif = storage.dif==="easy" ? "fácil" : (storage.dif==="medium"? "médio" : "difícil");
    if ((winner===1&&storage.player1===storage.username)||(winner===2&&storage.player2===storage.username)) {
      text+="Parabéns! Conseguiste derrotar o computador em dificuldade "+dif+"! ";
    } else {
      text+="Perdeste contra o computador em dificuldade "+dif+". Melhor sorte para a próxima!";
    }

  } else {
    if (winner==="win") {
      text+="Vitória! ";
      if (endMode==="no_moves") {
        text+=EndGameStatements.win[1].no_moves;
      } else if (endMode==="timeout") {
        text+=EndGameStatements.win.timeout;
      } else if (endMode==="forfeit") {
        text+=EndGameStatements.win.forfeit;
      } else if (endMode==="invalid_move") {
        text+=EndGameStatements.win.invalid_move;
      }
    } else {
      text+="Derrota. ";
      if (endMode==="no_moves") {
        text+=EndGameStatements.loss[1].no_moves;
      } else if (endMode==="timeout") {
        text+=EndGameStatements.loss.timeout;
      } else if (endMode==="forfeit") {
        text+=EndGameStatements.loss.forfeit;
      } else if (endMode==="invalid_move") {
        text+=EndGameStatements.loss.invalid_move;
      }
    }

  }

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.title}>Jogo Terminado!</Text>
                <Text style={styles.text}>{text}</Text>

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
