import React from 'react';

import './LoginForm.css';

const LoginForm = props => (
  <>
    <p className="text-muted">¿Con qué plataforma quieres ingresar?</p>
    <div className="container d-flex justify-content-center">
      <button type="button" class="LoginButton btn btn-outline-danger">
        Google
      </button>
      <button type="button" class="LoginButton btn btn-outline-primary facebook">
        Facebook
      </button>
    </div>
    <div className="container d-flex justify-content-center">
      <button type="button" class="LoginButton btn btn-outline-dark">
        Lucius
      </button>
      <button type="button" class="LoginButton btn btn-outline-dark">
        Invitado
      </button>
    </div>
  </>
);

export default LoginForm;