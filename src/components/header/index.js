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
                <Icon name="navicon" size={24} color="white" />
              </View>
            </TouchableHighlight>
            <View style={styles.headerTitle}>
              <Image style={styles.image} source={require('./img/logo.jpg')} />
            </View>
            <TouchableHighlight onPress={this.props.onSettingsPress}>
              <View style={styles.menuIconContainer}>
                <Icon name="cog" size={24} color="white" />
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
      //padding: 10,
      height: 50,
      alignItems: 'center',
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
      height: 50,
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
