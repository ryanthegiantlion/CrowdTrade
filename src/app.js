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

class HomeScreen extends Component {
  render() {
    const CurrentPage = Routes[this.props.currentRoute].Page;
    var menu = undefined;
    var overlay = undefined;
    if (this.props.isMenuShowing) {
      overlay = <View style={styles.overlay}></View>
      menu = <Menu/>
    }
    
    // Note that the render order is important here
    // The touch events don't work on menu unless it is rendered last
    return (
      <View style={styles.container}>      
        <View style={styles.bodyContainer}>
          <CurrentPage nav={this.props.nav}/>
        </View>
        <Header/>
        {overlay}
        {menu}
      </View>
    );
  }
}

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
  container: {
    paddingTop: 16,
    flex: 1,
    backgroundColor: 'black'
  },
  bodyContainer: {
    flex: 1,
    marginTop: 44,
    backgroundColor: 'white',
  },
  overlay : {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 64,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.4,
  }
});

function mapStateToProps(state) {
  return state.ui
}
module.exports = connect(mapStateToProps)(App);
