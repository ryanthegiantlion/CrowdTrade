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

function Init() {
  console.log('init');

  var Icon = require('react-native-vector-icons/FontAwesome');

  class CrowdTrade extends Component {
    constructor(props) {
      super(props); 
        this.state = {
          isMenuShowing: false,
          currentView: 'Trending',
        };
        this.handleMenuToggle = this.handleMenuToggle.bind(this);
        this.handleMenuItemPress = this.handleMenuItemPress.bind(this);
    }

    handleMenuItemPress(view) {
      this.setState({isMenuShowing: false, currentView: view});
    }

    handleMenuToggle() {
      var currentMenuState = this.state.isMenuShowing;
      this.setState({
        isMenuShowing: !currentMenuState, 
        currentView: this.state.currentView});
    }

    render() {
      var menu;
        if (this.state.isMenuShowing) {
          menu = <Menu onMenuItemPress={this.handleMenuItemPress}/>
        }
        else {
          menu = undefined
        }

      // Note that the render order is important here
      // The touch events don't work on menu unless it is rendered last
      return (
          <View style={styles.container}>
                
                <Header onMenuToggle={this.handleMenuToggle}/>
                <View style={styles.bodyContainer}>
                  <Text style={{fontSize:20}}>{this.state.currentView}</Text>  
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
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  AppRegistry.registerComponent('CrowdTrade', () => CrowdTrade);
}

module.exports = Init;
