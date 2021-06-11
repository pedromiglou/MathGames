import * as React from "react";
import Constants from './Constants';
import { Audio } from 'expo-av';
import socket from './../../utilities/Socket';
import GameModal from './Modal';
import GameText from "./GameText";
import Piece from "./Piece";
import GatosCaesAI from "./../gatoscaes/GatosCaesAI";

let ai = null;

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
     require('../../../public/game_assets/gatos_caes/move.wav')
  );

  await sound.playAsync();
}

const GameLoop = (entities, {touches, events, dispatch }) => {
  //initialize game
  events.filter(e => e.type === "init").forEach(e => {
    entities.push({position: [0, 0], size: Constants.CELL_SIZE, text: "Jogador 2: "+e.player2, renderer: <GameText></GameText>});
    entities.push({position: [0, 9], size: Constants.CELL_SIZE, text: "Jogador 1: "+e.player1, renderer: <GameText></GameText>});
    entities.push({position: [0, 10], size: Constants.CELL_SIZE, text: "É a vez do "+e.player1, renderer: <GameText></GameText>});

    //configure socket
    socket.on("move_piece", new_pos=>{
      console.log(new_pos);
      dispatch({type: "comp", pos: new_pos});
    });

    //create the AI and make it play if not our turn
    if (e.gameMode==="Contra o Computador") {
      if (e.myTurn) {
        ai = new GatosCaesAI(e.dif);
      } else {
        ai = new GatosCaesAI(e.dif);
        dispatch({type: "ai"});
      }
    }

    //send the data
    e.type="data";
    dispatch(e);
    return entities;
  });

  //get the data
  var myTurn, gameEnded, gameMode, match_id, player1, player2, user_id, turn, turnCount;
  events.filter(e => e.type === "data").forEach(e => {
    myTurn = e.myTurn;
    gameEnded = e.gameEnded;
    gameMode = e.gameMode;
    match_id = e.match_id;
    player1 = e.player1;
    player2 = e.player2;
    user_id = e.user_id;
    turn = e.turn;
    turnCount = e.turnCount;
  });

  if (gameEnded||gameEnded===undefined) {
    return entities;
  }

  events.filter(e => e.type !== "data").forEach(e => {
    //eventos AI
    if (e.type === "ai") {
      turnCount++;
      //remover o texto em baixo
      var oldEntity = entities.pop();
      
      var valid_squares = [];
      for (var y = 1; y<9; y++) {
        for (var x = 0; x<8; x++) {
          if (turn === "gatos" && !entities[x*8+y-1].blockedG) valid_squares.push([y-1,x]);
          if (turn === "caes" && !entities[x*8+y-1].blockedC) valid_squares.push([y-1,x]);
        }
      }
      
      var newPos = ai.randomPlay(valid_squares);
      var x = newPos[0];
      var y = newPos[1];
      ai.aiPieces[y][x] = true;
      entities.push({position: [x, y+1], size: Constants.CELL_SIZE, type: turn, renderer: <Piece></Piece>});
      if (turn==="caes") {
        entities[x*8+y].blockedC = true;
        entities[x*8+y].blockedG = true;
        if (y>0) entities[x*8+y-1].blockedG = true;
        if (y<7) entities[x*8+y+1].blockedG = true;
        if (x>0) entities[x*8+y-8].blockedG = true;
        if (x<7) entities[x*8+y+8].blockedG = true;
      }
      if (turn==="gatos") {
        entities[x*8+y].blockedG = true;
        entities[x*8+y].blockedC = true;
        if (y>0) entities[x*8+y-1].blockedC = true;
        if (y<7) entities[x*8+y+1].blockedC = true;
        if (x>0) entities[x*8+y-8].blockedC = true;
        if (x<7) entities[x*8+y+8].blockedC = true;
      }
      turn = turn==="gatos" ? "caes" : "gatos";
      myTurn=true;
      playSound();

      //atualizar o texto em baixo
      if (oldEntity.text.slice(11, oldEntity.text.length)===player1) {
        entities.push({position: [0, 10], size: Constants.CELL_SIZE, text: "É a vez do "+player2, renderer: <GameText></GameText>});
      } else {
        entities.push({position: [0, 10], size: Constants.CELL_SIZE, text: "É a vez do "+player1, renderer: <GameText></GameText>});
      }

    //jogada do adversario online
    } else if (e.type === "comp") {
      turnCount++;
      //remover o texto em baixo
      var oldEntity = entities.pop();
      let new_pos = e.pos;
      let x = new_pos%8;
      let y = Math.floor(new_pos/8);

      entities.push({position: [x, y+1], size: Constants.CELL_SIZE, type: turn, renderer: <Piece></Piece>});
      if (turn==="caes") {
        entities[x*8+y].blockedC = true;
        entities[x*8+y].blockedG = true;
        if (y>0) entities[x*8+y-1].blockedG = true;
        if (y<7) entities[x*8+y+1].blockedG = true;
        if (x>0) entities[x*8+y-8].blockedG = true;
        if (x<7) entities[x*8+y+8].blockedG = true;
      }
      if (turn==="gatos") {
        entities[x*8+y].blockedG = true;
        entities[x*8+y].blockedC = true;
        if (y>0) entities[x*8+y-1].blockedC = true;
        if (y<7) entities[x*8+y+1].blockedC = true;
        if (x>0) entities[x*8+y-8].blockedC = true;
        if (x<7) entities[x*8+y+8].blockedC = true;
      }
      turn = turn==="gatos" ? "caes" : "gatos";
      myTurn=true;
      playSound();

      //atualizar o texto em baixo
      if (oldEntity.text.slice(11, oldEntity.text.length)===player1) {
        entities.push({position: [0, 10], size: Constants.CELL_SIZE, text: "É a vez do "+player2, renderer: <GameText></GameText>});
      } else {
        entities.push({position: [0, 10], size: Constants.CELL_SIZE, text: "É a vez do "+player1, renderer: <GameText></GameText>});
      }
    
    //jogada do jogador
    } else if (e.type === "move") {
      turnCount++;
      let x = e.x;
      let y = e.y;

      if (entities[x*8+y].valid && (turn==="caes" || !entities[x*8+y-1].blockedG) || (turn==="gatos" || !entities[x*8+y].blockedC)) {
        //remover o texto em baixo
        var oldEntity = entities.pop();

        //clean green squares
        for (var j = 1; j<9; j++) {
          for (var i = 0; i<8; i++) {
            entities[i*8+j-1].valid = false;
          }
        }

        entities.push({position: [x, y+1], size: Constants.CELL_SIZE, type: turn, renderer: <Piece></Piece>});
        if (turn==="caes") {
          entities[x*8+y].blockedC = true;
          entities[x*8+y].blockedG = true;
          if (y>0) entities[x*8+y-1].blockedG = true;
          if (y<7) entities[x*8+y+1].blockedG = true;
          if (x>0) entities[x*8+y-8].blockedG = true;
          if (x<7) entities[x*8+y+8].blockedG = true;
        }
        if (turn==="gatos") {
          entities[x*8+y].blockedG = true;
          entities[x*8+y].blockedC = true;
          if (y>0) entities[x*8+y-1].blockedC = true;
          if (y<7) entities[x*8+y+1].blockedC = true;
          if (x>0) entities[x*8+y-8].blockedC = true;
          if (x<7) entities[x*8+y+8].blockedC = true;
        }

        turn = turn==="gatos" ? "caes" : "gatos";

        if (gameMode==="Contra o Computador") {
          ai.playerPieces[y][x] = true;
          dispatch({type: "ai"});
          myTurn=false;
        } else if (gameMode==="Competitivo") {
          console.log(y*8+x);
          socket.emit("move", y*8+x, user_id, match_id);
          myTurn=false;
        }
        
        playSound();
        //atualizar o texto em baixo
        if (oldEntity.text.slice(11, oldEntity.text.length)===player1) {
          entities.push({position: [0, 10], size: Constants.CELL_SIZE, text: "É a vez do "+player2, renderer: <GameText></GameText>});
        } else {
          entities.push({position: [0, 10], size: Constants.CELL_SIZE, text: "É a vez do "+player1, renderer: <GameText></GameText>});
        }
      }
    }
  });

  if (myTurn) {
    //calculate green squares
    for (var y = 1; y<9; y++) {
      for (var x = 0; x<8; x++) {
        if (turnCount===0) {
          if (y>=4&&y<=5&&x>=3&&x<=4) {
            if (turn === "gatos" && !entities[x*8+y-1].blockedG) entities[x*8+y-1].valid = true;
            if (turn === "caes" && !entities[x*8+y-1].blockedC) entities[x*8+y-1].valid = true;
          }
        } else if (turnCount===1) {
          if (!(y>=4&&y<=5&&x>=3&&x<=4)) {
            if (turn === "gatos" && !entities[x*8+y-1].blockedG) entities[x*8+y-1].valid = true;
            if (turn === "caes" && !entities[x*8+y-1].blockedC) entities[x*8+y-1].valid = true;
          }
        } else if(turnCount>1) {
          if (turn === "gatos" && !entities[x*8+y-1].blockedG) entities[x*8+y-1].valid = true;
          if (turn === "caes" && !entities[x*8+y-1].blockedC) entities[x*8+y-1].valid = true;
        }
      }
    }

    //when the player performs a play dispatch an event
    touches.filter(t => t.type === "press").forEach(t => {
      let x = Math.floor(t.event.locationX/Constants.CELL_SIZE);
      let y = Math.floor(t.event.locationY/Constants.CELL_SIZE);
      dispatch({type: "move", x: x, y: y-1});
    });
  }

  /*
  if (piece.position[0]===0 && piece.position[1]===7) {
    //player 1 won
    gameEnded=true;
    entities.push({visible:true, text: "Player 1 won", renderer: <GameModal></GameModal>});
  } else if (piece.position[0]===6 && piece.position[1]===1) {
    //player 2 won
    gameEnded=true;
    entities.push({visible:true, text: "Player 2 won", renderer: <GameModal></GameModal>});
  } else {
    gameEnded=true;
    for (var j = piece.position[1]-1; j<=piece.position[1]+1; j++) {
      for (var i = piece.position[0]-1; i<=piece.position[0]+1; i++) {
        if (j>=1 && j<=7 && i>=0 && i<=6) {
          if (!entities[i*7+j-1].blocked) gameEnded=false;
        }
      }
    }
    if (gameEnded) entities.push({visible:true, text: "No more plays left", renderer: <GameModal></GameModal>});
  }*/

  if (player1===undefined) return entities;
  dispatch({
    type: "data",
    myTurn: myTurn,
    gameEnded: gameEnded,
    gameMode: gameMode,
    match_id: match_id,
    player1: player1,
    player2: player2,
    user_id: user_id,
    turn: turn,
    turnCount: turnCount
  });

  return entities;
}

export {GameLoop};