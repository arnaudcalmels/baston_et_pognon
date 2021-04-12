import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
// import PropTypes from 'prop-types';

const Navigation = (props) => {
    return (
        <div>
            <Link to="/">Logo</Link>
            <Link to="/personnage">Personnages</Link>   
            <Link to="/scenario">Scénarios</Link>   
            <Link to="/jeu">Parties en ligne</Link>   
            <Link to="/actualité">Actualités</Link>   
            <Button color='#eee' children='Inscription'></Button>
            <Button color='#eee' children='Connexion'></Button>
        </div>
    );
};

// Navigation.propTypes = {
    
// };

export default Navigation;