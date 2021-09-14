import React from 'react';

import PropTypes from 'prop-types';

import styles from './place.module.scss';

const Place = ({ place, onClick}) => {
  return (
    <div 
      className={styles['overlay']}
      onClick={onClick} 
    >
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

      <div className={styles['infos']}>
        <div className={styles['name']}>{place.name}</div>

        <div className={styles['monsters']}>
          {
            place.monsters?.length > 1 ?
            `${place.monsters?.length} monstres`
            :
            `${place.monsters?.length} monstre`
          } 
        </div>
      </div>
    </div>
  )
};

Place.propTypes = {
  place: PropTypes.object,
  onClick: PropTypes.func,
}

export default Place;
