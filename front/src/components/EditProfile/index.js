import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FileBase64 from 'react-file-base64';

import Button from '../Button';

import PropTypes from 'prop-types';

import styles from './editProfile.module.scss';

const EditProfile = ({ pseudo, email, id, avatar, cancelAction, editProfile }) => {
  let [newPicture, setNewPicture] = useState();

  const getFile = (props, file) => {
    props.setFieldValue("avatar", file);
    setNewPicture(file);
  };

  const handleSubmit = (values) => {
    editProfile(id, JSON.stringify(values, null, 2), cancelAction);
  };

  return (
    <>
      <Formik
        initialValues={{
          pseudo,
          avatar,
          email,
        }}
        validate={values => {
          const errors = {};
          if (values.mail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Adresse mail invalide';
          }

          return errors;
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
      {
        (props) => (
          <Form className={styles['form']}>
            <div className={`${styles['profile_picture']} ${styles['form_item']}`}>
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
                <img id={styles['image_preview']} src={avatar.base64} alt='photo_avatar'/>
            }

            <label htmlFor="pseudo" className={styles['form_label']}>Pseudo :</label>
            <Field 
              className={styles['form_field']}
              id="pseudo" 
              name="pseudo" 
              type="text" 
            />
            <ErrorMessage name='pseudo' component='div' className={styles['error_message']}/>

            <label htmlFor="email" className={styles['form_label']}>Adresse mail :</label>
            <Field 
              className={styles['form_field']}
              id="email" 
              name="email" 
              type="email" 
            />
            <ErrorMessage name='email' component='div' className={styles['error_message']}/>

            <Button id={styles['submit_button']} type="submit" color='#eee' children='Valider'/>
          </Form>
        )
      }
      </Formik>
      <Button id={styles['close_button']} color='#eee' children='Annuler' onClick={cancelAction}/>
    </>
  );
};

EditProfile.propTypes = {
  pseudo: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.number,
  avatar: PropTypes.string,
  cancelAction: PropTypes.func,
  editProfile: PropTypes.func,
};

export default EditProfile;