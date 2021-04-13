import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button';
// import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './navigation.module.css';

const Navigation = (props) => {
    return (
        <div className={styles['header']}>
            <h1 className={styles['logo']}>
                <NavLink className={styles['navlink']} to="/">Baston & Pognon</NavLink>
            </h1>

            <FontAwesomeIcon className={styles['bars']} icon={faBars} size="3x" />     

            <div className={styles['menu']}>   
                <nav className={styles['navbar']}>
                    <ul>
                        <li>
                        {/* eslint-disable-next-line */}
                            <NavLink className={styles['item1', 'navlink']} exact activeClassName={styles['isActive']} to="/personnage">Personnages</NavLink>   
                        </li>
                        <li>
                        {/* eslint-disable-next-line */}
                            <NavLink className={styles['item2', 'navlink']} exact activeClassName={styles['isActive']} to="/scenario">Scénarios</NavLink>  
                        </li>
                        <li>
                        {/* eslint-disable-next-line */}
                            <NavLink className={styles['item3', 'navlink']} exact activeClassName={styles['isActive']} to="/jeu">Parties en ligne</NavLink> 
                        </li>
                        <li>
                        {/* eslint-disable-next-line */}
                            <NavLink className={styles['item4', 'navlink']} exact activeClassName={styles['isActive']} to="/actualité">Actualités</NavLink> 
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