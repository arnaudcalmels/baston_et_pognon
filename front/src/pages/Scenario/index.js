import React from 'react';

import Title from '../../components/Title';
import Card from '../../components/Card';
import Button from '../../components/Button';

// import PropTypes from 'prop-types';

import styles from './scenario.module.scss';


const Scenario = props => {
  return (
    <div className={styles['main']}>
      <Title title='Nom Scénario' id={styles['title']}/>

      <img className={styles['picture']} src="https://cdn.pixabay.com/photo/2021/04/22/06/40/duck-6198196__340.jpg" alt="photo_scenario"/>

      <table className={styles['table']} id={styles['caracteristics']}>
        <tbody className={styles['table_content']}>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Nombre de joueurs :</td>
            <td className={styles['table_cell-value']}>{4}</td>
          </tr>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Niveau de départ :</td>
            <td className={styles['table_cell-value']}>{1}</td>
          </tr>
        </tbody>
      </table>


      <div className={styles['description']}>
        <h3>Description</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dicta sed esse, sapiente dolorum illum, dolore doloribus quos natus dolorem aliquid sequi quae dolores recusandae cupiditate porro blanditiis deserunt atque!</p>
      </div>

      <div className={styles['buttons']}>
        <Button 
          id={styles['edit_button']}
          color='#eee' 
          children='Editer le personnage' 
          // onClick={() => {
          //   console.log('editer perso');
          //   showForm();
          // }} 
        />

        <Button 
          color='#eee' 
          children='Supprimer le personnage' 
          // onClick={() => {
          //   setOpenDeleteModal(true);
          // }} 
        />
      </div>

    </div>
  );
};

// Scenario.propTypes = {
  
// };

export default Scenario;