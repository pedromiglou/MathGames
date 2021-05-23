// const ADD_MATCH = 'ADD_MATCH';
// const REMOVE_MATCH = 'REMOVE_MATCH';

// const defaultmatches = [];

// function matches(state=defaultmatches, action) {
//     switch (action.type) {
//         case ADD_MATCH:
//           return [
//             ...state,
//             {
//               match_id: action.match.match_id,
//               opponent: action.match.opponent

//             }
//           ];
//         case REMOVE_MATCH:
//           const match_to_delete = state.find(match => action.match_id === match.match_id);
//           const index = state.indexOf(match_to_delete);
//           if (index > -1) {
//             state.splice(index, 1);
//           }

//           return [
//             ...state,
//           ];
//         default:
//           return state;
//       }
// }

export default function matchApp(state=[], action) {
  console.log(action)
  switch(action.type){
    case 'ADD_MATCH':
      if (state.find(match => match.match_id === action.match.match_id) === undefined)
        return [...state, action.match];
      else
        return state;
    case 'REMOVE_MATCH':
      const match_to_delete = state.find(match => match.match_id === action.match.match_id);
      const index = state.indexOf(match_to_delete);
      if (index > -1) {
        state.splice(index, 1);
      }

      return [
        ...state,
      ];
    default:
      return state;
  }
}
