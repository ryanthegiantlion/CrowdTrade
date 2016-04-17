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

var graphImages = {
  inc1: require('../../img/virtualportfolio/inc1.png'),
  inc2: require('../../img/virtualportfolio/inc2.png'),
  inc3: require('../../img/virtualportfolio/inc3.png'),
  dec1: require('../../img/virtualportfolio/dec1.png'),
  dec2: require('../../img/virtualportfolio/dec2.png'),
  dec3: require('../../img/virtualportfolio/dec3.png'),
}

class RowItem extends Component {
  onClick(symbol) {
    this.props.nav.push({
      name: 'stock',
      symbol: symbol
    });
  }

  render() {
    let percentageBorderColor = this.props.hasIncreased ? styles.greenBorder : styles.redBorder;
    let percentageBackgroundColor = this.props.hasIncreased ? styles.greenBackground : styles.redBackground;

    return (
      <TouchableHighlight style={styles.stockButton} onPress={() => this.onClick(this.props.symbol)} underlayColor="rgba(0,0,0,0.5)">
        <View style={styles.itemContainer}>
          <Text style={styles.shareCount}>{this.props.shareCount + " SHARES"}</Text>
          <View style={styles.symboleNameAndPercentageContainer}>
            <View style={styles.symbolAndNameContainer}>
              <Text style={styles.symbol}>{this.props.symbol}</Text>
              <Text numberOfLines={1} style={styles.name}>{this.props.name}</Text>
            </View>
            <View style={[styles.graphAndPercentageContainer, percentageBorderColor]}>
              <View style={styles.graphContainer}>
                <Image source={graphImages[this.props.graphImage]} style={styles.graph} resizeMode={Image.resizeMode.cover}/>
              </View>
              <View style={[styles.percentageContainer, percentageBackgroundColor, percentageBorderColor]}>
                <View style={styles.percentageInnerContainer}>
                  <Text style={styles.percentageSymbol}>%</Text>
                  <Text style={styles.percentage}>{this.props.percentageChange}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

class PortFolio extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items),
    };
  }

  render() {

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <RowItem nav={this.props.nav} {...rowData}/>} 
        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />} />
    );
  }
}

export default class VirtualPortfolio extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.listContainer}><PortFolio items={this.props.portfolio} nav={this.props.nav}/></View>
        <View style={styles.footer}></View>
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
    marginLeft: 20,
    marginRight: 20,
  },
  footer: {
    height: 50,
    backgroundColor: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: '#b4b4b4',
  },
  stockButton: {

  },
  itemContainer: {
    marginTop: 4,
    marginBottom: 12,
  },
  shareCount: {
    color: '#9f9f9f',
    fontSize: 12,
  },
  symboleNameAndPercentageContainer: {
    flexDirection: 'row',
  },
  symbolAndNameContainer: {
    flex: 1,
  },
  symbol: { 
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {

  },
  graphAndPercentageContainer: {
    marginLeft: 8,
    flexDirection: 'row',
    height: 40,
  },
  graphContainer: {
    width: 60,
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graph: {
    width: 54,
    height: 32,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  percentageInnerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  percentage: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  percentageSymbol: {
    color: 'white',
    fontSize: 12,
    marginRight: 2,
    marginBottom: 2,
  },
  greenBorder: {
    borderColor: '#28bd7e',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden'
  },
  redBorder: {
    borderColor: '#b31b3d',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden'
  },
  greenBackground: {
    backgroundColor: '#28bd7e'
  },
  redBackground: {
    backgroundColor: '#b31b3d'
  },

});

function mapStateToProps(state) {
  return {portfolio: state.virtualPortfolio.data}
}

module.exports = connect(mapStateToProps)(VirtualPortfolio);
