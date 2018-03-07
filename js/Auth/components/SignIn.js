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
  signInUser: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  componentWillMount() {
    this.props.clearState();
  }

  handleFormSubmit(props) {
    const { email, password } = props;

    this.props.signInUser({ email, password });
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
              <Button block primary onPress={handleSubmit(this.handleFormSubmit)}>
                <Text>Login</Text>
              </Button>}

          <TouchableOpacity onPress={() => Actions.signup()}>
            <Text>
              Need an account? Click here to sign up
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['email', 'password'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });
  return errors;
};

SignIn.propTypes = propTypes;

export default reduxForm({
  form: 'signin',
  validate,
})(SignIn);
