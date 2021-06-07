import * as React from "react";
import Constants from './Constants';
import Blocked from './Blocked';
import { Audio } from 'expo-av';
import RastrosAI from './RastrosAI';
import socket from './../../utilities/Socket';
import GameModal from './Modal';
import GameText from "./GameText";

let ai = null;

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
     require('../../../public/game_assets/rastros/move.wav')
  );

  await sound.playAsync();
}

const GameLoop = (entities, {touches, events, dispatch }) => {
  //initialize game
  events.filter(e => e.type === "init").forEach(e => {
    entities.push({position: [0, 0], size: Constants.CELL_SIZE, text: "Jogador 2: "+e.player2, renderer: <GameText></GameText>});
    entities.push({position: [0, 8], size: Constants.CELL_SIZE, text: "Jogador 1: "+e.player1, renderer: <GameText></GameText>});
    entities.push({position: [0, 9], size: Constants.CELL_SIZE, text: "É a vez do "+e.player1, renderer: <GameText></GameText>});

    //configure socket
    socket.on("move_piece", new_pos=>{
      dispatch({type: "comp", pos: new_pos});
    });

    //create the AI and make it play if not our turn
    if (e.gameMode==="Contra o Computador") {
      if (e.myTurn) {
        ai = new RastrosAI([0,6], [6,0], e.dif);
      } else {
        ai = new RastrosAI([6,0], [0,6], e.dif);
        dispatch({type: "ai"});
      }
    }

    //send the data
    e.type="data";
    dispatch(e);
    return entities;
  });

  //get the data
  var myTurn, gameEnded, gameMode, match_id, player1, player2, user_id;
  events.filter(e => e.type === "data").forEach(e => {
    myTurn = e.myTurn;
    gameEnded = e.gameEnded;
    gameMode = e.gameMode;
    match_id = e.match_id;
    player1 = e.player1;
    player2 = e.player2;
    user_id = e.user_id;
  });

  let piece = entities[49];
  if (gameEnded) {
    return entities;
  }

  events.filter(e => e.type !== "data").forEach(e => {
    //eventos AI
    if (e.type === "ai") {
      //remover o texto em baixo
      var oldEntity = entities.pop();
      
      entities.push({position: piece.position, size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>});
      var valid_squares = [];
      for (var y = piece.position[1]-2; y<=piece.position[1]; y++) {
        for (var x = piece.position[0]-1; x<=piece.position[0]+1; x++) {
          if (y>=0 && y<=6 && x>=0 && x<=6 && !ai.AI_blocked_squares[y][x]) {
            valid_squares.push([y,x]);
          }
        }
      }
      var newPos = ai.randomPlay(valid_squares, piece.position);
      piece.position = [newPos[0], newPos[1]+1];
      entities[piece.position[0]*7+piece.position[1]-1].blocked=true;
      myTurn=true;
      playSound();

      //atualizar o texto em baixo
      if (oldEntity.text.slice(11, oldEntity.text.length)===player1) {
        entities.push({position: [0, 9], size: Constants.CELL_SIZE, text: "É a vez do "+player2, renderer: <GameText></GameText>});
      } else {
        entities.push({position: [0, 9], size: Constants.CELL_SIZE, text: "É a vez do "+player1, renderer: <GameText></GameText>});
      }

    //jogada do adversario online
    } else if (e.type === "comp") {
      //remover o texto em baixo
      var oldEntity = entities.pop();
      let new_pos = e.pos;
      entities.push({position: piece.position, size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>})
      piece.position = [new_pos%7, Math.floor(new_pos/7)+1];
      entities[piece.position[0]*7+piece.position[1]-1].blocked=true;
      myTurn=true;
      playSound();

      //atualizar o texto em baixo
      if (oldEntity.text.slice(11, oldEntity.text.length)===player1) {
        entities.push({position: [0, 9], size: Constants.CELL_SIZE, text: "É a vez do "+player2, renderer: <GameText></GameText>});
      } else {
        entities.push({position: [0, 9], size: Constants.CELL_SIZE, text: "É a vez do "+player1, renderer: <GameText></GameText>});
      }
    
    //jogada do jogador
    } else if (e.type === "move") {
      
      let x = e.x;
      let y = e.y;
      if (entities[x*7+y-1].valid && !entities[x*7+y-1].blocked) {
        //remover o texto em baixo
        var oldEntity = entities.pop();
        
        //clean green squares
        for (var j = piece.position[1]-1; j<=piece.position[1]+1; j++) {
          for (var i = piece.position[0]-1; i<=piece.position[0]+1; i++) {
            if (j>=1 && j<=7 && i>=0 && i<=6) {
              entities[i*7+j-1].valid = false;
            }
          }
        }

        entities.push({position: piece.position, size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>});
        piece.position = [x, y];
        entities[x*7+y-1].blocked = true;

        if (gameMode==="Contra o Computador") {
          ai.AI_blocked_squares[y-1][x] = true;
          dispatch({type: "ai"});
          myTurn=false;
        } else if (gameMode==="Competitivo") {
          socket.emit("move", (y-1)*7+x, user_id, match_id);
          myTurn=false;
        }
        playSound();
        //atualizar o texto em baixo
        if (oldEntity.text.slice(11, oldEntity.text.length)===player1) {
          entities.push({position: [0, 9], size: Constants.CELL_SIZE, text: "É a vez do "+player2, renderer: <GameText></GameText>});
        } else {
          entities.push({position: [0, 9], size: Constants.CELL_SIZE, text: "É a vez do "+player1, renderer: <GameText></GameText>});
        }
      }
    }
  });

  if (myTurn) {
    //calculate green squares
    for (var y = piece.position[1]-1; y<=piece.position[1]+1; y++) {
      for (var x = piece.position[0]-1; x<=piece.position[0]+1; x++) {
        if (y>=1 && y<=7 && x>=0 && x<=6) {
          entities[x*7+y-1].valid = true;
        }
      }
    }

    //when the player performs a play dispatch an event
    touches.filter(t => t.type === "press").forEach(t => {
      let x = Math.floor(t.event.locationX/Constants.CELL_SIZE);
      let y = Math.floor(t.event.locationY/Constants.CELL_SIZE);
      dispatch({type: "move", x: x, y: y});
    });
  }

  if (piece.position[0]===0 && piece.position[1]===7) {
    //player 1 won
    gameEnded=true;
    //entities.push({visible:true, text: "Player 1 won", renderer: <GameModal></GameModal>});
  } else if (piece.position[0]===6 && piece.position[1]===1) {
    //player 2 won
    gameEnded=true;
    //entities.push({visible:true, text: "Player 2 won", renderer: <GameModal></GameModal>});
  }

  if (player1===undefined) return entities;
  dispatch({
    type: "data",
    myTurn: myTurn,
    gameEnded: gameEnded,
    gameMode: gameMode,
    match_id: match_id,
    player1: player1,
    player2: player2,
    user_id: user_id
  });

  return entities;
}

export {GameLoop};