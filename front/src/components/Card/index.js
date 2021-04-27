import React from 'react';

import PropTypes from 'prop-types';

import styles from './card.module.scss';

const Card = ({ image, name, profession, level, onClick }) => {
  return (
    <article className={styles['card']} onClick={onClick}
    >
      <div className={styles['image_container']}>
        <img 
          id={styles['image']}
          src={image} 
          alt='photo_personnage'
        />
      </div>
      <h3 className={styles['name']}>{name}</h3>
      <h4 className={styles['profession']}>{profession}</h4>
      <span className={styles['level']}>Niveau {level}</span>
    </article>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  profession: PropTypes.string,
  level: PropTypes.number,
};

export default Card;