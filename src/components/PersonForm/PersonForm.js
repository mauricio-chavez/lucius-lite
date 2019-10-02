import React from 'react';

import FormInput from '../FormInput/FormInput';

const PersonForm = props => (
  <>
    <p className="text-muted">Informacion de persona física o moral a investigar</p>
    <FormInput
      valueKey="firstName" placeholder="Nombre *" type="text" required={true}
      autoFocus={true} valueHandler={props.valueHandler} value={props.firstName}
    />
    <FormInput
      valueKey="lastName" placeholder="Apellido Paterno *" type="text"
      required={true} valueHandler={props.valueHandler} value={props.lastName}
    />
    <FormInput
      valueKey="motherLastName" placeholder="Apellido Materno" type="text"
      valueHandler={props.valueHandler} value={props.motherLastName}
    />
    <FormInput
      valueKey="rfc" placeholder="RFC (con o sin homoclave)" type="text"
      valueHandler={props.valueHandler} value={props.rfc}
    />
  </>
);

export default PersonForm;