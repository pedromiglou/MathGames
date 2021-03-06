import * as React from "react";
import Constants from './Constants';
import { Audio } from 'expo-av';
import socket from './../../utilities/Socket';
import GameModal from './Modal';
import GameText from "./GameText";
import Piece from "./Piece";
import GatosCaesAI from "./../gatoscaes/GatosCaesAI";
import { saveData } from "../../utilities/AsyncStorage";

let ai = null;

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
     require('../../../public/game_assets/gatos_caes/move.wav')
  );

  await sound.playAsync();
}

function makePlay(entities, storage, newPos) {
  storage.turnCount++;

  //remover o texto em baixo
  var oldEntity = entities.pop();

  var x = newPos[0];
  var y = newPos[1];

  //put piece in place and update highlight
  entities.slice(1, 65).forEach(entity=>entity.last=false);
  entities.push({position: [x, y], size: Constants.CELL_SIZE, type: storage.turn, renderer: <Piece></Piece>});
  entities[x*8+y+1].last=true;

  if (storage.turn===2) {
    entities[x*8+y+1].blockedC = true;
    entities[x*8+y+1].blockedG = true;
    if (y>0) entities[x*8+y].blockedG = true;
    if (y<7) entities[x*8+y+2].blockedG = true;
    if (x>0) entities[x*8+y-7].blockedG = true;
    if (x<7) entities[x*8+y+9].blockedG = true;
  }
  if (storage.turn===1) {
    entities[x*8+y+1].blockedG = true;
    entities[x*8+y+1].blockedC = true;
    if (y>0) entities[x*8+y].blockedC = true;
    if (y<7) entities[x*8+y+2].blockedC = true;
    if (x>0) entities[x*8+y-7].blockedC = true;
    if (x<7) entities[x*8+y+9].blockedC = true;
  }

  //switch timers
  storage.turn = storage.turn===1 ? 2 : 1;
  entities[65].turn = storage.turn;
  entities[66].turn = storage.turn;

  playSound();

  //myTurn says if the player/players can touch the screen
  storage.myTurn= !storage.myTurn || storage.gameMode === "No mesmo Computador";

  //atualizar o texto em baixo
  if (oldEntity.text.slice(11, oldEntity.text.length)===storage.player1) {
    entities.push({position: [1, 10], size: Constants.CELL_SIZE, text: "É a vez do "+storage.player2, renderer: <GameText></GameText>});
  } else {
    entities.push({position: [1, 10], size: Constants.CELL_SIZE, text: "É a vez do "+storage.player1, renderer: <GameText></GameText>});
  }
}

const GameLoop = (entities, {touches, events, dispatch }) => {
  //if not initialized return
  if (entities===undefined || entities[0].turnCount===null) return entities;

  //speed up game by ignoring loops without events or touches
  if (events.length===0 && touches.length===0) return entities;

  //get storage
  let storage = entities[0];

  //if game ended return
  if (storage.gameEnded) return entities;

  //initialize game
  events.filter(e => e.type === "init").forEach(e => {
    entities.slice(1, 65).forEach(entity=>entity.dispatch = dispatch);

    // Clear listeners to make sure there are no repeated events
    socket.off("move_piece");
    entities.push({position: [1, 10], size: Constants.CELL_SIZE, text: "É a vez do "+storage.player1,
      renderer: <GameText></GameText>});

    //configure socket
    if (gameMode==="Competitivo"||gameMode==="Amigo") {
      socket.on("move_piece", new_pos=>{
        dispatch({type: "comp", pos: new_pos});
      });
      socket.on("match_end", (msg) => {
        if (msg.game_id === storage.game_id) {
          storage.gameEnded=true;
          saveData("gameEnded", true);
          entities.push({visible:true, storage: storage, endMode: msg.end_mode,
            winner: msg.match_result, renderer: <GameModal></GameModal>});
        }
      });
    }
    
    //create the AI and make it play if not our turn
    if (storage.gameMode==="Contra o Computador") {
      if (storage.myTurn) {
        ai = new GatosCaesAI(storage.dif);
      } else {
        ai = new GatosCaesAI(storage.dif);
        dispatch({type: "ai"});
      }
    }
  });

  events.forEach(e => {
    var newPos;
    //eventos AI
    if (e.type === "ai") {
      var valid_squares = [];
      for (var y = 0; y<8; y++) {
        for (var x = 0; x<8; x++) {
          if (storage.turnCount===0) {
            if (y>=3&&y<=4&&x>=3&&x<=4) {
              if (storage.turn === 1 && !entities[x*8+y+1].blockedG) valid_squares.push([y,x]);
              if (storage.turn === 2 && !entities[x*8+y+1].blockedC) valid_squares.push([y,x]);
            }
          } else if (storage.turnCount===1) {
            if (!(y>=3&&y<=4&&x>=3&&x<=4)) {
              if (storage.turn === 1 && !entities[x*8+y+1].blockedG) valid_squares.push([y,x]);
              if (storage.turn === 2 && !entities[x*8+y+1].blockedC) valid_squares.push([y,x]);
            }
          } else if(storage.turnCount>1) {
            if (storage.turn === 1 && !entities[x*8+y+1].blockedG) valid_squares.push([y,x]);
            if (storage.turn === 2 && !entities[x*8+y+1].blockedC) valid_squares.push([y,x]);
          }
        }
      }
      
      newPos = ai.randomPlay(valid_squares);

      makePlay(entities, storage, newPos);

    //jogada do adversario online
    } else if (e.type === "comp") {
      newPos = e.pos;
      newPos = [newPos%8, Math.floor(newPos/8)];

      makePlay(entities, storage, newPos);
    
    //jogada do jogador
    } else if (e.type === "move") {
      if (e.x>=0 && e.x<=7 && e.y>=0 && e.y<=7) {
        if (entities[e.x*8+e.y+1].valid && (storage.turn===2 || !entities[e.x*8+e.y+1].blockedG) &&
                        (storage.turn===1 || !entities[e.x*8+e.y+1].blockedC)) {
          //clean green squares
          for (var j = 0; j<8; j++) {
            for (var i = 0; i<8; i++) {
              entities[i*8+j+1].valid = false;
            }
          }

          newPos = [e.x, e.y];

          makePlay(entities, storage, newPos);

          if (storage.gameMode==="Contra o Computador") {
            ai.playerPieces[e.y][e.x] = true;
            dispatch({type: "ai"});
            storage.myTurn=false;
          } else if (storage.gameMode==="Competitivo"||gameMode==="Amigo") {
            socket.emit("move", String(e.y*8+e.x), storage.user_id, storage.match_id);
            storage.myTurn=false;
          }
        }
      }

      
    } else if (e.type === "gameEnded") {
      storage.gameEnded=true;
      saveData("gameEnded", true);
      if (storage.gameMode==="No mesmo Computador") {
        entities.push({visible:true, storage: storage, endMode: "timeout",
            winner: e.turn===1?2:1, renderer: <GameModal></GameModal>});
      }
      
      return entities;
    }
  });

  if (storage.myTurn) {
    //calculate green squares
    for (var y = 0; y<8; y++) {
      for (var x = 0; x<8; x++) {
        if (storage.turnCount===0) {
          if (y>=3&&y<=4&&x>=3&&x<=4) {
            if (storage.turn === 1 && !entities[x*8+y+1].blockedG) entities[x*8+y+1].valid = true;
            if (storage.turn === 2 && !entities[x*8+y+1].blockedC) entities[x*8+y+1].valid = true;
          }
        } else if (storage.turnCount===1) {
          if (!(y>=3&&y<=4&&x>=3&&x<=4)) {
            if (storage.turn === 1 && !entities[x*8+y+1].blockedG) entities[x*8+y+1].valid = true;
            if (storage.turn === 2 && !entities[x*8+y+1].blockedC) entities[x*8+y+1].valid = true;
          }
        } else if(storage.turnCount>1) {
          if (storage.turn === 1 && !entities[x*8+y+1].blockedG) entities[x*8+y+1].valid = true;
          if (storage.turn === 2 && !entities[x*8+y+1].blockedC) entities[x*8+y+1].valid = true;
        }
      }
    }
  }

  if (storage.gameMode.slice(-10)==="Computador") {
    var nValidSquaresCats = 0;
    var nValidSquaresDogs = 0;

    for (var j = 0; j<=7; j++) {
      for (var i = 0; i<=7; i++) {
        if (j>=0 && j<=7 && i>=0 && i<=7) {
          if (!entities[i*7+j+1].blockedG) nValidSquaresCats++;
          if (!entities[i*7+j+1].blockedC) nValidSquaresDogs++;
        }
      }
    }

    if (nValidSquaresCats===0&&nValidSquaresDogs>0) {
      entities.push({visible:true, storage: storage, endMode: "no_moves", winner: 2, renderer: <GameModal></GameModal>});
      storage.gameEnded = true;
      saveData("gameEnded", true);
    } else if (nValidSquaresDogs===0&&nValidSquaresCats>0) {
      entities.push({visible:true, storage: storage, endMode: "no_moves", winner: 1, renderer: <GameModal></GameModal>});
      storage.gameEnded = true;
      saveData("gameEnded", true);
    } else if (nValidSquaresDogs===0&&nValidSquaresCats===0) {
      if (turn===1) {
        entities.push({visible:true, storage: storage, endMode: "no_moves", winner: 2, renderer: <GameModal></GameModal>});
        storage.gameEnded = true;
        saveData("gameEnded", true);
      } else {
        entities.push({visible:true, storage: storage, endMode: "no_moves", winner: 1, renderer: <GameModal></GameModal>});
        storage.gameEnded = true;
        saveData("gameEnded", true);
      }
    }
  }

  return entities;
}

export {GameLoop};