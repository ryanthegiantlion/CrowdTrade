'use strict';
import React, {
  StyleSheet,
  Component,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

import { connect } from 'react-redux'
import { toggleMenu, changeRoute } from '../../store/actions'

var Icon = require('react-native-vector-icons/FontAwesome');
var IoniconIcon = require('react-native-vector-icons/Ionicons')

class Header extends Component {
    constructor(props) {
      super(props);
      //this.handleMenuToggle = this.handleMenuToggle.bind(this);
    }

    // handleMenuToggle(e) {
    //   this.props.onMenuToggle();
    // }

    render() {

      return (
          <View style={styles.header}>
            <TouchableHighlight onPress={this.props.onHandleMenuToggle}>
              <View style={styles.menuIconContainer}>
                <IoniconIcon name="navicon-round" size={24} color="white" />
              </View>
            </TouchableHighlight>
            <View style={styles.headerTitle}>
              <Image style={styles.image} source={require('./img/logo.jpg')} />
            </View>
            <TouchableHighlight onPress={this.props.onSettingsPress}>
              <View style={styles.menuIconContainer}>
                <IoniconIcon name="gear-a" size={24} color="white" />
              </View>
            </TouchableHighlight>
          </View>
      );
    }
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: 'black',
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: 20,
    },
    headerTitle: {
      flex: 1,
      alignItems: 'center',
    },
    image: {
      height: 30,
      width: 150,
    },
    menuIconContainer: {
      height: 44,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

function mapStateToProps(state) {
  return state.ui
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleMenuToggle: () => {
      dispatch(toggleMenu())
    },
    onSettingsPress: () => {
      dispatch(changeRoute('settings'))
    },
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Header);
