import React, { Component } from 'react';

import GuestForm from '../../components/GuestForm/GuestForm';
import LoginForm from '../LoginForm/LoginForm';
import { signInWithLucius } from '../../components/LuciusAuth/LuciusAuth';
import LuciusForm from '../../components/LuciusForm/LuciusForm';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import PersonForm from '../../components/PersonForm/PersonForm';

class ReportBuilder extends Component {

  state = {
    alert: null,
    accessToken: '',
    authenticated: false,
    authenticationMethod: null,
    displayName: '',
    email: '',
    firstName: '',
    guest: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
    lastName: '',
    motherLastName: '',
    password: '',
    phoneNumber: '',
    refreshToken: '',
    rfc: '',
    successAlert: null,
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

  handleAuthenticationMethod = (event, authenticationMethod) => {
    event.preventDefault();
    this.setState({ authenticationMethod });
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
          accessToken, refreshToken, displayName, email, phoneNumber
        } = await signInWithLucius(this.state.email, this.state.password);
        this.setState({
          accessToken,
          authenticated: true,
          authenticationMethod,
          displayName,
          email,
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

  render = () => {
    let middleComponent;
    let bottomComponent;
    if (this.state.authenticationMethod) {
      bottomComponent = (
        <PaymentForm
          authenticationMethod={this.state.authenticationMethod}
          guestData={this.state.guest}
          valueHandler={this.handleGuestFormValue}
          displayName={this.state.displayName}
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
      middleComponent = <p className="text-danger">Bienvenido, {this.state.displayName}</p>;
    }

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
  }
}

export default ReportBuilder;