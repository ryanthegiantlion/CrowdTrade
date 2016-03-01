'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
} from 'react-native';

class CrowdChoice extends Component {

    render() {
      return (
        <Text style={styles.title}>CrowdChoice</Text> 
      );
    }
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
    },
  });

module.exports = CrowdChoice