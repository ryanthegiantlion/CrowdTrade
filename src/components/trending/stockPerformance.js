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

export default class TimeSpanSelector extends Component {
  render() {
    let active = undefined
    if (this.props.isActive)
    {
      active = styles.active
    }
    return (
      <TouchableHighlight 
        style={styles.timeSpan} 
        onPress={() => this.props.onTimeSpanPress(this.props.timeSpan)}>
        <View style={[styles.timeSpanContainer, active]}>
          <Text style={styles.timeSpanText}>{this.props.timeSpanLabel}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default class StockPerformance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTimeSpan: '1w'
    }
  }

  onTimeSpanPress(timeSpan) {
    this.setState({currentTimeSpan: timeSpan})
  }

  render() {
    let screenwidth = Dimensions.get('window').width;
    return (
      <View style={[styles.stockPerformanceContainer, {width: screenwidth}]}>
      	<View style={styles.timeSpansContainer}>
          <TimeSpanSelector onTimeSpanPress={this.onTimeSpanPress.bind(this)} timeSpan='1w' timeSpanLabel='1W' isActive={this.state.currentTimeSpan == '1w'}/>
          <TimeSpanSelector onTimeSpanPress={this.onTimeSpanPress.bind(this)} timeSpan='1m' timeSpanLabel='1M' isActive={this.state.currentTimeSpan == '1m'}/>
          <TimeSpanSelector onTimeSpanPress={this.onTimeSpanPress.bind(this)} timeSpan='3m' timeSpanLabel='3M' isActive={this.state.currentTimeSpan == '3m'}/>
          <TimeSpanSelector onTimeSpanPress={this.onTimeSpanPress.bind(this)} timeSpan='6m' timeSpanLabel='6M' isActive={this.state.currentTimeSpan == '6m'}/>
          <TimeSpanSelector onTimeSpanPress={this.onTimeSpanPress.bind(this)} timeSpan='1y' timeSpanLabel='1Y' isActive={this.state.currentTimeSpan == '1y'}/>
          <TimeSpanSelector onTimeSpanPress={this.onTimeSpanPress.bind(this)} timeSpan='2y' timeSpanLabel='2Y' isActive={this.state.currentTimeSpan == '2y'}/>
      	</View>
        <Image source={graphImages["image" + this.state.currentTimeSpan]} style={[styles.graph, {width: screenwidth}]} resizeMode={Image.resizeMode.stretch}/>
      </View>
    )
  }
}

var styles = StyleSheet.create({

  stockPerformanceContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  timeSpansContainer: {
  	flexDirection: 'row',
    
    alignItems: 'center',
  },
  timeSpanContainer: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  timeSpan: {
    flex: 1,
    alignItems: 'center',
    //marginTop: 8,
    //marginBottom: 8,
  },
  timeSpanText: {
    color: 'white',
    //mari
  },
  active: {
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  graph: {
    flex: 1,
    padding: 20,
    transform: [{scale: 0.95}],
  },
});