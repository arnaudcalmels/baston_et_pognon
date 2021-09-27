export const getIcon = (action, profession) => {
  let iconCategory = '';
  if (action.heal) {
    iconCategory = 'heal'
  } else if (!action.distance) {
    iconCategory = 'sword';
  } else if (profession && profession === 'Mage') {
    iconCategory = 'spell';
  } else {
    iconCategory = 'bow';
  }
  
  if (action.isSpecial) {
    iconCategory = iconCategory + '-special';
  }
  return iconCategory;
};
 
export const getTitle = (action, profession) => {
  let text = '';
  if (action.heal) {
    text = 'Soin'
  } else if (!action.distance) {
    text = 'Attaque au corps à corps';
  } else if (profession && profession === 'Mage') {
    text = 'Sort';
  } else {
    text = 'Attaque à distance';
  }
  
  if (action.isSpecial) {
    text = text + ' spécial(e)';
  }
  return text;
};
