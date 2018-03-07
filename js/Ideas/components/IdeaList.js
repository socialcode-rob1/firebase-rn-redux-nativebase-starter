/* eslint class-methods-use-this: ["error", { "exceptMethods": ["renderItem"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title, Text, ListItem, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

const propTypes = {
  getIdeaList: PropTypes.func.isRequired,
};

class IdeaList extends Component {
  componentDidMount() {
    this.props.getIdeaList();
  }

  renderItem({ item }) {
    return (
      <TouchableWithoutFeedback onPress={() => Actions.ideaEdit({ item })}>
        <ListItem id={item.id}>
          <Body>
            <Text>{item.summary}</Text>
          </Body>
          <Right>
            <Text>{item.type}</Text>
          </Right>
        </ListItem>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { list } = this.props;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Ideas</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => Actions.ideaCreate()}
            >
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <Content>
          <FlatList
            data={list}
            renderItem={this.renderItem}
            keyExtractor={idea => idea.id}
          />
        </Content>
      </Container>
    );
  }
}

IdeaList.propTypes = propTypes;

export default IdeaList;
