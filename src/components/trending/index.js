'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
} from 'react-native';

class Trending extends Component {

    render() {

      return (
        <Text style={styles.title}>Trending</Text> 
      );
    }
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
    },
  });

module.exports = Trending