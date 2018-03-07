/* eslint class-methods-use-this: ["error", { "exceptMethods": ["renderInput"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Body, Left, Right, Title, Content, Icon, Item, Input, Label, Text, View, Button } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  ideaError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  createIdea: PropTypes.func.isRequired,
};

class IdeaCreate extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  handleFormSubmit(props) {
    const { type, summary } = props;

    this.props.createIdea({ type, summary });
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
          <Left>
            <Button
              transparent
              onPress={() => Actions.ideaList()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Add New Idea</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Field
            name="type"
            component={this.renderInput}
            label="Type"
          />
          <Field
            name="summary"
            component={this.renderInput}
            label="Idea"
            multiline
          />

          {this.props.ideaError
            ?
              <Text>
                {this.props.ideaError}
              </Text>
            :
              <View />}

          {this.props.loading
            ?
              <Spinner />
            :
              <Button block onPress={handleSubmit(this.handleFormSubmit)}>
                <Text>Create</Text>
              </Button>}

        </Content>
      </Container>
    );
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['type', 'summary'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if (props.type && props.type.length < 4) {
    errors.type = 'Minimum of 4 characters';
  } else if (props.type && props.type.length > 20) {
    errors.type = 'Maximum of 20 characters';
  }

  if (props.summary && props.summary.length < 12) {
    errors.summary = 'Minimum of 12 characters';
  } else if (props.summary && props.summary.length > 100) {
    errors.summary = 'Maximum of 100 characters';
  }

  return errors;
};

IdeaCreate.propTypes = propTypes;

export default reduxForm({
  form: 'ideacreate',
  validate,
})(IdeaCreate);
