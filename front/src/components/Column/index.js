import React from 'react';

import PropTypes from 'prop-types';

import styles from './column.module.scss';

const Column = ( { children, dynamicClassName } ) => {
  return (
    <div className={`${styles[dynamicClassName]}`}>
      {children}
    </div>
  );
};

Column.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array, PropTypes.object, PropTypes.element,
  ]),
  dynamicClassName: PropTypes.string,
};

export default Column;
