import React from 'react';

import payPalLogo from '../../assets/paypal-logo.png';
import mercadoPago from '../../assets/mercadopago.png';
import creditDebitLogo from '../../assets/credit-debit.png';
import './PaymentButtons.css'

const PaymentButtons = props => (
  <>
    <p className='text-muted'>Información de Pago</p>
    <div className='container d-flex justify-content-center'>
      <button
        type='button'
        className='PaymentButton btn btn-outline-dark'
        onClick={event => { props.paymentHandler(event, 'paypal') }}
      >
        <img src={payPalLogo} alt='PayPal Logo' width='75' />
      </button>
      <button
        type='button'
        className='PaymentButton btn btn-outline-dark'
        onClick={event => { props.paymentHandler(event, 'mercadopago') }}
      >
        <img src={mercadoPago} alt='PayPal Logo' width='85' />
      </button>
    </div>
    <div className='container d-flex justify-content-center'>
      <button
        type='button'
        className='PaymentButton btn btn-outline-dark'
        onClick={event => { props.paymentHandler(event, 'creditCard') }}
      >
        <span className='CardSpan'>Tarjeta</span>
        <img src={creditDebitLogo} alt='Debit or Credit Logo' width='75' />
      </button>
      <button
        type='button'
        className='PaymentButton btn btn-outline-dark'
        onClick={event => { props.paymentHandler(event, 'coupon') }}
      >
        Cupón
        </button>
    </div>
  </>
);

export default PaymentButtons;