import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import { SignInContainer, SignUpContainer } from './Auth';
import { IdeaListContainer, IdeaCreateContainer, IdeaEditContainer } from './Ideas';
import requireAuth from './Auth/containers/requireAuth';
import requireNotAuth from './Auth/containers/requireNotAuth';

const RouterComponent = () => (
  <Router>
    <Scene hideNavBar>

      <Scene key="auth" hideNavBar>
        <Scene key="signin" component={requireNotAuth(SignInContainer)} />
        <Scene key="signup" component={requireNotAuth(SignUpContainer)} />
      </Scene>

      <Scene key="idea" hideNavBar>
        <Scene key="ideaList" component={requireAuth(IdeaListContainer)} />
        <Scene key="ideaCreate" component={requireAuth(IdeaCreateContainer)} />
        <Scene key="ideaEdit" component={requireAuth(IdeaEditContainer)} />
      </Scene>

    </Scene>
  </Router>
);

export default RouterComponent;
