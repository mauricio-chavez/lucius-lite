import React from 'react';

import ReactLoading from "react-loading";

import luciusLogo from '../../assets/lucius-logo.png';
import './FinalScreen.css';

const FinalScreen = () => (
  <div className="text-center d-flex flex-column justify-content-center align-items-center">
    <ReactLoading className="FinalLoading" type='spin' color="#c81e32" height="104px" width="104px" />
    <div className="FinalScreenInfo">
      <strong>¡LISTO!</strong>
      <p>Nuestros algoritmos se encuentran trabajando en su reporte</p>
      <h2>LUCIUS LITE</h2>
      <p>Llegará a tu correo en cuanto esté listo</p>
    </div>

    <figure className="FinalLuciusLogo">
      <img src={luciusLogo} alt="Lucius Logo" width="200" />
    </figure>


    <small>
      Si necesitas ayuda o tienes alguna pregunta, no dudes en  contactarnos
    </small>

  </div>
);

export default FinalScreen;