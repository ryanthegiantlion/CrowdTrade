'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
} from 'react-native';

class News extends Component {

    render() {
      return (
        <Text style={styles.title}>News</Text> 
      );
    }
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
    },
  });

module.exports = News