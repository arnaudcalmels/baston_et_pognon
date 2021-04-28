import React from 'react';

import PropTypes from 'prop-types';

import styles from './title.module.scss';

const Title = ({ title, id }) => {
  return (
    <h2 
      className={styles['title']}
      id={id}>
      {title}
    </h2>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
}

export default Title;