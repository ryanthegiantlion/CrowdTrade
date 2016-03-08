'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
} from 'react-native';

class VirtualPortfolio extends Component {

    render() {
      return (
        <Text style={styles.title}>VirtualPortfolio</Text> 
      );
    }
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
    },
  });

module.exports = VirtualPortfolio