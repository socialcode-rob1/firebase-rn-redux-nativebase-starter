/* eslint class-methods-use-this: ["error", { "exceptMethods": ["renderInput"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Body, Title, Content, Item, Input, Label, Button, Text, View } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import Spinner from 'react-native-loading-spinner-overlay';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  componentWillMount() {
    this.props.clearState();
  }

  handleFormSubmit(props) {
    const {
      email, password, firstname, lastname,
    } = props;

    this.props.signUpUser({
      email, password, firstname, lastname,
    });
  }

  renderInput({ input, label, meta: { error } }) {
    let hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item floatingLabel>
        <Label>{label}</Label>
        <Input {...input} />
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        <Header>
          <Body>
            <Title>Sign Up</Title>
          </Body>
        </Header>
        <Content padder>
          <Field
            name="firstname"
            component={this.renderInput}
            label="First Name"
          />
          <Field
            name="lastname"
            component={this.renderInput}
            label="Last Name"
          />
          <Field
            name="email"
            component={this.renderInput}
            label="Email"
            autoCapitalize="none"
          />
          <Field
            name="password"
            component={this.renderInput}
            label="Password"
            secureTextEntry
          />
          <Field
            name="repassword"
            component={this.renderInput}
            label="Repeat Password"
            secureTextEntry
          />

          {this.props.authError
            ?
              <Text>
                {this.props.authError}
              </Text>
            :
              <View />}

          {this.props.loading
            ?
              <Spinner />
            :
              <Button primary block onPress={handleSubmit(this.handleFormSubmit)}>
                <Text>Submit</Text>
              </Button>}

          <TouchableOpacity onPress={() => Actions.signin()}>
            <Text>
              Already signed up? Click here to sign in
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['firstname', 'lastname', 'email', 'password'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if (props.firstname && props.firstname.length < 3) {
    errors.firstname = 'Minimum of 3 characters';
  } else if (props.firstname && props.firstname.length > 20) {
    errors.firstname = 'Maximum of 20 characters';
  }

  if (props.lastname && props.lastname.length < 3) {
    errors.lastname = 'Minimum of 3 characters';
  } else if (props.lastname && props.lastname.length > 20) {
    errors.lastname = 'Maximum of 20 characters';
  }

  if (props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = 'please provide valid email';
  }

  if (props.password && props.password.length < 6) {
    errors.password = 'minimum 6 characters';
  }

  if (props.password !== props.repassword) {
    errors.repassword = "passwords doesn't match";
  }

  return errors;
};

SignUp.propTypes = propTypes;

export default reduxForm({
  form: 'signup',
  validate,
})(SignUp);
