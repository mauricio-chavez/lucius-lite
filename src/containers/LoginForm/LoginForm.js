import React, { useState } from 'react';

import './LoginForm.css';
import googleLoginButton from '../../assets/btn_google_signin_dark_normal_web@2x.png';
import googleLoginButtonPressed from '../../assets/btn_google_signin_dark_pressed_web@2x.png';
import facebookLogo from '../../assets/facebook.png';
import whiteFacebookLogo from '../../assets/facebook-white.png';

const LoginForm = props => {
  const [facebookHover, setFacebookHover] = useState(facebookLogo);
  const [googleHover, setGoogleHover] = useState(googleLoginButton);
  return (
    <>
      <p className="text-muted">¿Con qué plataforma quieres ingresar?</p>
      <div className="container d-flex justify-content-center">

        <div role="button" className="LoginButton SocialButton"
          onClick={event => { props.authenticator(event, 'google') }}
          onMouseOver={() => { setGoogleHover(googleLoginButtonPressed) }}
          onMouseLeave={() => { setGoogleHover(googleLoginButton) }}
        >
          <img src={googleHover} alt="Google Login" className="GoogleButton" />
        </div>

        <button type="button" className="LoginButton btn btn-outline-primary Facebook SocialButton"
          onClick={event => { props.authenticator(event, 'facebook') }}
          onMouseOver={() => { setFacebookHover(whiteFacebookLogo) }}
          onMouseLeave={() => { setFacebookHover(facebookLogo) }}
        >
          <img
            className="facebookLogo" src={facebookHover}
            alt="Facebook Logo" height="20px"
          />
        </button>

      </div>
      <div className="container d-flex justify-content-center">
        <button type="button" className="LoginButton btn btn-outline-dark"
          onClick={event => { props.authenticator(event, 'lucius') }}
        >
          Lucius
      </button>
        <button type="button" className="LoginButton btn btn-outline-dark"
          onClick={event => { props.authenticator(event, 'guest') }}
        >
          Invitado
      </button>
      </div>
    </>
  );
};

export default LoginForm;