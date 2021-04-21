import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Button from '../Button';

import PropTypes from 'prop-types';

import styles from './changePassword.module.css';

const ChangePassword = ({ cancelAction, changePassword }) => {

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    changePassword(JSON.stringify(values, null, 2));
    cancelAction();
  };

  return (
    <>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.currentPassword) {
            errors.currentPassword = 'Veuillez remplir ce champ !';
          }
          if (!values.newPassword) {
            errors.newPassword = 'Veuillez remplir ce champ !';
          } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.newPassword)) {
            errors.newPassword = 'Ce champ doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial';
          }
          if (!values.confirmNewPassword) {
            errors.confirmNewPassword = 'Veuillez remplir ce champ !';
          } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.confirmNewPassword)) {
            errors.confirmNewPassword = 'Ce champ doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial';
          }

          return errors;
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className={styles['form']}>
          <label htmlFor="currentPassword" className={styles['form_label']}>Mot de passe actuel :</label>
          <Field 
            className={styles['form_field']}
            id="currentPassword" 
            name="currentPassword" 
            type="password"
            placeholder="Veuillez saisir votre mot de passe" 
          />
          <ErrorMessage name='currentPassword' component='div' className={styles['error_message']}/>

          <label htmlFor="newPassword" className={styles['form_label']}>Nouveau mot de passe :</label>
          <Field 
            className={styles['form_field']}
            id="newPassword" 
            name="newPassword" 
            type="password"
            placeholder="Veuillez saisir un mot de passe" 
          />
          <ErrorMessage name='newPassword' component='div' className={styles['error_message']}/>

          <label htmlFor="confirmNewPassword" className={styles['form_label']}>Confirmation mot de passe :</label>
          <Field
            className={styles['form_field']}
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            placeholder="Veuillez confirmer le mot de passe"
          />
          <ErrorMessage name='confirmNewPassword' component='div' className={styles['error_message']}/>

          <Button id={styles['submit_button']} type="submit" color='#eee' children='Valider'/>
        </Form>
      </Formik>
      <Button id={styles['close_button']} color='#eee' children='Annuler' onClick={cancelAction}/>
    </>
  );
};

ChangePassword.propTypes = {
  id: PropTypes.number,
  cancelAction: PropTypes.func,
  changePassword: PropTypes.func,
};

export default ChangePassword;