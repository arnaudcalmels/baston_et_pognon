import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';

import styles from './legals.module.scss';

const Legals = () => {
  return (
    <div className={styles['main']}>
      <div className={styles['infos']}>
        <h4 className={styles['title']}>Technologies utilisées pour développer ce site</h4>
        <h5>Front : </h5>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>React-router</li>
          <li>Axios</li>
          <li>Formik</li>
          <li>Sass</li>
          <li>Apache</li>
        </ul>
        <h5>Back : </h5>
        <ul>
          <li>Symfony</li>
          <li>Nelmio Cors</li>
          <li>Lexik JWT</li>
          <li>PostgreSQL</li>
          <li>Heroku</li>
        </ul>
      </div>
      
      <div className={styles['legals']}>
        <h4 className={styles['title']}>Propriétaires et hébergeurs du site</h4>
        <div className={styles['mail']}>
          <FontAwesomeIcon
            className={styles['icon']}
            icon={faHome}
            size="1x"
          />
          <span>Arnaud et Stéphanie CALMELS <br/>
          1 bis route de Nemours <br/>
          77890 BEAUMONT DU GATINAIS <br/>
          </span>
        </div>

        <div className={styles['phone']}>
          <FontAwesomeIcon
            className={styles['icon']}
            icon={faPhone}
            size="1x"
          />
          <span>01 <span>64 <span>29 </span>42 </span>68 </span>
        </div>

        <div className={styles['mail']}>
          <FontAwesomeIcon
            className={styles['icon']}
            icon={faEnvelope}
            size="1x"
          />
          <a href="mailto:baston.pognon@gmail.com">baston.pognon@gmail.com</a>
        </div>


        <h4 className={styles['title']}>Utilisation des données personnelles</h4>
        <p>Ce site est uniquement destiné à la démonstration. La fonctionnalité de validation de l’adresse email étant désactivée, une adresse email fictive peut donc être utilisée. <br/> 
        Les comptes créés par les utilisateurs sont régulièrement effacés, aucune donnée s’y rattachant n’est conservée. </p>
        <p>Pour tout renseignement, merci de nous contacter aux coordonnées ci-dessous.</p>
      </div>

      <div className={styles['contact']}>
        <h5 className={styles['title']}>Contacter Arnaud</h5>
        <div className={styles['details']}>
          <div className={styles['phone']}>
            <FontAwesomeIcon
              className={styles['icon']}
              icon={faPhone}
              size="1x"
            />
          <span>06 <span>88 <span>01 </span>10 </span>60 </span>
          </div>
        </div>
        
        <h5 className={styles['title']}>Contacter Stéphanie</h5>
        <div className={styles['details']}>
          <div className={styles['phone']}>
            <FontAwesomeIcon
              className={styles['icon']}
              icon={faPhone}
              size="1x"
            />
          <span>06 <span>60 <span>90 </span>04 </span>82 </span>
          </div>
        </div>

      </div>

    </div>
  )
};

export default Legals;
