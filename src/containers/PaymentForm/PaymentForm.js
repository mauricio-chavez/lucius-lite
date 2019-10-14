import React, { useState } from 'react';

import CreditCardInput from 'react-credit-card-input';
import ReactLoading from "react-loading";
import { PayPalButton } from 'react-paypal-button-v2';

import PaymentButtons from '../../components/PaymentButtons/PaymentButtons';
import cardLabels from './cardLabels.json';
import './PaymentForm.css';

const PaymentForm = props => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  const handlePayment = (event, method) => {
    props.paymentMethodHandler(event, method);
    setPaymentMethod(method);
    props.valuesHandler({successAlert: null});
  }

  const handleCardValue = (event, key) => {
    props.valuesHandler({
      [key]: event.target.value
    });
  }

  if (props.isPaid) {
    return (
      <div className="text-center">
        <button
          type="button"
          className="btn btn-danger btn-lg"
          onClick={props.reportCreator}
        >
          Crear reporte
          </button>
      </div>
    );
  } else if (paymentMethod === 'paypal') {
    return (
      <div className="PayPalContainer">
        {showLoading ? <ReactLoading type='balls' color="#c81e32" /> : null}
        <PayPalButton
          amount='1'
          currency='MXN'
          onButtonReady={() => setShowLoading(false)}
          onSuccess={(details, data) => {
            props.valuesHandler({
              isPaid: true,
              orderID: data.orderID,
              payerName: details.payer.name.given_name,
            });
          }}
        />
      </div>
    )
  } else if (paymentMethod === 'mercadopago') {
    return <p>Mercado Pago</p>
  } else if (paymentMethod === 'creditCard') {
    return (
      <div className="text-center">
        <CreditCardInput
          className='CreditCardInput'
          cardNumberInputProps={{
            value: props.cardValues.cardNumber,
            onChange: event => { handleCardValue(event, 'cardNumber') }
          }}
          cardExpiryInputProps={{
            value: props.cardValues.cardExpiry,
            onChange: event => { handleCardValue(event, 'cardExpiry') }
          }}
          cardCVCInputProps={{
            value: props.cardValues.cardCVC,
            onChange: event => { handleCardValue(event, 'cardCVC') }
          }}
          customTextLabels={cardLabels}
        />
      </div>
    )
  } else if (paymentMethod === 'coupon') {
    return <p>Cupón</p>
  } else {
    return <PaymentButtons paymentHandler={handlePayment} />
  }
};

export default PaymentForm;