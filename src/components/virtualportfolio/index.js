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
var Icon = require('react-native-vector-icons/FontAwesome');

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

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPercentage: true,
    };
  }

  onClick() {
    this.setState({showPercentage: !this.state.showPercentage})
  }

  render() {
    let changeSymbol = '%'
    let change = '3.1'
    if (!this.state.showPercentage) {
      changeSymbol = '$'
      change = '2.712'
    }
    return (
      <TouchableHighlight onPress={() => this.onClick()} underlayColor="rgba(0,0,0,0)">
        <View style={styles.footer} > 
          <View style={styles.totalAndChangeContainer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <View style={styles.totalAmountContainer}>
                <Text style={styles.totalAmountSymbol}>$</Text>
                <Text style={styles.totalAmount}>87.641</Text>
              </View>
            </View>
            <View style={styles.changeContainer}>
              <View style={styles.changeLabelContainer}>
                <Text style={styles.changeLabel}>Growth</Text>
                <Icon name='sort-up' style={styles.changeLabelSymbol}/>
              </View>
              <View style={styles.changeAmountContainer}>
                <Text style={styles.changeSymbol}>{changeSymbol}</Text>
                <Text style={styles.change}>{change}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
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
        <Footer />
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
  footer: {
    paddingTop: 10,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: 'black',  
  },
  totalAndChangeContainer: {
    borderBottomWidth: 1,
    borderColor: '#888',
    flexDirection: 'row',
    paddingBottom: 4,
  },
  totalContainer: {
    flex: 1,
  },
  changeContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 8,
    color: '#bababa',
    fontWeight: 'bold',
  },
  totalAmountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  totalAmountSymbol: {
    fontWeight: 'bold',
    fontSize: 8,
    color: '#bababa',
    marginBottom: 2,
    marginRight: 2,
  },
  totalAmount: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  changeLabelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  changeLabel: {
    fontSize: 8,
    color: '#bababa',
    fontWeight: 'bold',
  },
  changeLabelSymbol: {
    fontSize: 8,
    color: '#bababa',
    fontWeight: 'bold',
    marginLeft: 2,
    //paddingTop: 4,  
  },
  changeAmountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  changeSymbol: {
    fontWeight: 'bold',
    fontSize: 8,
    color: '#bababa',
    marginBottom: 2,
    marginRight: 2,
  },
  change: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});


// <View style={styles.footer}>
//   <View style={styles.totalAndChangeContainer}>
//     <View style={styles.totalContainer}>
//       <Text style={styles.totalLabel}>TOTAL</Text>
//       <View style={styles.totalAmountContainer}>
//         <Text style={styles.totalAmountSymbol}>$</Text>
//         <Text style={styles.totalAmount}>87.641</Text>
//       </View>
//     </View>
//     <View style={styles.changeContainer}>
//       <View style={styles.changeLabelContainer}>
//         <Text style={styles.changeLabel}>Growth</Text>
//         <Icon name='sort-up' style={styles.changeLabelSymbol}/>
//       </View>
//       <View style={styles.changeAmountContainer}>
//         <Text style={styles.changeSymbol}>%</Text>
//         <Text style={styles.change}>3.1</Text>
//       </View>
//     </View>
//   </View>
// </View>

function mapStateToProps(state) {
  return {portfolio: state.virtualPortfolio.data}
}

module.exports = connect(mapStateToProps)(VirtualPortfolio);
