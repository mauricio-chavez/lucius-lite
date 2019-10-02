import React from 'react';

import TextInput from '../TextInput/TextInput';

const PersonForm = props => (
  <>
    <p className="text-muted">Informacion de persona física o moral a investigar</p>
    <TextInput
      valueKey="firstName" placeholder="Nombre *" type="text" required={true}
      autoFocus={true} valueHandler={props.valueHandler} value={props.firstName}
    />
    <TextInput
      valueKey="lastName" placeholder="Apellido Paterno *" type="text"
      required={true} valueHandler={props.valueHandler} value={props.lastName}
    />
    <TextInput
      valueKey="motherLastName" placeholder="Apellido Materno" type="text"
      valueHandler={props.valueHandler} value={props.motherLastName}
    />
    <TextInput
      valueKey="rfc" placeholder="RFC (con o sin homoclave)" type="text"
      valueHandler={props.valueHandler} value={props.rfc}
    />
  </>
);

export default PersonForm;