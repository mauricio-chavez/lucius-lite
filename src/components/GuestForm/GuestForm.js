import React from 'react';

import TextInput from '../TextInput/TextInput';

const GuestForm = props => (
  <>
    <p className="text-muted">
      Información personal <small>(No guardaremos tu información)</small>
    </p>
    <TextInput
      valueKey="firstName" placeholder="Nombre *" type="text" required={true}
      autoFocus={true} valueHandler={props.valueHandler}
      value={props.guestData.firstName}
    />
    <TextInput
      valueKey="lastName" placeholder="Apellido(s) *" type="text" required={true}
      valueHandler={props.valueHandler} value={props.guestData.lastName}
    />
    <TextInput
      valueKey="email" placeholder="Correo electrónico * (para recibir el reporte)"
      type="email" required={true} valueHandler={props.valueHandler}
      value={props.guestData.email}
    />
    <TextInput
      valueKey="phone" placeholder="Teléfono" type="tel"
      valueHandler={props.valueHandler} value={props.guestData.phone}
    />
  </>
);

export default GuestForm;