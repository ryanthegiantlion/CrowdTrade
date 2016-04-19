/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Navigator,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';

// TODO: Busy playing around with these guys, will delete the one I don't like
import Drawer from 'react-native-drawer'
import SideMenu from 'react-native-side-menu';
import Menu from './components/menu/index';
import Header from './components/header/index';
import Routes from './routes';
import Stock from './components/stock/index';
import { connect } from 'react-redux'
import HomeScreen from './homescreen'

class App extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, nav) {
    switch (route.name) {
      case 'homescreen':
        return <HomeScreen nav={nav} isMenuShowing={this.props.isMenuShowing} currentRoute={this.props.currentRoute}/>;
      case 'stock':
        return <Stock symbol={route.symbol} nav={nav} />;
      default:
        return <HomeScreen nav={nav} isMenuShowing={this.props.isMenuShowing} currentRoute={this.props.currentRoute}/>;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'homeScreen', index: 0}}
        renderScene={this.renderScene.bind(this)}/>      
    );
  }
}

const styles = StyleSheet.create({
});

function mapStateToProps(state) {
  return state.ui
}
module.exports = connect(mapStateToProps)(App);
