import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FormData from 'form-data';

import Button from '../Button';
import PropTypes from 'prop-types';

import styles from './addPlace.module.scss';

const AddPlace = ({ scenarioId, newPlace, closeModal, openMonsterModal, getCategories, categories }) => {
  useEffect(() => {
    getCategories();
  },
  // eslint-disable-next-line
  []);

  const handleSubmit = (values) => {
    let data = new FormData();
    data.append('name', values.name);
    data.append('picture', values.picture);
    data.append('description', values.description);
    data.append('categoryId', values.categoryId);
    data.append('hiddenBoosterCount', values.hiddenBoosterCount);
    data.append('scenarioId', values.scenarioId);
    console.log(data);
    newPlace(data);
    closeModal();
  };

  return (
    <div>
      <Formik
        initialValues={{
          scenarioId: scenarioId,
          name: '',
          categoryId: '',
          description: '',
          hiddenBoosterCount: 0,
          picture: ''
        }}
        validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Veuillez remplir ce champ !';
            }
            return errors;
          }}
        onSubmit={(values) => handleSubmit(values)}
      >
      {
        (props) => (
          <Form className={styles['form']}>
            <h3 className={styles['form_title']}>Je crée un nouveau lieu</h3>

            <div className={styles['form_content']}>

              <div className={`${styles['newPlace_name']} ${styles['form_item']}`}>
                <label htmlFor="name" className={styles['form_label']}>Nom * :</label>
                <Field
                  className={styles['form_field']}
                  id="name"
                  name="name"
                  type="text"
                />
                <ErrorMessage name='name' component='div' className={styles['error_message']}/>
              </div>

              <div className={`${styles['newPlace_booster']} ${styles['form_item']}`}>
                <label htmlFor="hiddenBoosterCount" className={styles['form_label']}>Boosters cachés :</label>
                  <Field
                    className={styles['form_field']}
                    id="hiddenBoosterCount"
                    name="hiddenBoosterCount"
                    type="number"
                    min={0}
                  />
              </div>

              <div className={`${styles['newPlace_picture']} ${styles['form_item']}`}>
                <label htmlFor="picture" className={styles['form_label']}>Image :</label>
                <input 
                  name="picture" 
                  type="file" 
                  onChange={(event) => {
                    props.setFieldValue("picture", event.currentTarget.files[0]);
                    console.log(event.currentTarget);
                  }}
                  />
              </div>

              <div className={`${styles['newPlace_description']} ${styles['form_item']}`}>
                <label htmlFor="description" className={styles['form_label']}>Description :</label>
                <Field 
                  as="textarea" 
                  name="description" 
                  className={styles['form_field']}    
                />
              </div>

              <div className={`${styles['newPlace_category']} ${styles['form_item']}`}>
                <label htmlFor="categoryId" className={styles['form_label']}>Catégorie :</label>
                <Field
                  as="select"
                  name="categoryId"
                  className={styles['form_field']}
                >
                  {
                    categories.map(category => (
                      <option value={category.id}>{category.name}</option>
                    ))
                  }
                </Field>
              </div>

            </div>

            <Button 
              id={styles['submit_button']} 
              type="submit" 
              color='#eee' 
              children='Valider'
            />
          </Form>
        )
      }
    </Formik>

    <Button 
      id={styles['cancel_button']} 
      color='#eee' 
      children='Annuler' 
      onClick={closeModal}
    />

    <Button 
      id={styles['addMonsters_button']} 
      color='#eee' 
      children='Ajouter des monstres' 
      onClick={openMonsterModal}
    />

    </div>
  );
};

AddPlace.propTypes = {
  scenarioId: PropTypes.number,  
  newPlace: PropTypes.func,
  closeModal: PropTypes.func,
  openMonsterModal: PropTypes.func,
  getCategories: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.object,),
};

export default AddPlace;