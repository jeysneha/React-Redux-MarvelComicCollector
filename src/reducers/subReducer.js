import {v4 as uuid} from 'uuid';
const initalState = [
  
];

let copyState = null;
let index = 0;

const subReducer = (state = initalState, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'CREATE_SUB':
      console.log('payload', payload);
      return [
        ...state,
        {
          id: uuid(),
          name: payload.name,
          
        }
      ];
    case 'DELETE_SUB':
      copyState = [...state];
      index = copyState.findIndex((x) => x.id === payload.id);
      copyState.splice(index, 1);
      return [...copyState];
    case 'SELECT_SUB':
      
        return [
          ...state,
          {
          selectedSub: payload.id,
        }
      ]
    
    default:
      return state;
    
  }
};

export default subReducer;
