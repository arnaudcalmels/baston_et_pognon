import store from '../store/store';

const getItems = (id, itemType) => {
  const { character: { characters } } = store.getState();
  
  const itemList = {
    characters,
  };
  
  return itemList[itemType].find(character => character.id === parseInt(id, 10));
};

export default getItems;