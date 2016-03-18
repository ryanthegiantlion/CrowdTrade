'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
} from 'react-native';

class CrowdChat extends Component {

    render() {
      return (
        <Text style={styles.title}>CrowdChat</Text> 
      );
    }
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
    },
  });

module.exports = CrowdChat