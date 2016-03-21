import React, { StyleSheet, Text, View, Animated, Component, TouchableHighlight, Image} from 'react-native';

import Dimensions from 'Dimensions';

var IconIonicons = require('react-native-vector-icons/Ionicons');

export default class StockNews extends Component {
  render() {
    let stockTextColor = this.props.hasIncreased ? styles.greenText : styles.redText;
    let stockDiffIcon = this.props.hasIncreased ? 'arrow-up-a' : 'arrow-down-a';
    let screenwidth = Dimensions.get('window').width;
    return (
      <View style={[styles.stockPerformanceContainer, {width: screenwidth}]}>
        <View style={styles.timeSpanContainer}>
          <TouchableHighlight style={styles.timeSpan}><Text style={styles.timeSpanText}>1W</Text></TouchableHighlight>
          <TouchableHighlight style={styles.timeSpan}><Text style={styles.timeSpanText}>1M</Text></TouchableHighlight>
          <TouchableHighlight style={styles.timeSpan}><Text style={styles.timeSpanText}>3M</Text></TouchableHighlight>
          <TouchableHighlight style={styles.timeSpan}><Text style={styles.timeSpanText}>6M</Text></TouchableHighlight>
          <TouchableHighlight style={styles.timeSpan}><Text style={styles.timeSpanText}>1y</Text></TouchableHighlight>
          <TouchableHighlight style={styles.timeSpan}><Text style={styles.timeSpanText}>2y</Text></TouchableHighlight>
        </View>
        <Image source={require('../../store/data/trending/stock_graph/1d.jpeg')} style={[styles.graph, {width: screenwidth}]} resizeMode={Image.resizeMode.stretch}/>
        <View style={styles.cardStockDetailsContainer}>
            <View style={styles.cardStockStatsContainer}>
              <View style={styles.cardStockStatContainer}>
                <Text style={styles.cardStockStatLabel}>
                  LOW
                </Text>
                <Text style={styles.cardStockStat}>
                  {this.props.low}
                </Text>
              </View>
              <View style={styles.cardStockStatContainer}>
                <Text style={styles.cardStockStatLabel}>
                  AVG
                </Text>
                <Text style={styles.cardStockStat}>
                  {this.props.ave}
                </Text>
              </View>
              <View style={styles.cardStockStatContainer}>
                <Text style={styles.cardStockStatLabel}>
                  HIGH
                </Text>
                <Text style={styles.cardStockStat}>
                  {this.props.high}
                </Text>
              </View>
            </View>
            <View style={styles.cardStockDiffContainer}>
              <IconIonicons name={stockDiffIcon} style={[styles.cardStockDiffImage, stockTextColor]} />
              <View style={styles.cardStockDiffTextContainer}>
                <Text style={[styles.cardStockDiffLabel, stockTextColor]}>
                  KO
                </Text>
                <Text style={[styles.cardStockDiff, stockTextColor]}>
                  {this.props.current}
                </Text>
                <Text style={[styles.cardStockPercentageChange, stockTextColor]}>
                  {this.props.percentageChange}
                </Text>
              </View>
            </View>
          </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  greenText: {
    color: '#00a060',
  },
  redText: {
    color: '#b5173a',
  },

  stockPerformanceContainer: {
    borderWidth: 2,
    //flex: 1,
    backgroundColor: 'green',
    //position: 'relative',
  },
  timeSpanContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeSpan: {
    flex: 1,
  },
  timeSpanText: {

  },
  graph: {
    height: 300,
  },
  cardStockDetailsContainer: {
    backgroundColor: '#FFF',
    height: 80,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
    //borderBottomWidth: 1,
    //borderColor: '#BBB',
  },
  cardStockStatsContainer: {
    flexDirection: 'row',
    flex: 2,
    borderBottomWidth: 1,
    borderColor: '#BBB',
    alignItems: 'flex-end',
  },
  cardStockStatContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  cardStockStatLabel: {
    fontSize: 7,
    marginRight: 4,
    color: '#666',
    fontWeight: '500',
  },
  cardStockStat: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardStockDiffContainer: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStockDiffImage: {
    marginRight: 2,
  },
  cardStockDiffTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    //height: 14,
  },
  cardStockDiffImage: {
    fontSize: 24,
    marginRight: 8,
  },
  cardStockDiffLabel: {
    fontSize: 7,
    marginRight: 2,
    paddingBottom: 2,
  },
  cardStockDiff: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 6,
  },
  cardStockPercentageChange: {
    fontSize: 7,
    alignSelf: 'flex-start',
  },
});