import React from 'react';
import {
  HashRouter,
  withRouter,
  Switch,
  Redirect,
} from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';
import asyncComponent from '../utils/asyncComponent';
import LayoutContainer from '../containers/LayoutContainer';

const Index = asyncComponent(() =>
  System.import('./Index').then(module => module.default),
);

class _AppRouterInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    if (!window.navigator.onLine) {
      // notification.error('未连接网络');
    }
  }

  render() {
    return (
      <div className='route__container'>
        <LayoutContainer>
          <Switch>
            <PrivateRoute component={Index} exac path='/index' />

            <Redirect from='/' to='/index' />
          </Switch>
        </LayoutContainer>
      </div>
    );
  }
}

const AppRouterInner = withRouter(_AppRouterInner);

export default () => (
  <HashRouter>
    <AppRouterInner />
  </HashRouter>
);
