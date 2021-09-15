import campagne from '../assets/images/campagne.jpg';
import ville from '../assets/images/ville.jpg';
import caverne from '../assets/images/caverne.jpg';
import batiment from '../assets/images/batiment.jpg';
import foret from '../assets/images/foret.jpg';

const illustrations = {
  campagne,
  ville, 
  caverne,
  batiment,
  foret
};

export const getIllustration = (name) => {
  let category;
  let splittedCategory = name.split(' - ');
  if (splittedCategory.length > 1) {
    category = splittedCategory[1].toLowerCase();
  } else {
    category = splittedCategory[0].toLowerCase();
  }
  console.log('category');
  console.log(category);
  return illustrations[category];
  
}

