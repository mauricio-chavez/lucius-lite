import React, { Component } from 'react';

import FinalScreen from '../../components/FinalScreen/FinalScreen';
import GuestForm from '../../components/GuestForm/GuestForm';
import LoginForm from '../LoginForm/LoginForm';
import LuciusForm from '../../components/LuciusForm/LuciusForm';
import PaymentForm from '../PaymentForm/PaymentForm';
import PersonForm from '../../components/PersonForm/PersonForm';
import { createReport, signInWithLucius } from '../../components/Lucius/functions';

class ReportBuilder extends Component {

  state = {
    alert: null,
    accessToken: '',
    authenticated: false,
    authenticationMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    displayName: '',
    email: '',
    finished: false,
    firstName: '',
    guest: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
    isPaid: false,
    lastName: '',
    motherLastName: '',
    orderID: '',
    password: '',
    payerName: '',
    paymentMethod: null,
    phoneNumber: '',
    refreshToken: '',
    rfc: '',
    successAlert: null,
  }

  handleAuthenticationMethod = (event, authenticationMethod) => {
    event.preventDefault();
    this.setState({ authenticationMethod });
  }

  handleValues = (newState) => {
    this.setState(newState)
  }

  handleGuestFormValue = event => {
    if (this.state.successAlert) {
      this.setState({ successAlert: null });
    }
    if (this.state.alert) {
      this.setState({ alert: null });
    }
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState(prevState => {
      const guestInfo = prevState.guest;
      guestInfo[name] = value;
      return { guest: guestInfo }
    });
  }

  handlePaymentMethod = (event, paymentMethod) => {
    event.preventDefault();
    this.setState({ paymentMethod });
  }

  handleValue = event => {
    if (this.state.successAlert) {
      this.setState({ successAlert: null });
    }
    if (this.state.alert) {
      this.setState({ alert: null });
    }
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  authenticate = async (event, authenticationMethod) => {
    event.preventDefault();
    try {
      if (authenticationMethod === 'google') {
        const { displayName, email, phoneNumber } = await this.props.firebase.signInWithGoogle();
        this.setState({
          authenticated: true,
          authenticationMethod,
          displayName,
          email,
          phoneNumber,
          successAlert: 'Se ha iniciado sesión correctamente',
        });
      } else if (authenticationMethod === 'facebook') {
        const { displayName, email, phoneNumber } = await this.props.firebase.signInWithFacebook();
        this.setState({
          authenticated: true,
          authenticationMethod,
          displayName,
          email,
          phoneNumber,
          successAlert: 'Se ha iniciado sesión correctamente',
        });
      } else if (authenticationMethod === 'lucius') {
        const {
          accessToken, refreshToken, displayName, email, phoneNumber, isAdmin
        } = await signInWithLucius(this.state.email, this.state.password);
        let isPaid = false;
        if (isAdmin) {
          isPaid = true;
        }

        this.setState({
          accessToken,
          authenticated: true,
          authenticationMethod,
          displayName,
          email,
          isPaid,
          phoneNumber,
          refreshToken,
          successAlert: 'Se ha iniciado sesión correctamente',
        });
      }
    } catch (e) {
      this.setState({
        alert: e
      });
    }
  };

  createLuciusLite = async () => {
    try {
      const successful = await createReport();
      if (successful) {
        this.setState({ finished: true });
      }
    } catch (e) {
      this.setState({
        alert: e
      });
    }
  }

  render = () => {
    let middleComponent;
    let bottomComponent;
    if (this.state.authenticationMethod) {
      bottomComponent = (
        <PaymentForm
          authenticationMethod={this.state.authenticationMethod}
          guestData={this.state.guest}
          paymentMethodHandler={this.handlePaymentMethod}
          reportCreator={this.createLuciusLite}
          displayName={this.state.displayName}
          valuesHandler={this.handleValues}
          cardValues={{
            cardNumber: this.state.cardNumber,
            cardExpiry: this.state.cardExpiry,
            cardCVC: this.state.cardCVC,
          }}
          isPaid={this.state.isPaid}
        />
      );
    } else {
      bottomComponent = (
        <LoginForm
          authenticator={this.authenticate}
          authMethodHandler={this.handleAuthenticationMethod}
        />
      );
    }

    if (!this.state.authenticationMethod) {
      middleComponent = null;
    } else if (this.state.authenticationMethod === 'lucius' && !this.state.authenticated) {
      middleComponent = (
        <LuciusForm
          email={this.state.email}
          password={this.state.password}
          valueHandler={this.handleValue}
          authenticator={(event) => { this.authenticate(event, 'lucius') }}
        />
      );
    } else if (this.state.authenticationMethod === 'guest') {
      middleComponent = (
        <GuestForm
          guestData={this.state.guest}
          valueHandler={this.handleGuestFormValue}
        />
      );
    } else {
      middleComponent = !this.state.paymentMethod ? (
        <p className="text-danger">Bienvenido, {this.state.displayName}</p>
      ) : null;
    }

    if (!this.state.finished) {
      return (
        <form>
          {(this.state.successAlert) ? (
            <div className="alert alert-success" role="alert">
              {this.state.successAlert}
            </div>
          ) : null}
          {(this.state.alert) ? (
            <div className="alert alert-danger" role="alert">
              {this.state.alert}
            </div>
          ) : null}
          <PersonForm
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            motherLastName={this.state.motherLastName}
            rfc={this.state.rfc}
            valueHandler={this.handleValue}
            authenticator={this.authenticate}
          />
          {middleComponent}
          {bottomComponent}
        </form>
      );
    } else {
      return <FinalScreen />
    }
  }
}

export default ReportBuilder;