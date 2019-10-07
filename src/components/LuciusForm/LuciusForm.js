import React from 'react';

import TextInput from '../TextInput/TextInput';

const LuciusForm = props => (
  <>
    <p className="text-muted">
      Ingresa la información de tu cuenta <strong>Lucius</strong>
    </p>
    <TextInput
      valueKey="email" placeholder="Correo electrónico * (para recibir el reporte)"
      type="email" required={true} valueHandler={props.valueHandler}
      value={props.email}
    />
    <TextInput
      valueKey="password" placeholder="Contraseña *" type="password"
      valueHandler={props.valueHandler} value={props.password}
    />
    <div className="text-center">
      <button className="btn btn-danger" onClick={props.authenticator}>
        Iniciar sesión
    </button>
    </div>
  </>
);

export default LuciusForm;