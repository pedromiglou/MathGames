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

function makePlay(entities, storage, piece, newPos) {
  //remover o texto em baixo
  var oldEntity = entities.pop();
  
  //block previous piece position
  entities.push({position: piece.position, size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>});

  //move piece to new position
  piece.position = [newPos[0], newPos[1]+1];
  entities[piece.position[0]*7+piece.position[1]].blocked=true;

  //switch timers
  storage.turn = storage.turn===1 ? 2 : 1;
  entities[51].turn = storage.turn;
  entities[52].turn = storage.turn;

  playSound();

  //myTurn says if the player/players can touch the screen
  storage.myTurn= !storage.myTurn || storage.gameMode === "No mesmo Computador";

  //atualizar o texto em baixo
  if (oldEntity.text.slice(11, oldEntity.text.length)===storage.player1) {
    entities.push({position: [0, 9], size: Constants.CELL_SIZE, text: "É a vez do "+storage.player2,
      renderer: <GameText></GameText>});
  } else {
    entities.push({position: [0, 9], size: Constants.CELL_SIZE, text: "É a vez do "+storage.player1,
      renderer: <GameText></GameText>});
  }
}

const GameLoop = (entities, {touches, events, dispatch }) => {
  //if not initialized return
  if (entities===undefined || entities[0].turn===null) return entities;

  //speed up game by ignoring loops without events or touches
  if (events.length===0 && touches.length===0) return entities;

  //get storage
  let storage = entities[0];

  //if game ended return
  if (storage.gameEnded) return entities;

  //initialize game
  events.filter(e => e.type === "init").forEach(e => {
    entities.push({position: [0, 0], size: Constants.CELL_SIZE, text: "Jogador 2: "+storage.player2,
      turn: storage.turn, dispatch: dispatch, gameMode: storage.gameMode, renderer: <GameText></GameText>});
    entities.push({position: [0, 8], size: Constants.CELL_SIZE, text: "Jogador 1: "+storage.player1,
      turn: storage.turn, dispatch: dispatch, gameMode: storage.gameMode, renderer: <GameText></GameText>});
    entities.push({position: [0, 9], size: Constants.CELL_SIZE, text: "É a vez do "+storage.player1,
      turn: storage.turn, dispatch: dispatch, renderer: <GameText></GameText>});

    //configure socket
    socket.on("move_piece", new_pos=>{
      dispatch({type: "comp", pos: new_pos});
    });
    socket.on("match_end", (msg) => {
      storage.gameEnded=true;
      entities.push({visible:true, text: "Game ended by the server", renderer: <GameModal></GameModal>});
    });

    //create the AI and make it play if not our turn
    if (storage.gameMode==="Contra o Computador") {
      if (storage.myTurn) {
        ai = new RastrosAI([0,6], [6,0], storage.dif);
      } else {
        ai = new RastrosAI([6,0], [0,6], storage.dif);
        dispatch({type: "ai"});
      }
    }

  });

  //get piece
  let piece = entities[50];

  events.forEach(e => {
    var newPos;
    //jogada do AI
    if (e.type === "ai") {
      var valid_squares = [];
      for (var y = piece.position[1]-2; y<=piece.position[1]; y++) {
        for (var x = piece.position[0]-1; x<=piece.position[0]+1; x++) {
          if (y>=0 && y<=6 && x>=0 && x<=6 && !ai.AI_blocked_squares[y][x]) {
            valid_squares.push([y,x]);
          }
        }
      }
      newPos = ai.randomPlay(valid_squares, piece.position);

      makePlay(entities, storage, piece, newPos);

    //jogada do adversario online
    } else if (e.type === "comp") {
      newPos = e.pos;
      newPos = [newPos%7, Math.floor(newPos/7)]

      makePlay(entities, storage, piece, newPos);
    
    //jogada do jogador
    } else if (e.type === "move") {
      //clean green squares
      for (var x = piece.position[0]-1; x<=piece.position[0]+1; x++) {
        for (var y = piece.position[1]-2; y<=piece.position[1]; y++) {
          if (x>=0 && x<=6 && y>=0 && y<=6) {
            entities[x*7+y+1].valid = false;
          }
        }
      }

      newPos = [e.x, e.y];

      makePlay(entities, storage, piece, newPos);

      if (gameMode==="Contra o Computador") {
        ai.AI_blocked_squares[e.y][e.x] = true;
        dispatch({type: "ai"});
        storage.myTurn=false;
      } else if (gameMode==="Competitivo") {
        socket.emit("move", e.y*7+e.x, storage.user_id, storage.match_id);
        storage.myTurn=false;
      }
    } else if (e.type === "gameEnded") {
      storage.gameEnded=true;
      if (storage.gameMode !== "Competitivo") {
        if (e.turn===1) {
          entities.push({visible:true, text: "Time Ended. "+storage.player2+ " won!", renderer: <GameModal></GameModal>});
        } else {
          entities.push({visible:true, text: "Time Ended. "+storage.player1+ " won!", renderer: <GameModal></GameModal>});
        }
      }
      
      return entities;
    }
  });

  if (storage.myTurn) {
    //calculate green squares
    for (var x = piece.position[0]-1; x<=piece.position[0]+1; x++) {
      for (var y = piece.position[1]-2; y<=piece.position[1]; y++) {
        if (x>=0 && x<=6 && y>=0 && y<=6) {
          entities[x*7+y+1].valid = true;
        }
      }
    }

    //when the player performs a play dispatch an event
    touches.filter(t => t.type === "press").forEach(t => {
      let x = Math.floor(t.event.locationX/Constants.CELL_SIZE);
      let y = Math.floor(t.event.locationY/Constants.CELL_SIZE)-1;
      if (x>=0 && x<=6 && y>=0 && y<=6) {
        if (entities[x*7+y+1].valid && !entities[x*7+y+1].blocked) {
          dispatch({type: "move", x: x, y: y});
        }
      }
    });
  }

  if (piece.position[0]===0 && piece.position[1]===7) {
    //player 1 won
    storage.gameEnded=true;
    entities.push({visible:true, text: "Player 1 won", renderer: <GameModal></GameModal>});
  } else if (piece.position[0]===6 && piece.position[1]===1) {
    //player 2 won
    storage.gameEnded=true;
    entities.push({visible:true, text: "Player 2 won", renderer: <GameModal></GameModal>});
  } else {
    storage.gameEnded=true;
    for (var j = piece.position[1]-2; j<=piece.position[1]; j++) {
      for (var i = piece.position[0]-1; i<=piece.position[0]+1; i++) {
        if (j>=0 && j<=6 && i>=0 && i<=6) {
          if (!entities[i*7+j+1].blocked) {
            storage.gameEnded=false;
            return entities;
          }
        }
      }
    }
    if (storage.gameEnded) entities.push({visible:true, text: "No more plays left", renderer: <GameModal></GameModal>});
  }

  return entities;
}

export {GameLoop};