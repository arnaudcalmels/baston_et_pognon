import React from 'react';

import PropTypes from 'prop-types';

import styles from './card.module.scss';

const Card = ({ image, name, profession, level, onClick, alt, description, players, entity }) => {
  return (
    <article className={styles[`card_${entity}`]} onClick={onClick}
    >
      <div className={styles[`image_container_${entity}`]}>
        <img 
          id={styles[`image_${entity}`]}
          src={image} 
          alt={alt}
        />
      </div>
      <div className={styles[`text_container_${entity}`]}>
        <h3 className={styles['name']}>{name}</h3>

        {
          description &&
          <p className={styles['description']}>{description}</p>
        }

        {
          profession &&
          <p className={styles['profession']}>{profession}</p>
        }

        {
          players &&
          <p className={styles['players']}>Nombre de joueurs : 
            <span>{players}</span>
          </p>
        }

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
  profession: PropTypes.string,
  level: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  onClick: PropTypes.func,
  alt: PropTypes.string,
  description: PropTypes.string,
  players: PropTypes.number,
  entity: PropTypes.string,
};

export default Card;