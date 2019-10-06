import React, { Component } from 'react';

import PersonForm from '../../components/PersonForm/PersonForm';
import LoginForm from '../LoginForm/LoginForm';
import PaymentForm from '../../components/PaymentForm/PaymentForm';

class ReportBuilder extends Component {

  state = {
    authenticated: false,
    authenticationMethod: null,
    firstName: '',
    lastName: '',
    motherLastName: '',
    rfc: '',
    guest: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    displayName: '',
    email: '',
    phoneNumber: '',
  }

  handleValue = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleGuestFormValue = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState(prevState => {
      const guestInfo = prevState.guest;
      guestInfo[name] = value;
      return { guest: guestInfo }
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
        });
      } else if (authenticationMethod === 'facebook') {
        const { displayName, email, phoneNumber } = await this.props.firebase.signInWithFacebook();
        this.setState({
          authenticated: true,
          authenticationMethod,
          displayName,
          email,
          phoneNumber,
        });
      } else if (authenticationMethod === 'guest') {
        this.setState({
          authenticated: true,
          authenticationMethod,
        });
      }
    } catch (e) {
      alert(e);
    }
  };

  render = () => {
    let bottomForm;
    if (this.state.authenticated) {
      bottomForm = (
        <PaymentForm
          authenticationMethod={this.state.authenticationMethod}
          guestData={this.state.guest}
          valueHandler={this.handleGuestFormValue}
          displayName={this.state.displayName}
        />
      );
    } else {
      bottomForm = <LoginForm authenticator={this.authenticate} />;
    }

    return (
      <form>
        <PersonForm
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          motherLastName={this.state.motherLastName}
          rfc={this.state.rfc}
          valueHandler={this.handleValue}
          authenticator={this.authenticate}
        />
        {bottomForm}
      </form>
    );
  }
}

export default ReportBuilder;