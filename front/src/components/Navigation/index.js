import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const Navigation = (props) => {
    return (
        <div>
            <Link to="/">Logo</Link>
            <Link to="/personnage">Personnages</Link>   
            <Link to="/scenario">Scénarios</Link>   
            <Link to="/jeu">Parties en ligne</Link>   
            <Link to="/actualité">Actualités</Link>   
        </div>
    );
};

// Navigation.propTypes = {
    
// };

export default Navigation;