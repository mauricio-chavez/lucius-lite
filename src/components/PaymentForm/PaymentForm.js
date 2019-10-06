import React from 'react';

import GuestForm from '../GuestForm/GuestForm';
import './PaymentMethod.css';

const PaymentForm = props => {
  const middleComponent = (props.authenticationMethod === 'guest') ? (
    <GuestForm
      guestData={props.guestData}
      valueHandler={props.valueHandler}
    />
  ) : <p className="text-danger">Bienvenido, {props.displayName}</p>;
  return (
    <>
      {middleComponent}
      <p className="text-muted">Información de Pago</p>
      <div className="container d-flex justify-content-center">
        <div className="form-check payment">
          <input className="form-check-input" type="radio" id="paypal" value="paypal" />
          <label className="form-check-label" htmlFor="paypal">
            PayPal
            </label>
        </div>
        <div className="form-check payment">
          <input className="form-check-input" type="radio" id="mercadopago" value="mercadopago" />
          <label className="form-check-label" htmlFor="mercadopago">
            MercadoPago
            </label>
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="form-check payment">
          <input className="form-check-input" type="radio" id="creditCard" value="creditCard" />
          <label className="form-check-label" htmlFor="creditCard">
            Tarjeta de Crédito
            </label>
        </div>
        <div className="form-check payment">
          <input className="form-check-input" type="radio" id="coupon" value="coupon" />
          <label className="form-check-label" htmlFor="coupon">
            Cupón
            </label>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;