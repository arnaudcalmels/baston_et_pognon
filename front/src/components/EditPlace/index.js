import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FileBase64 from 'react-file-base64';

import Button from '../Button';
import Modal from '../../components/Modal';
import AddMonster from '../../containers/components/AddMonster';

import PropTypes from 'prop-types';

import styles from './editPlace.module.scss';

const EditPlace = ({ scenarioId, closeModal, getCategories, categories, placeId, place, editPlace }) => {
  
  useEffect(() => {
    getCategories();
  },
  // eslint-disable-next-line
  []);

  let [newPicture, setNewPicture] = useState();
  const [openAddMonsterModal, setOpenAddMonsterModal] = useState(false);

  const getFile = (props, file) => {
    props.setFieldValue("picture", file);
    setNewPicture(file);
  };

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    editPlace(placeId, JSON.stringify(values, null, 2), closeModal);
    
  };

  return (
    <div>
      <Formik
        initialValues={{
          scenarioId,
          placeId,
          name: place.name,
          categoryId: place.category?.id,
          description: place.description,
          hiddenBoosterCount: place.hiddenBoosterCount,
          picture: place.picture
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
                <FileBase64
                  multiple={false}
                  onDone={getFile.bind(this, props)}
                />
              </div>

              {
                newPicture ?
                  <img id={styles['new_image_preview']} src={newPicture.base64} alt={newPicture.name}/>
                  : 
                  // eslint-disable-next-line
                  <img id={styles['image_preview']} src={place.picture?.base64} alt={place.picture?.name}/>
              }

              <div className={`${styles['newPlace_description']} ${styles['form_item']}`}>
                <label htmlFor="description" className={styles['form_label']}>Description :</label>
                <Field 
                  as="textarea" 
                  name="description" 
                  className={styles['form_field']}    
                />
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
      onClick={() => setOpenAddMonsterModal(true)}
    />

    <Modal 
      isOpen={openAddMonsterModal}
      closeModal={() => {
        setOpenAddMonsterModal(false)
      }}
      title='Ajouter un monstre'
      children={
        <AddMonster 
          scenarioId={null}
          placeId={place.id}
          wanderGroupId={null}
          slug="place"
          closeModal={() => {
            setOpenAddMonsterModal(false)
          }}
          context={'currentMonsterInPlace'}
        />}
    />


    </div>
  );
};

EditPlace.propTypes = {
  scenarioId: PropTypes.number,  
  closeModal: PropTypes.func,
  getCategories: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.object,),
  placeId: PropTypes.number,
  place: PropTypes.object,
  editPlace: PropTypes.func,
};

export default EditPlace;