import React, { Component } from 'react';

import PersonForm from '../../components/PersonForm/PersonForm';
import LoginForm from '../../components/LoginForm/LoginForm';

class ReportForm extends Component {

  state = {
    status: 'notLoggedIn',
    firstName: '',
    lastName: '',
    motherLastName: '',
    rfc: ''
  }

  handleValue = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render(props) {
    let bottomForm;

    switch (this.state.status) {
      default:
        bottomForm = <LoginForm />;
    }

    return (
      <form>
        <PersonForm
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          motherLastName={this.state.motherLastName}
          rfc={this.state.rfc}
          valueHandler={this.handleValue}
        />
        {bottomForm}
      </form>
    );
  }
}

export default ReportForm;