import React from 'react';

import PropTypes from 'prop-types';

import styles from './column.module.scss';

const Column = ( { children } ) => {
  return (
    <div className={styles['main']}>
      {children}
    </div>
  );
};

Column.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array, PropTypes.object, PropTypes.element,
  ]),
};

export default Column;