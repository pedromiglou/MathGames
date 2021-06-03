import * as React from "react";
import Constants from './Constants';
import Blocked from './Blocked';
import { Audio } from 'expo-av';
import RastrosAI from './RastrosAI';
import {readData} from './../../utilities/AsyncStorage';
import socket from './../../utilities/Socket';
import GameModal from './Modal';

class GameLoop {

  constructor() {
    this.ai = null;
    this.gameMode = "";
    this.dif = "";
    this.match_id = "";
    this.player1 = "";
    this.player2 = "";
    this.user_id = "";
    this.myTurn = false;
    this.initialized = false;
    this.gameEnded=false;

    //get necessary parameters
    readData("gameMode").then(X=> {if (X!=null) this.gameMode=X.slice(1,-1);});
    readData("dif").then(X=> {if (X!=null) this.dif=X.slice(1,-1);});
    readData('match_id').then(X=> {if (X!=null) this.match_id=X});
    readData('player1').then(X=> {if (X!=null) this.player1=X.slice(1,-1);});
    readData('player2').then(X=> {if (X!=null) this.player2=X.slice(1,-1);});
    readData('user_id').then(X=> {if (X!=null) this.user_id=X.slice(1,-1);});
  }
  
  async playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('../../../public/game_assets/rastros/move.wav')
    );
  
    await sound.playAsync();
  }
  
  loop(entities, {touches, events, dispatch }) {
    console.log(this.user_id);
    this.user_id = 1;
    if (!this.gameEnded) {
      let piece = entities[49];
  
      if (events.length){
        for(let i=0; i<events.length; i++){
          if (events[i].type === "ai") {
            entities.push({position: [piece.position[0], piece.position[1]], size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>})
            var valid_squares = [];
              for (var y = piece.position[1]-1; y<=piece.position[1]+1; y++) {
                for (var x = piece.position[0]-1; x<=piece.position[0]+1; x++) {
                  if (y>=0 && y<=6 && x>=0 && x<=6 && !this.ai.AI_blocked_squares[y][x]) {
                    valid_squares.push([y,x]);
                  }
                }
              }
            piece.position = this.ai.randomPlay(dif, valid_squares, piece.position);
            entities[piece.position[0]*7+piece.position[1]].blocked=true;
            this.myTurn=true;
  
          } else if (events[i].type === "comp") {
            let new_pos = events[i].pos;
            entities.push({position: [piece.position[0], piece.position[1]], size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>})
            piece.position = [new_pos%7, Math.floor(new_pos/7)];
            entities[piece.position[0]*7+piece.position[1]].blocked=true;
            this.myTurn=true;
          } else if (events[i].type === "createSockets") {
            //configure socket
            socket.on("move_piece", new_pos=>{
              dispatch({type: "comp", pos: new_pos});
            });
          }
        }
      }

      if (!this.initialized) {
        if (this.user_id!==""&&this.player1!==""&&this.player2!=="") {
          if (this.gameMode==="No mesmo Computador") {
            this.myTurn=true;
          } else if (this.gameMode==="Contra o Computador") {
            if (this.player1===this.user_id) {
              this.ai = new RastrosAI([0,6], [6,0]);
              this.myTurn=true;
            } else {
              this.ai = new RastrosAI([6,0], [0,6]);
              dispatch({type: "ai"});
            }
          } else if (this.gameMode==="Competitivo") {
            if (this.player1===this.user_id) {
              this.myTurn=true;
            }
          }
          this.initialized=true;
        }
      } else {
        if (this.myTurn) {
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
            let x = Math.floor(t.event.locationX/Constants.CELL_SIZE);
            let y = Math.floor(t.event.locationY/Constants.CELL_SIZE);
  
            if (entities[x*7+y].valid && !entities[x*7+y].blocked) {
              //clean green squares
              for (var j = piece.position[1]-1; j<=piece.position[1]+1; j++) {
                for (var i = piece.position[0]-1; i<=piece.position[0]+1; i++) {
                  if (j>=0 && j<=6 && i>=0 && i<=6) {
                    entities[i*7+j].valid = false;
                  }
                }
              }
  
              playSound();
            
              entities.push({position: [piece.position[0], piece.position[1]], size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>})
              entities[x*7+y].blocked = true;
              piece.position = [x, y];
  
              if (this.gameMode==="Contra o Computador") {
                this.ai.AI_blocked_squares[y][x] = true;
                dispatch({type: "ai"});
                this.myTurn=false;
              }
              if (this.gameMode==="Competitivo") {
                socket.emit("move", y*7+x, user_id, match_id);
                this.myTurn=false;
              }
            }
            
          });
        }
      }
  
      if (piece.position[0]===0 && piece.position[1]===6) {
        //player 1 won
        this.gameEnded=true;
        entities.push({visible:true, text: "Player 1 won", renderer: <GameModal></GameModal>});
      } else if (piece.position[0]===6 && piece.position[1]===0) {
        //player 2 won
        this.gameEnded=true;
        entities.push({visible:true, text: "Player 2 won", renderer: <GameModal></GameModal>});
      }
    }
  
    return entities;
  }
}


export {GameLoop};