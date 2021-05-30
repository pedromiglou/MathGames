import * as React from "react";
import Constants from './Constants';
import Blocked from './Blocked';
import { Audio } from 'expo-av';
import RastrosAI from './RastrosAI';

let ai = new RastrosAI();

const GameLoop = (entities, {touches, events, dispatch }) => {
    let piece = entities[49];
    let squares = entities.slice(0, 49);
    let blockedSquares = entities.slice(50);

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
           require('../../../public/game_assets/rastros/move.wav')
        );

        await sound.playAsync();
    }

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
          piece.position = ai.randomPlay(1, valid_squares, piece.position);
          }
      }
    }

    touches.filter(t => t.type === "press").forEach(t => {
        let x = Math.floor(t.event.locationX/Constants.CELL_SIZE);
        let y = Math.floor(t.event.locationY/Constants.CELL_SIZE);
        
        playSound();
        entities.push({position: [piece.position[0], piece.position[1]], size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>})
        piece.position = [x, y];
        ai.AI_blocked_squares[y][x] = true;
        dispatch({type: "ai"});
      });
  
    
    return entities;
}

export {GameLoop};