import React from 'react';

import PropTypes from 'prop-types';

import styles from './card.module.scss';

const Card = ({ image, name, profession, level}) => {
  return (
    <article className={styles['card']}>
      <img 
        id={styles['image']}
        src={image} 
        alt='photo_personnage'
      />
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