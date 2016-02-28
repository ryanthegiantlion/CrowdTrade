/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
// 'use strict';
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

var Icon = require('react-native-vector-icons/FontAwesome');


class Menu extends Component {
  constructor(props) {
    super(props); 
      this.handleMenuItemPress = this.handleMenuItemPress.bind(this);
  }

  handleMenuItemPress(page) {
    this.props.onMenuItemPress(page);
  }

  render() {
    const pages = [
      'Trending', 
      'News', 
      'Watch list', 
      'Crowd choice', 
      'Crowd chat',
      'Settings'];

    return (
        <View style={styles.menu}>
          {pages.map(page =>
            <TouchableHighlight key={page} onPress={() => {this.handleMenuItemPress(page)}}>
              <View style={styles.menuItem}>
                <Text
                  style={styles.menuItemText}
                >{page}</Text>
              </View>
            </TouchableHighlight>
          )}
        </View>
    );
  }
}

class Header extends Component {
  constructor(props) {
    super(props); 
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  handleMenuToggle(e) {
    this.props.onMenuToggle();
  }

  render() {

    return (
        <View style={styles.header}>
          <TouchableHighlight onPress={this.handleMenuToggle}>
            <Icon name="navicon" size={24} color="white" />
          </TouchableHighlight>
          <Text style={styles.headerTitle}>CrowdTrade</Text>
          <Icon name="cog" size={24} color="white" />
        </View>
    );
  }
}

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
  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    padding: 10,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  menu: {
    backgroundColor: 'black',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 48,
  },
  menuItem: {
    padding: 8,
    borderTopColor: '#333',
    borderWidth: 1,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    color: 'white',

  },
  appText: {
    color: 'white',
  },
  navicon: {
    marginTop: 30,
  },
});

AppRegistry.registerComponent('CrowdTrade', () => CrowdTrade);
