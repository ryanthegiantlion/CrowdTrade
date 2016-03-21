import React, { ScrollView, StyleSheet, Text, View, Animated, Component, TouchableHighlight, Image} from 'react-native';

import StockPerformance from './stockPerformance'
import StockNews from './stockNews'
var IconIonicons = require('react-native-vector-icons/Ionicons');

export default class CardDropDown extends Component {
  render() {
    return (
      <Animated.View style={styles.cardDropDown}>
      	<ScrollView
          horizontal={true}
          style={styles.horizontalScrollView}>
          <StockPerformance {...this.props}/>
          <StockNews {...this.props}/>
        </ScrollView>
      </Animated.View>
    )
  }
}

var styles = StyleSheet.create({
  cardDropDown: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    borderWidth: 2,
  },
  horizontalScrollView: {
  	//position: 'absolute',
  	//top: 0,
  	//right: 0,
  	//left: 0,
  	//borderWidth: 2,
  	borderColor: 'red',
  },
});