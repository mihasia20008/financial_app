import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { AppContainer } from 'react-hot-loader';

import store from './store';

import { App } from './containers/App';

const renderComponent = (Component) => {
  render(
    <AppContainer>
			<Provider store={store} >
      	<Component />
			</Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderComponent(App);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept("./containers/App", () => {
        renderComponent(App);
    });
}
