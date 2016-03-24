import React, { StyleSheet, Text, View, Animated, Component, TouchableHighlight, Image} from 'react-native';

import Dimensions from 'Dimensions';

var IconIonicons = require('react-native-vector-icons/Ionicons');

var graphImages = {
  image1w: require('../../store/data/trending/stock_graph/1w.jpeg'),
  image1m: require('../../store/data/trending/stock_graph/1m.jpeg'),
  image3m: require('../../store/data/trending/stock_graph/3m.jpeg'),
  image6m: require('../../store/data/trending/stock_graph/6m.jpeg'),
  image1y: require('../../store/data/trending/stock_graph/1y.jpeg'),
  image2y: require('../../store/data/trending/stock_graph/2y.jpeg'),
}

export default class StockPerformance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTimeSpan: '1w'
    }
  }

  render() {
  	let stockTextColor = this.props.hasIncreased ? styles.greenText : styles.redText;
    let stockDiffIcon = this.props.hasIncreased ? 'arrow-up-a' : 'arrow-down-a';
    let screenwidth = Dimensions.get('window').width;
    return (
      <View style={[styles.stockPerformanceContainer, {width: screenwidth}]}>
      	<View style={styles.timeSpanContainer}>
      		<TouchableHighlight style={styles.timeSpan} onPress={() => this.setState({currentTimeSpan: '1w'})}><Text style={styles.timeSpanText}>1W</Text></TouchableHighlight>
      		<TouchableHighlight style={styles.timeSpan} onPress={() => this.setState({currentTimeSpan: '1m'})}><Text style={styles.timeSpanText}>1M</Text></TouchableHighlight>
      		<TouchableHighlight style={styles.timeSpan} onPress={() => this.setState({currentTimeSpan: '3m'})}><Text style={styles.timeSpanText}>3M</Text></TouchableHighlight>
      		<TouchableHighlight style={styles.timeSpan} onPress={() => this.setState({currentTimeSpan: '6m'})}><Text style={styles.timeSpanText}>6M</Text></TouchableHighlight>
      		<TouchableHighlight style={styles.timeSpan} onPress={() => this.setState({currentTimeSpan: '1y'})}><Text style={styles.timeSpanText}>1Y</Text></TouchableHighlight>
      		<TouchableHighlight style={styles.timeSpan} onPress={() => this.setState({currentTimeSpan: '2y'})}><Text style={styles.timeSpanText}>2Y</Text></TouchableHighlight>
      	</View>
        <Image source={graphImages["image" + this.state.currentTimeSpan]} style={[styles.graph, {width: screenwidth}]} resizeMode={Image.resizeMode.stretch}/>
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