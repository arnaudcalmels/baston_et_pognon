import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import styles from './footer.module.scss';

const Footer = (props) => {
  return (
    <div className={styles['footer']}>
      <ul>
        <li>
          <Link className={styles['link']} to='#'>A propos</Link>              
        </li>
        <li>
          <Link className={styles['link']} to='#'>Contact</Link>
        </li>
        <li>
          <Link className={styles['link']} to='#'>Mentions légales</Link>
        </li>
      </ul>
      <p>Noux - 2021</p>
    </div>
  );
};

// Footer.propTypes = {
    
// };

export default Footer;