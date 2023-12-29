const addSub = (name) => ({
  type: 'CREATE_SUB',
  payload: {
    name: name,
    
  }
});

const deleteSub = (id) => ({
  type: 'DELETE_SUB',
  payload: {id: id}
});



const selectSub = (subId) => ({
  type: 'SELECT_SUB',
  payload: { id: subId },
});

const collectComic = (comicId,selectedSubId) => ({

    type: 'COLLECT_COMIC',
    payload: { id:comicId , subId:selectedSubId}
  
});

const giveUpComic = (comicId,selectedSubId) => ({
    type: 'GIVEUP_COMIC',
    payload: {  id:comicId , subId:selectedSubId }
  
});


export {addSub, deleteSub,selectSub, collectComic,giveUpComic };
