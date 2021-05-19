import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import styles from './loader.module.scss';

const Loader = () => {
  return (
    <div className={styles['loader_container']}>
      <PulseLoader color={'#36D7B7'} loading={true} />
    </div>
  );
};

export default Loader;