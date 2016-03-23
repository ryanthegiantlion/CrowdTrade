'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';

var MaterialIconsIcon = require('react-native-vector-icons/MaterialIcons');

export default class Search extends Component {
    render() {
      let window = Dimensions.get('window')
      let searchBarWidth = window.width * 2 / 3
      return (
        <View style={styles.searchBarContainer}>
          <Text style={styles.title}>Search bar</Text>
          <View style={[styles.searchBar, {width: searchBarWidth}]}>
            <MaterialIconsIcon name='search' style={styles.searchBarIcon}/>
            <TextInput
              placeholder='Search Company / Symbol'
              placeholderTextColor='#666'
              style={styles.searchBarInput}/>
          </View>
        </View>
      );
    }
}



const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 4,
    alignItems: 'center',
  },
  searchBarIcon: {
    fontSize: 18,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  searchBarInput: {
    flex: 1,
    height: 20,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
