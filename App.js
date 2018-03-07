/* eslint no-undef: "off" */
/* eslint global-require: "off" */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from '@firebase/app';
import '@firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { Root } from 'native-base';

import Router from './js/Router';
import Store from './js/configureStore';
import { SIGN_IN_SUCCESS } from './js/Auth/AuthActions';
import firebaseConfig from './js/firebase.json';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loaded: false };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });

    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loaded: true });

      if (user) {
        Store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
      }
    });
  }

  render() {
    return (
      <Provider store={Store}>
        <Root>
          {this.state.loaded ? <Router /> : <Spinner />}
        </Root>
      </Provider>
    );
  }
}
