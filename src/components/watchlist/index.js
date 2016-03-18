'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
} from 'react-native';

class WatchList extends Component {

    render() {
      return (
        <Text style={styles.title}>WatchList</Text> 
      );
    }
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
    },
  });

module.exports = WatchList