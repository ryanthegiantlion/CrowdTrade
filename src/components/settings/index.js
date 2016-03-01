'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
} from 'react-native';

class Settings extends Component {

    render() {
      return (
        <Text style={styles.title}>Settings</Text> 
      );
    }
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
    },
  });

module.exports = Settings