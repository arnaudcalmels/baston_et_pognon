import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import DeleteConfirm from '../../components/DeleteConfirm';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faRing, faCoins } from '@fortawesome/free-solid-svg-icons';

import styles from './character.module.scss';

import getItems from '../../utils/getItems';

const Character = ({ deleteCharacter, editCharacter }) => {
  const { id } = useParams();
  let character = getItems(id, 'characters');

  const showForm = () => {
    const block_form = document.getElementById(styles['block_form']);
    const identity = document.getElementById(styles['identity']);
    
    block_form.classList.toggle(styles['show_form']);
    identity.classList.toggle(styles['hide_identity']);
    
    window.scrollTo(0, 0);
  }
  
  const [openDeleteModal, setOpenDeleteModal] = useState(false);  

  let history = useHistory(); 

  const handleDeleteCharacter = (id) => {
    deleteCharacter(id);
    history.push('/personnage');
  }

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    editCharacter(character.id, JSON.stringify(values, null, 2));
  };

  return (
    <div className={styles['main']}>
      <div className={styles['overlay-image']}>
        <img src="https://cdn.pixabay.com/photo/2016/12/07/17/44/man-1889980__340.png" alt="photo_perso"/>  
        <div className={styles['hover']}>
          <FontAwesomeIcon 
            onClick={() => console.log('modifier photo')} 
            icon={faPlusCircle} 
            size="2x" 
            style={{cursor: 'pointer'}}
            title="Modifier l'image"
          />
        </div>
      </div>

      <h2 className={styles['name']}>{character.name}</h2>

      <table className={styles['table']} id={styles['identity']}>
        <tbody className={styles['table_content']}>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Sexe :</td>
            <td className={styles['table_cell-value']}>{character.sex}</td>
          </tr>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Classe :</td>
            <td className={styles['table_cell-value']}>{character.profession.name}</td>
          </tr>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Race :</td>
            <td className={styles['table_cell-value']}>{character.race.name}</td>
          </tr>
        </tbody>
      </table>

      <div id={styles['block_form']} className={styles['hide_form']}>
        <Formik
          initialValues={{
          name: '',
          sex: '',
          professionId: '',
          raceId: '',
          }}
          validate={values => {
            const errors = {};
            if (!values.name || !values.sex || !values.professionId || !values.raceId) {
              errors.all = 'Veuillez remplir tous les champs !';
            }
            return errors;
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form className={styles['form']}>
            {/* <ErrorMessage name='all' component='div' className={styles['error_message']}/> */}

            <label htmlFor="name" className={styles['form_label']}>Nom :</label>
            <Field
              className={styles['form_field']}
              id="name"
              name="name"
              type="text"
            />

            <div className={styles['form_label']}>Sexe :</div>
            <div role="group" className={styles['form_group']}>
              <label className={styles['form_radio']}>
                <Field type="radio" name="sex" value="M" className={styles['form_radio-input']}/>
                M
              </label>
              <label className={styles['form_radio']}>
                <Field type="radio" name="sex" value="F" className={styles['form_radio-input']}/>
                F
              </label>
            </div>

            <label htmlFor="professionId" className={styles['form_label']}>Classe :</label>
            <Field
              className={styles['form_field']}
              id="professionId"
              name="professionId"
              type="select"
            />
              {/* <option></option> */}

            <label htmlFor="raceId" className={styles['form_label']}>Race :</label>
            <Field
              className={styles['form_field']}
              id="raceId"
              name="raceId"
              type="select"
            />
              {/* <option></option> */}

          <span className={styles['info']}>Tous les champs sont obligatoires.</span>

            <Button
              id={styles['submit_button']}
              type="submit"
              color='#eee'
              children='Valider'
            />
        
          </Form>
        </Formik>
        <Button
          id={styles['cancel_button']}
          color='#eee'
          children='Annuler'
          onClick={() => showForm()}
        />
      </div>

      <table className={styles['table']} id={styles['caracteristics']}>
        <tbody className={styles['table_content']}>
          <tr className={styles['table_title']}>
            <td>Niveau {character.level}</td>
          </tr>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Attaque normale :</td>
            <td className={styles['table_cell-value']}>10</td>
          </tr>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Attaque spéciale :</td>
            <td className={styles['table_cell-value']}>20</td>
          </tr>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>PV :</td>
            <td className={styles['table_cell-value']}>100</td>
          </tr>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Armure :</td>
            <td className={styles['table_cell-value']}>25</td>
          </tr>
        </tbody>
      </table>

      <table className={styles['table']} id={styles['inventory']}>
      <tbody className={styles['table_content']}>
          <tr className={styles['table_title']}>
            <td>Inventaire</td>
          </tr>
          {
            character.inventory.specialObjects.map(object => (
              <tr className={styles['table_row_inventory']} key={object.id}>
                <td className={styles['table_cell_inventory-picture']}>
                  <FontAwesomeIcon 
                    icon={faRing} 
                    size="2x" 
                  />
                </td>
                <td className={styles['table_cell_inventory-name']}>{object.name}</td>
                <td className={styles['table_cell_inventory-value']}>+ 1 PV </td>
              </tr>
            ))
          }
          <tr className={styles['table_row_inventory']}>
            <td className={styles['table_cell_inventory-picture']}>
              <FontAwesomeIcon 
                icon={faCoins} 
                size="2x" 
              />
            </td>
            <td className={styles['table_cell_inventory-name']}>Booster</td>
            <td className={styles['table_cell_inventory-value']}>{character.inventory.boostersCount} </td>
          </tr>

        </tbody>
      </table>

      <table className={styles['table']} id={styles['statistics']}>
        <tbody className={styles['table_content']}>
          <tr className={styles['table_title']}>
            <td>Statistiques</td>
          </tr>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Nb de parties jouées :</td>
            <td className={styles['table_cell-value']}>10</td>
          </tr>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Autre stat :</td>
            <td className={styles['table_cell-value']}>20</td>
          </tr>
       </tbody>
      </table>

      <div className={styles['buttons']}>
        <Button 
            color='#eee' 
            children='Editer le personnage' 
            onClick={() => {
              console.log('editer perso');
              showForm();
            }} 
          />

        <Button 
          color='#eee' 
          children='Supprimer le personnage' 
          onClick={() => {
            setOpenDeleteModal(true);
          }} 
        />
      </div>

      <Modal 
        isOpen={openDeleteModal} 
        closeModal={() => {
          console.log('clic');
          setOpenDeleteModal(false);
        }}
        title='Supprimer le personnage ?' 
        children={
          <DeleteConfirm 
            cancelAction={() => setOpenDeleteModal(false)} 
            confirmAction={() => {
              handleDeleteCharacter(id)
              setOpenDeleteModal(false);
            }}
          />}
      />

    </div>
  );
};

Character.propTypes = {
  deleteCharacter: PropTypes.func,
  editCharacter: PropTypes.func,
};

export default Character;