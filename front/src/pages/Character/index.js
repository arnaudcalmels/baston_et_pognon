import React from 'react';

import Title from '../../components/Title';
import Card from '../../components/Card';

// import PropTypes from 'prop-types';

import styles from './character.module.scss';

const Character = (props) => {
  return (
    <div className={styles['main']}>
      <Title title='Personnages' />
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

    </div>
  );
};

// Character.propTypes = {
    
// };

export default Character;