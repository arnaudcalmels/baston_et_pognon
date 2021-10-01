import React from 'react';
import { Link } from 'react-router-dom';

import styles from './footer.module.scss';

const Footer = (props) => {
  return (
    <div className={styles['footer']}>
      <Link className={styles['link']} to='/infos-mentions-legales'>A propos / Mentions légales</Link>
    </div>
  );
};

export default Footer;
