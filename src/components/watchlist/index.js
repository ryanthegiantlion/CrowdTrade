'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux'
import Search from '../shared/search/index'

class WatchList extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.stocks),
    }
  }

  // see https://github.com/yelled3/react-native-grid-example
  render() {
    console.log('here');
    console.log(this.props.stocks)
    return (
      <View style={styles.bodyContainer}>
        <Search />
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <View style={styles.itemContainer}>
              <Text style={[styles.item, {backgroundColor: 'red'}]}>{this.props.stocks[0].name}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={[styles.item, {backgroundColor: 'red'}]}>{this.props.stocks[0].name}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={[styles.item, {backgroundColor: 'red'}]}>{this.props.stocks[0].name}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={[styles.item, {backgroundColor: 'red'}]}>{this.props.stocks[0].name}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={[styles.item, {backgroundColor: 'red'}]}>{this.props.stocks[0].name}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={[styles.item, {backgroundColor: 'red'}]}>{this.props.stocks[0].name}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={[styles.item, {backgroundColor: 'red'}]}>{this.props.stocks[0].name}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={[styles.item, {backgroundColor: 'red'}]}>{this.props.stocks[0].name}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={[styles.item, {backgroundColor: 'red'}]}>{this.props.stocks[0].name}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={[styles.item, {backgroundColor: 'red'}]}>{this.props.stocks[0].name}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={[styles.item, {backgroundColor: 'red'}]}>{this.props.stocks[0].name}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: 'red',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  itemContainer: {
    borderWidth: 1,
  },
  item: {
    backgroundColor: '#CCC',
    margin: 20,
    width: 70,
    height: 100
  },
});

function mapStateToProps(state) {
  return {stocks: state.watchList.data}
}

module.exports = connect(mapStateToProps)(WatchList);
