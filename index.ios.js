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
  View
} from 'react-native';

// TODO: Busy playing around with these guys, will delete the one I don't like
import Drawer from 'react-native-drawer'
import SideMenu from 'react-native-side-menu';

var Icon = require('react-native-vector-icons/FontAwesome');

class Menu extends Component {

  render() {

    return (
        <View>
          <Text>lala</Text>
        </View>
    );
  }
}

class Header extends Component {

  render() {

    return (
        <View style={styles.header}>
          <Icon name="navicon" size={24} color="white" />
          <Text style={styles.headerTitle}>CrowdTrade</Text>
          <Icon name="cog" size={24} color="white" />
        </View>
    );
  }
}

class CrowdTrade extends Component {
  
  render() {

    return (
        <View style={styles.container}>
              <Header />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    padding: 10,
  },
  headerTitle: {
    flex: 1,
    color:'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  appText: {
    color: 'white',
  },
  navicon: {
    marginTop: 30,
  },
});

AppRegistry.registerComponent('CrowdTrade', () => CrowdTrade);
