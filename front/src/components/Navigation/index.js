import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import styles from './navigation.module.css';

const Navigation = ({ isRegisterModalOpen, isLoginModalOpen, isLoggedIn, logout, username }) => {
  const displayMenu = () => {
    const menu = document.getElementsByClassName(styles['menu'])[0];
    menu.classList.toggle(styles['show']);
  };
  const displayUserMenu = () => {
    const userMenu = document.getElementsByClassName(styles['user_navbar'])[0];
    userMenu.classList.toggle(styles['show_user_navbar']);
  };

  return (
    <div className={styles['header']}>
      <h1 className={styles['logo']}>
        <NavLink className={styles['navlink']} to="/">Baston & Pognon</NavLink>
      </h1>

      <FontAwesomeIcon onClick={() => displayMenu()} className={styles['bars']} icon={faBars} size="2x" style={{cursor: 'pointer'}}/>     

      <div className={styles['menu']}>   
        <nav className={styles['navbar']}>
          <ul>
            <li>
              <NavLink className={styles['navlink']} exact activeClassName={styles['isActive']} to="/personnage">Personnages</NavLink>   
            </li>
            <li>
              <NavLink className={styles['navlink']} exact activeClassName={styles['isActive']} to="/scenario">Scénarios</NavLink>  
            </li>
            <li>
              <NavLink className={styles['navlink']} exact activeClassName={styles['isActive']} to="/jeu">Parties en ligne</NavLink> 
            </li>
            <li>
              <NavLink className={styles['navlink']} exact activeClassName={styles['isActive']} to="/actualité">Actualités</NavLink> 
            </li>
          </ul>
        </nav>
        
        <div className={styles['log']}>

        {
          isLoggedIn ?
          <div className={styles['user_menu']}>
            <img id={styles['avatar']} src="https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805__340.png" alt='photo_avatar'/>

            <p>{username}</p>
            <FontAwesomeIcon onClick={() => displayUserMenu()} className={styles['chevron']} icon={faChevronDown} size="x" style={{cursor: 'pointer'}}/>     

            <nav className={styles['user_navbar']}>
              <ul>
                <li>
                  <NavLink className={styles['navlink']} to="/profile">Profil</NavLink>   
                </li>
                <li>
                  <Button id={styles['logout_button']} color='#eee' children='Déconnexion' onClick={logout} />
                </li>
              </ul>
            </nav>
          </div>
          :
          <>
            <Button color='#eee' children='Inscription' onClick={isRegisterModalOpen} />
            <Button color='#eee' children='Connexion' onClick={isLoginModalOpen} />
          </>
        }

        </div>
      </div>
    </div>
  );
};

Navigation.propTypes = {
  isRegisterModalOpen: PropTypes.func, 
  isLoginModalOpen: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func,
  username: PropTypes.string,
};

export default Navigation;