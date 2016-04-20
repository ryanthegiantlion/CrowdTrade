'use strict';
import React, {
  StyleSheet,
  Component,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux'
import { changeRoute } from '../../store/actions'

class MenuItem extends Component {
  render() {
    return (
      <TouchableHighlight key={this.props.route} onPress={() => {this.props.onMenuItemPress(this.props.route)}}>
        <View style={styles.menuItem}>
          <Text
            style={styles.menuItemText}
          >{this.props.children}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

class Menu extends Component {
    constructor(props) {
      super(props);
        this.handleMenuItemPress = this.handleMenuItemPress.bind(this);
    }

    handleMenuItemPress(page) {
      this.props.onMenuItemSelect(page);
    }

    render() {
      return (
          <View style={styles.menu}>
            <MenuItem route='trending' onMenuItemPress={this.props.onMenuItemPress}>Trending</MenuItem>
            <MenuItem route='watchlist' onMenuItemPress={this.props.onMenuItemPress}>Watch list</MenuItem>
            <MenuItem route='crowdchat' onMenuItemPress={this.props.onMenuItemPress}>Crowd Chat</MenuItem>
            <MenuItem route='news' onMenuItemPress={this.props.onMenuItemPress}>News</MenuItem>
            <MenuItem route='virtualportfolio' onMenuItemPress={this.props.onMenuItemPress}>Virtual Portfolio</MenuItem>
          </View>
      );
    }
}

const styles = StyleSheet.create({
    menu: {
      backgroundColor: 'black',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 80,
    },
    menuItem: {
      padding: 12,
      borderTopColor: '#333',
      borderWidth: 1,
    },
    menuItemText: {
      color: 'white',
      fontSize: 16,
    },
  });

function mapStateToProps(state) {
  return state.ui
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMenuItemPress: (route) => {
      dispatch(changeRoute(route))
    },
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Menu);
