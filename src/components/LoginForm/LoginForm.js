import React from 'react';

import './LoginForm.css';

const LoginForm = props => (
  <>
    <p className="text-muted">¿Con qué plataforma quieres ingresar?</p>
    <div className="container d-flex justify-content-center">
      <button type="button" className="LoginButton btn btn-outline-danger"
        onClick={event => {props.authenticator(event, 'google')}}
      >
        Google
      </button>
      <button type="button" className="LoginButton btn btn-outline-primary facebook"
        onClick={event => {props.authenticator(event, 'facebook')}}
      >
        Facebook
      </button>
    </div>
    <div className="container d-flex justify-content-center">
      <button type="button" className="LoginButton btn btn-outline-dark"
        onClick={event => {props.authenticator(event, 'lucius')}}
      >
        Lucius
      </button>
      <button type="button" className="LoginButton btn btn-outline-dark"
        onClick={event => {props.authenticator(event, 'guest')}}
      >
        Invitado
      </button>
    </div>
  </>
);

export default LoginForm;