import * as React from "react";
import Constants from './Constants';
import Blocked from './Blocked';
import { Audio } from 'expo-av';
import RastrosAI from './RastrosAI';
import {readData} from './../../utilities/AsyncStorage';
import socket from './../../utilities/Socket';

let ai = new RastrosAI();
let gameMode = "";
let dif = "";
let match_id = "";
let player1 = "";
let player2 = "";
let user_id = "";
let myTurn = false;
let initialized = false;

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
     require('../../../public/game_assets/rastros/move.wav')
  );

  await sound.playAsync();
}

const GameLoop = (entities, {touches, events, dispatch }) => {
  let piece = entities[49];

  if (events.length){
    for(let i=0; i<events.length; i++){
      if (events[i].type === "ai") {
        entities.push({position: [piece.position[0], piece.position[1]], size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>})
        var valid_squares = [];
          for (var y = piece.position[1]-1; y<=piece.position[1]+1; y++) {
            for (var x = piece.position[0]-1; x<=piece.position[0]+1; x++) {
              if (y>=0 && y<=6 && x>=0 && x<=6 && !ai.AI_blocked_squares[y][x]) {
                valid_squares.push([y,x]);
              }
            }
          }
        piece.position = ai.randomPlay(dif, valid_squares, piece.position);
        entities[piece.position[0]*7+piece.position[1]].blocked=true;
        myTurn=true;

      } else if (events[i].type === "comp") {
        let new_pos = events[i].pos;
        entities.push({position: [piece.position[0], piece.position[1]], size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>})
        piece.position = [new_pos%7, Math.floor(new_pos/7)];
        entities[piece.position[0]*7+piece.position[1]].blocked=true;
        myTurn=true;
      } else if (events[i].type === "createSockets") {
        //configure socket
        socket.on("move_piece", new_pos=>{
          dispatch({type: "comp", pos: new_pos});
        });
      }
    }
  }
  if (!initialized) {
    //get necessary parameters
    readData("gameMode").then(X=>gameMode=X.slice(1,-1));
    readData("dif").then(X=>dif=X.slice(1,-1));
    readData('match_id').then(X=>match_id=X);
    readData('player1').then(X=>player1=X.slice(1,-1));
    readData('player2').then(X=>player2=X.slice(1,-1));
    readData('user_id').then(X=>user_id=X.slice(1,-1));

    if (user_id!==""&&player1!==""&&player2!=="") {
      if (gameMode==="No mesmo Computador") {
        myTurn=true;
      } else if (gameMode==="Contra o Computador") {
        if (player1===user_id) {
          myTurn=true;
        } else {
          dispatch({type: "ai"});
        }
      } else if (gameMode==="Competitivo") {
        if (player1===user_id) {
          myTurn=true;
        }
      }
      initialized=true;
    }
  } else {
    if (myTurn) {
      //calculate green squares
      for (var y = piece.position[1]-1; y<=piece.position[1]+1; y++) {
        for (var x = piece.position[0]-1; x<=piece.position[0]+1; x++) {
          if (y>=0 && y<=6 && x>=0 && x<=6) {
            entities[x*7+y].valid = true;
          }
        }
      }

      //when the player performs a play
      touches.filter(t => t.type === "press").forEach(t => {
        //clean green squares
        for (var j = piece.position[1]-1; j<=piece.position[1]+1; j++) {
          for (var i = piece.position[0]-1; i<=piece.position[0]+1; i++) {
            if (j>=0 && j<=6 && i>=0 && i<=6) {
              entities[i*7+j].valid = false;
            }
          }
        }

        let x = Math.floor(t.event.locationX/Constants.CELL_SIZE);
        let y = Math.floor(t.event.locationY/Constants.CELL_SIZE);
        
        playSound();
        entities.push({position: [piece.position[0], piece.position[1]], size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>})
        entities[x*7+y].blocked = true;
        piece.position = [x, y];

        if (gameMode==="Contra o Computador") {
          ai.AI_blocked_squares[y][x] = true;
          dispatch({type: "ai"});
          myTurn=false;
        }
        if (gameMode==="Competitivo") {
          socket.emit("move", y*7+x, user_id, match_id);
          myTurn=false;
        }
        
      });
    }
  }

  return entities;
}

export {GameLoop};