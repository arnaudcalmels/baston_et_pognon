import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FileBase64 from 'react-file-base64';

import Button from '../Button';
import PropTypes from 'prop-types';

import styles from './addPlace.module.scss';

const AddPlace = ({ scenarioId, newPlace, closeModal, getCategories, categories }) => {
  useEffect(() => {
    getCategories();
  },
  // eslint-disable-next-line
  []);

  let [ picture, setPicture ] = useState();

  const getFile = (props, file) => {
    props.setFieldValue("picture", file);
    setPicture(file);
  };

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    newPlace(JSON.stringify(values, null, 2), closeModal);
  };

  return (
    <div>
      <Formik
        initialValues={{
          scenarioId: scenarioId,
          name: '',
          categoryId: 0,
          description: '',
          hiddenBoosterCount: 0,
          picture: null
        }}
        validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Veuillez remplir ce champ !';
            }
            if (values.categoryId === 0) {
              errors.categoryId = 'Veuillez sélectionner une catégorie !';
            }
            return errors;
          }}
        onSubmit={(values) => handleSubmit(values)}
      >
      {
        (props) => (
          <Form className={styles['form']}>
            <div className={styles['form_content']}>

              {/* eslint-disable-next-line */}
              <img id={styles['image_preview']} src={picture?.base64} alt={picture?.name}/>

              <div className={`${styles['newPlace_picture']} ${styles['form_item']}`}>
                <label htmlFor="picture" className={styles['form_label']}>Image :</label>
                <FileBase64
                  multiple={false}
                  onDone={getFile.bind(this, props)}
                />
              </div>

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

              <div className={`${styles['newPlace_category']} ${styles['form_item']}`}>
                <label htmlFor="categoryId" className={styles['form_label']}>Catégorie * :</label>
                <Field
                  as="select"
                  name="categoryId"
                  onChange={props.handleChange}
                  className={styles['form_field']}
                >
                  <option defaultValue>Sélectionnez une catégorie</option>
                  {
                    categories.map(category => (
                      <option value={category.id}>{category.name}</option>
                    ))
                  }
                </Field>
                <ErrorMessage name='categoryId' component='div' className={styles['error_message']}/>
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

              <div className={`${styles['newPlace_description']} ${styles['form_item']}`}>
                <label htmlFor="description" className={styles['form_label']}>Description :</label>
                <Field 
                  as="textarea" 
                  name="description" 
                  className={styles['form_field']}    
                />
              </div>

              <span className={styles['info']}>Les champs avec * sont obligatoires.</span>

            </div>

            <Button 
              id={styles['cancel_button']} 
              type='button'
              color='#eee' 
              children='Annuler' 
              onClick={closeModal}
            />
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

    </div>
  );
};

AddPlace.propTypes = {
  scenarioId: PropTypes.number,  
  newPlace: PropTypes.func,
  closeModal: PropTypes.func,
  getCategories: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.object,),
};

export default AddPlace;