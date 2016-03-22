/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StatusBarIOS,
  Platform
} from 'react-native';

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './app'
import initialState from './store/initialState'

const store = configureStore(initialState())

export default function Init() {

  if (Platform.OS === 'ios') {
    StatusBarIOS.setStyle('light-content')
  }

  class Root extends Component {

    render() {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );
    }
  }

  AppRegistry.registerComponent('CrowdTrade', () => Root);
}
