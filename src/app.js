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
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var menu;
      if (this.props.isMenuShowing) {
        menu = <Menu/>
      }
      else {
        menu = undefined
      }

    const CurrentPage = Routes[this.props.currentRoute].Page;

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

function mapStateToProps(state) {
  return state.ui
}
module.exports = connect(mapStateToProps)(App);
