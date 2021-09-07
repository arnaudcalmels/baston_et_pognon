import React from 'react';

import PropTypes from 'prop-types';

import styles from './section.module.scss';

const Section = ( { title, children } ) => {
  return (
    <div className={styles['main']}>
      <h3 className={styles['title']}>{title}</h3>
      <div className={styles['content']}>
        {children}
      </div>
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children:PropTypes.array,
};

export default Section;