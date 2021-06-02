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
let starter = "";
let opponent = "";
let user_id = "";
let advPlayed = false;
let greenSquares = [];

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
     require('../../../public/game_assets/rastros/move.wav')
  );

  await sound.playAsync();
}

const GameLoop = (entities, {touches, events, dispatch }) => {
    readData("gameMode").then(X=>gameMode=X.slice(1,-1));
    readData("dif").then(X=>dif=X.slice(1,-1));
    readData('match_id').then(X=>match_id=X.slice(1,-1));
    readData('starter').then(X=>starter=(X==="true"));
    readData('opponent').then(X=>opponent=X.slice(1,-1));
    readData('user_id').then(X=>user_id=X.slice(1,-1));

    if (!starter && entities.length === 50 && !advPlayed) {
      if (gameMode==="Contra o Computador") {
        advPlayed = true;
        dispatch({type: "ai"});
      } else if (gameMode==="Competitivo") {
        advPlayed = true;
        dispatch({type: "comp"});
      }
      
    }
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

        } else if (events[i].type === "comp") {
          socket.emit("start_game", { "user_id": user_id, "match_id": match_id, "account_player": false});

          socket.on("move_piece", new_pos=>{
            entities.push({position: [piece.position[0], piece.position[1]], size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>})
            var valid_squares = [];
              for (var y = piece.position[1]-1; y<=piece.position[1]+1; y++) {
                for (var x = piece.position[0]-1; x<=piece.position[0]+1; x++) {
                  if (y>=0 && y<=6 && x>=0 && x<=6 && !ai.AI_blocked_squares[y][x]) {
                    valid_squares.push([y,x]);
                  }
                }
              }
            piece.position = [new_pos%7, Math.floor(new_pos/7)];
          });


          
        }
      }
      for(let square of greenSquares) {
        entities[square[0]*7+square[1]].valid = false;
      }
    }

    touches.filter(t => t.type === "press").forEach(t => {
        let x = Math.floor(t.event.locationX/Constants.CELL_SIZE);
        let y = Math.floor(t.event.locationY/Constants.CELL_SIZE);
        
        playSound();
        entities.push({position: [piece.position[0], piece.position[1]], size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>})
        piece.position = [x, y];

        if (gameMode==="Contra o Computador") {
          ai.AI_blocked_squares[y][x] = true;
          dispatch({type: "ai"});
        }
        for(let square of greenSquares) {
          entities[square[0]*7+square[1]].valid = false;
        }
    });

    greenSquares = [];
    for (var y = piece.position[1]-1; y<=piece.position[1]+1; y++) {
      for (var x = piece.position[0]-1; x<=piece.position[0]+1; x++) {
        if (y>=0 && y<=6 && x>=0 && x<=6) {
          var blocked = false;
          for (let i=50; i<entities.length; i++) {
            if (entities[i].position[0]===x && entities[i].position[1]===y) {
              blocked=true;
              break;
            }
          }
          if (!blocked) greenSquares.push([x,y]);
        }
      }
    }

    for(let square of greenSquares) {
      entities[square[0]*7+square[1]].valid = true;
    }
    entities[piece.position[0]*7+piece.position[1]].valid = false;

    return entities;
}

export {GameLoop};