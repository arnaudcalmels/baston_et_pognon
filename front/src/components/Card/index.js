import React from 'react';

import PropTypes from 'prop-types';

import styles from './card.module.scss';

const Card = ({ image, name, subtitle, level, onClick, alt, description, players }) => {
  return (
    <article className={styles['card']} onClick={onClick}
    >
      <div className={styles['image_container']}>
        <img 
          id={styles['image']}
          src={image} 
          alt={alt}
        />
      </div>
      <div className={styles['text_container']}>
        <h3 className={styles['name']}>{name}</h3>
        <p className={styles['description']}>{description}</p>
        <p className={styles['subtitle']}>{subtitle}</p>
        <p className={styles['players']}>Nombre de joueurs : 
          <span>{players}</span>
        </p>
        <p className={styles['level']}>Niveau : 
          <span>{level}</span>
        </p>
      </div>
    </article>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  level: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  onClick: PropTypes.func,
  alt: PropTypes.string,
  description: PropTypes.string,
  players: PropTypes.number,
};

export default Card;