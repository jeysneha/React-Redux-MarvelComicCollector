
const initalState = [

];


const handleReducer = (state = initalState, action) => {
  const {type, payload} = action;


  switch (type) {
    case 'COLLECT_COMIC':
      {
        const subIndex = state.findIndex(sub => sub.subid === payload.subId);
        if (subIndex !== -1) {
          
          if (!state[subIndex].col.includes(payload.id)) {
            const newState = [...state];
            newState[subIndex] = {
              ...newState[subIndex],
              col: [...newState[subIndex].col, payload.id],
            };
            return newState;
          }
        } else {
          
          return [...state, { subid: payload.subId, col: [payload.id] }];
        }
        return state;
      }
    case 'GIVEUP_COMIC':
      {
        const subIndex = state.findIndex(sub => sub.subid === payload.subId);
        if (subIndex !== -1) {
         
          const filteredCol = state[subIndex].col.filter(id => id !== payload.id);
          const newState = [...state];
          newState[subIndex] = {
            ...newState[subIndex],
            col: filteredCol,
          };
          return newState;
        }
       
        return state;
      }
      default:
        return state;
    }

};

export default handleReducer;

      