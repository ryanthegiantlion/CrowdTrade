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
import Trending from './components/trending/index';

function Init() {
  console.log('init');

  var Icon = require('react-native-vector-icons/FontAwesome');

  class CrowdTrade extends Component {
    constructor(props) {
      super(props); 
        this.state = {
          isMenuShowing: false,
          currentRoute: 'trending',
        };
        this.handleMenuToggle = this.handleMenuToggle.bind(this);
        this.handleMenuItemPress = this.handleMenuItemPress.bind(this);
    }

    handleMenuItemPress(route) {
      console.log('yayaya');
      console.log(route);
      this.setState({isMenuShowing: false, currentRoute: route});
    }

    handleMenuToggle() {
      var currentMenuState = this.state.isMenuShowing;
      this.setState({
        isMenuShowing: !currentMenuState, 
        currentRoute: this.state.currentRoute});
    }

    render() {
      var menu;
        if (this.state.isMenuShowing) {
          menu = <Menu onMenuItemPress={this.handleMenuItemPress}/>
        }
        else {
          menu = undefined
        }

      const CurrentPage = Routes[this.state.currentRoute].Page;

      // console.log(Routes['trending'].Page)r

      // Note that the render order is important here
      // The touch events don't work on menu unless it is rendered last
      return (
          <View style={styles.container}>
                
                <Header onMenuToggle={this.handleMenuToggle}/>
                <View style={styles.bodyContainer}>
                  <CurrentPage />
                </View>
                {menu}
          </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: 24,
      flex: 1,
    },
    bodyContainer: {
      flex: 1,
    },
  });

  AppRegistry.registerComponent('CrowdTrade', () => CrowdTrade);
}

module.exports = Init;
