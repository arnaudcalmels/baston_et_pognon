import React from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './section.module.scss';

const Section = ( { title, children, addButton, buttonTitle } ) => {
  return (
    <div className={styles['main']}>
      <div className={styles['header']}>
        <h3 className={styles['title']}>{title}</h3>
        {
          addButton &&
          <FontAwesomeIcon 
            className={styles['add_group']}
            onClick={addButton} 
            icon={faPlusCircle} 
            size="2x" 
            style={{cursor: 'pointer'}}
            title={buttonTitle}
          />
        }
      </div>

      <div className={styles['content']}>
        {children}
      </div>
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children:PropTypes.array,
  addButton: PropTypes.func,
  buttonTitle: PropTypes.string,
};

export default Section;