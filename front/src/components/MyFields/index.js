import React, { useEffect } from 'react';
import { useField, useFormikContext } from 'formik';

// champ de formulaire custom permettant l'affichage des points de vie en fonction de la profession
export const LifePointsField = (props) => {
  const {
    values: {professionId},
    touched,
    setFieldValue
  } = useFormikContext();
  const [field] = useField(props);

  useEffect(() => {
    if (parseInt(professionId, 10) > 0) {
      let profession = props.professions.find(profession => profession.id === parseInt(professionId, 10));
      setFieldValue(props.name, profession.caracteristics.lifePoints);
    } else {
      setFieldValue(props.name, '');
    }
  },   // eslint-disable-next-line
  [professionId, touched.professionId, setFieldValue, props.name]);

  return (
    <input {...props} {...field} disabled={true}/>
  )
}

// champ de formulaire custom permettant l'affichage des points d'armure en fonction de la profession
export const ArmorField = (props) => {
  const {
    values: {professionId},
    touched,
    setFieldValue
  } = useFormikContext();
  const [field] = useField(props);

  useEffect(() => {
    if (parseInt(professionId, 10) > 0) {
      let profession = props.professions.find(profession => profession.id === parseInt(professionId, 10));
      setFieldValue(props.name, profession.caracteristics.lifePoints);
    } else {
      setFieldValue(props.name, '');
    }
  },   // eslint-disable-next-line
  [professionId, touched.professionId, setFieldValue, props.name]);

  return (
    <input {...props} {...field} disabled={true}/>
  )
}
