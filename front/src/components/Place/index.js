import React from 'react';

//import Modal from '../Modal';

import PropTypes from 'prop-types';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './place.module.scss';

const Place = ({ place, onClick}) => {
    
  return (
    <div 
      className={styles['content']}
      onClick={onClick} 
    >
      <div 
        key={place.id}
        className={styles['place']} 
      >
        {place.name}
      </div>
      {
        place.picture ?
        <img 
          src={place.picture.base64} 
          alt={place.picture.name}
          id={styles['image']}
          />
        :
        <div className={styles['image']}></div>
      }
      <div className={styles['monsters']}>
        {
          place.monsters?.length > 1 ?
          `${place.monsters?.length} monstres`
          :
          `${place.monsters?.length} monstre`
        } 
      </div>
    </div>
  )
};

Place.propTypes = {
  place: PropTypes.object,
  setItem: PropTypes.func,
}

export default Place;
