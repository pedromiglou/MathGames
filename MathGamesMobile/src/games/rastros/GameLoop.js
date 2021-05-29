import * as React from "react";
import Constants from './Constants';
import Blocked from './Blocked';

const GameLoop = (entities, {touches, events, dispatch }) => {
    let piece = entities[49];
    let squares = entities.slice(0, -1);

    touches.filter(t => t.type === "press").forEach(t => {
        entities.push({position: [piece.position[0], piece.position[1]], size: Constants.CELL_SIZE, renderer: <Blocked></Blocked>})
        let x = Math.floor(t.event.locationX/Constants.CELL_SIZE);
        let y = Math.floor(t.event.locationY/Constants.CELL_SIZE);
        
        piece.position = [x, y];
      });
    
    return entities;
}

export {GameLoop};