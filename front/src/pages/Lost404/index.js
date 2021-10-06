import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './lost404.module.scss';
import door from '../../assets/images/door_closed.png';

const Lost404 = () => {
  return (
    <div className={styles['main']}>
      <p>Désolé, cette page n'existe pas.</p>

      <NavLink 
        className={styles['navlink']} 
        to="/" 
      >
        Retour à l'accueil
      </NavLink>  
      
      <img className={styles['image']} src={door} alt="Page non trouvée" />
    </div>
  )
};

export default Lost404;
