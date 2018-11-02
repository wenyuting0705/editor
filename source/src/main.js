import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppRouter from './pages/route';

import './assets/styles/index.scss';
// import '../node_modules/draft-js/dist/Draft.css';

const MOUNT_NODE = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <AppRouter />
  </AppContainer>,
  MOUNT_NODE
);

// render(Root);
if (process.env.NODE_ENV !== 'production') {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

if (module.hot) {
  module.hot.accept('./main.js');
  module.hot.accept('./pages/route', () => {
    // ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // render(Root);
    window.location.reload();
  });
}

/* eslint-disable */
if (process.env.NODE_ENV === 'production') {
  console.log('sw');
  require('offline-plugin/runtime').install();
}
/* eslint-enable */
// window.onunload = function() {
//   ls.delete('start_time');
//   ls.delete('end_time');
// };
