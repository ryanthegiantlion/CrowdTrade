'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import { updateSearchFilter } from '../../../store/actions'
import { connect } from 'react-redux'

var MaterialIconsIcon = require('react-native-vector-icons/MaterialIcons');

class Search extends Component {
  componentWillUnmount() {
    this.props.onUpdateSearchFilter('')
  }

  render() {
    let window = Dimensions.get('window')
    let searchBarWidth = window.width * 2 / 3
    return (
      <View style={styles.searchBarContainer}>
        <View style={[styles.searchBar, {width: searchBarWidth}]}>
          <MaterialIconsIcon name='search' style={styles.searchBarIcon}/>
          <TextInput
            value={this.props.searchFilter}
            onChangeText={(text) => this.props.onUpdateSearchFilter(text)} 
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
    paddingTop: 8,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    height: 24,
    backgroundColor: 'white',
    borderRadius: 14,
    paddingLeft: 4,
    alignItems: 'center',
  },
  searchBarIcon: {
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  searchBarInput: {
    flex: 1,
    height: 24,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  return {
    searchFilter: state.ui.searchFilter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSearchFilter: (text) => {
      dispatch(updateSearchFilter(text))
    },
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Search);
