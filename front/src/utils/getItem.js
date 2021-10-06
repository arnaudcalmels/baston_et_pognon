import { store } from '../store/store';

// fonction générique qui récupère un item dans un tableau
const getItem = (id, itemType) => {
  const { character: { characters } } = store.getState();
  const { scenario: { scenarios } } = store.getState();
  
  const itemList = {
    characters,
    scenarios,
  };
  
  return itemList[itemType].find(character => character.id === parseInt(id, 10));
};

export default getItem;