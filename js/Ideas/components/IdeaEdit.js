/* eslint class-methods-use-this: ["error", { "exceptMethods": ["renderInput"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Body, Left, Right, Title, Content, Item, Input, Label, Text, Icon, View, Button, ActionSheet } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  ideaError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  updateIdea: PropTypes.func.isRequired,
  deleteIdea: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

class IdeaEdit extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onAccept = this.onAccept.bind(this);
  }

  onAccept() {
    this.props.deleteIdea({ id: this.props.item.id });
  }

  handleFormSubmit(props) {
    const { type, summary, id } = props;

    this.props.updateIdea({ type, summary, id });
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
                <Text>Update</Text>
              </Button>}

          <Button
            block
            danger
            onPress={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'Cancel'],
                  cancelButtonIndex: 1,
                  destructiveButtonIndex: 0,
                  title: 'Are you sure you want to delete this?',
                },
                (buttonIndex) => {
                  if (buttonIndex === 0) {
                    this.onAccept();
                  }
                },
              )}
          >
            <Text>Delete</Text>
          </Button>
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

IdeaEdit.propTypes = propTypes;

export default reduxForm({
  form: 'ideaedit',
  validate,
})(IdeaEdit);
