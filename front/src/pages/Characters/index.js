import React from 'react';
import { NavLink } from 'react-router-dom';

import Title from '../../components/Title';
import Card from '../../components/Card';

// import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';


import styles from './characters.module.scss';

const Characters = (props) => {
  return (
    <div className={styles['main']}>
      <div className={styles['title_container']}>
        <Title title='Personnages' />
        <FontAwesomeIcon 
          onClick={() => console.log('créer personnage')} 
          className={styles['plus']} 
          icon={faPlusCircle} 
          size="2x" 
          style={{cursor: 'pointer'}}
        />
        <p className={styles['new']}>Nouveau personnage</p>
      </div>

      <div className={styles['card_container']}>
        <Card 
          image={'https://cdn.pixabay.com/photo/2016/12/07/17/44/man-1889980__340.png'}
          name={'Michel'}
          profession={'Guerrier'}
          level={1}
        />
        <Card 
          image={'https://cdn.pixabay.com/photo/2016/12/05/20/55/doll-1884915__340.png'}
          name={'Martine'}
          profession={'Mage'}
          level={2}
        />
      </div>

      <div className={styles['text_container']}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto autem officia eos cupiditate numquam sit neque ratione possimus blanditiis omnis voluptate repudiandae, doloremque fugiat, magnam voluptatem facilis quis tempora animi?</p>
        <img src="https://cdn.pixabay.com/photo/2016/04/30/13/12/sutterlin-1362879__340.jpg" alt="page"/>
        <NavLink 
          className={styles['navlink']} 
          to="" 
          onClick={() => console.log('créer personnage')}
        >
          Créer mon 1er personnage
        </NavLink>  
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste vel, error eligendi nam doloribus eum facilis saepe tempora distinctio odio enim. Animi distinctio natus perspiciatis sunt rem, aliquid hic voluptas!</p>
        <img src="https://cdn.pixabay.com/photo/2017/11/17/07/56/background-2956789__340.jpg" alt="page2"/>
      </div>

    </div>
  );
};

// Characters.propTypes = {
    
// };

export default Characters;