'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux'
import Search from '../shared/search/index'

const itemWidth = 100

let staticContainer = 'https://s3-eu-west-1.amazonaws.com/crowdtrade-stock-logos/v1/';

class RowItem extends Component {
  onClick(symbol) {
    this.props.nav.push({
      name: 'stock',
      symbol: symbol
    });
  }

  render() {
    return (
      <TouchableHighlight style={styles.stockButton} onPress={() => this.onClick(this.props.stockItem.symbol)}>
        <Image source={{uri: staticContainer + this.props.stockItem.image}} style={styles.stockImage} resizeMode={Image.resizeMode.stretch} />
      </TouchableHighlight>
    );
  }
}

export default class GridView extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items),
    };
  }

  render() {
    var screenWidth = Dimensions.get('window').width;
    var containerDimensions = Math.floor(screenWidth/ this.props.itemsPerRow)

    return (
      <ListView contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <View style={[styles.itemContainer, {width: containerDimensions, height: containerDimensions}]}><RowItem nav={this.props.nav} stockItem={rowData}/></View>}/>
    );
  }
}

class WatchList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.bodyContainer}>
        <Search />
        <GridView items={this.props.stocks} itemsPerRow={4} nav={this.props.nav}/>
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
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockButton: {
    height: 70,
    width: 70,
  },
  stockImage: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {stocks: state.watchList.data}
}

module.exports = connect(mapStateToProps)(WatchList);
