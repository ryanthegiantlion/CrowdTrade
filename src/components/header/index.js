'use strict';
import React, {
  StyleSheet,
  Component,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome');

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
            <View style={styles.headerTitle}>
              <Image style={styles.image} source={require('./img/logo.jpg')} />
            </View>
            <Icon name="cog" size={24} color="white" />
          </View>
      );
    }
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: 'black',
      flexDirection: 'row',
      padding: 10,
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
  });

module.exports = Header