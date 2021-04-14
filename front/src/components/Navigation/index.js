import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button';
// import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './navigation.module.css';

const Navigation = (props) => {
    const displayMenu = () => {
        const menu = document.getElementsByClassName(styles['menu'])[0];
        menu.classList.toggle(styles['show']);
    };

    return (
        <div className={styles['header']}>
            <h1 className={styles['logo']}>
                <NavLink className={styles['navlink']} to="/">Baston & Pognon</NavLink>
            </h1>

            <FontAwesomeIcon onClick={() => displayMenu()} className={styles['bars']} icon={faBars} size="2x" />     

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
                    <Button color='#eee' children='Inscription'></Button>
                    <Button color='#eee' children='Connexion'></Button>
                </div>
            </div>
        </div>
    );
};

// Navigation.propTypes = {
    
// };

export default Navigation;