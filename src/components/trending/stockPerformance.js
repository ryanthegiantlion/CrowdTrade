import React, { StyleSheet, Text, View, Animated, Component, TouchableHighlight, Image} from 'react-native';

import Dimensions from 'Dimensions';

var IconIonicons = require('react-native-vector-icons/Ionicons');

export default class StockPerformance extends Component {
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
        <Image source={require('../../store/data/trending/stock_graph/1m.jpeg')} style={[styles.graph, {width: screenwidth}]} resizeMode={Image.resizeMode.stretch}/>
      </View>
    )
  }
}

var styles = StyleSheet.create({

  stockPerformanceContainer: {
    flex: 1,
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
    flex: 1,
  },
});