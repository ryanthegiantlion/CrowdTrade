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
        <Image source={{uri: staticContainer + this.props.stockItem.image}} style={styles.stockImage} resizeMode={Image.resizeMode.cover} />
      </TouchableHighlight>
    );
  }
}

export default class GridView extends Component {
  constructor(props) {
    super(props);

    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // this.state = {
    //   dataSource: ds.cloneWithRows(this.props.items),
    // };
  }

  render() {
    var screenWidth = Dimensions.get('window').width;
    var containerDimensions = Math.floor(screenWidth/ this.props.itemsPerRow)

    return (
      <ListView contentContainerStyle={styles.list}
        pageSize = {8}
        dataSource={this.props.items}
        renderRow={(rowData) => <View key={rowData.symbol} style={[styles.itemContainer, {width: containerDimensions, height: containerDimensions}]}><RowItem nav={this.props.nav} stockItem={rowData}/></View>}/>
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
        <Search title='Watch list' />
        <GridView items={this.props.stocks} itemsPerRow={4} nav={this.props.nav}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eee',
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
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 2,
    shadowColor: '#AAA',
    //shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  stockImage: {
    flex: 1,
  },
});

// function mapStateToProps(state) {
//   return {stocks: state.watchList.data}
//}

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

function mapStateToProps(state) {
  if (state.ui.searchFilter.length == 0) {
    return {
      stocks: dataSource.cloneWithRows(state.watchList.data),
    }
  } else {
    return {
      stocks: dataSource.cloneWithRows(state.watchList.data.filter((item) => item.symbol.toLowerCase().startsWith(state.ui.searchFilter.toLowerCase()) || item.name.toLowerCase().startsWith(state.ui.searchFilter.toLowerCase())))
    }
  }
}

module.exports = connect(mapStateToProps)(WatchList);
