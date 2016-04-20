import React, { PanResponder, ScrollView, StyleSheet, Text, View, Animated, Component, TouchableHighlight, Image} from 'react-native';
import Dimensions from 'Dimensions';
import clamp from 'clamp';
import StockPerformance from './stockPerformance'
import StockNews from './stockNews'
var IconIonicons = require('react-native-vector-icons/Ionicons');
var ScrollableTabView = require('react-native-scrollable-tab-view');

const SWIPE_THRESHOLD = 20

export default class CardDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
    }
  }

  _animateEntrance() {
    // Animated.timing(this.state.bottom, {
    //          toValue: 0,
    //    }).start()
  }

  render() {
    //var animatedDropDownStyles = {transform: [{translateY: translateY}], bottom: this.state.bottom}
    var animatedDropDownStyles = {}
    if (this.state.currentTab == 0) {
      var dot1Opacity = {opacity: 0.6}
      var dot2Opacity = {opacity: 0.3}
    }
    else {
      var dot1Opacity = {opacity: 0.3}
      var dot2Opacity = {opacity: 0.6}
    }
    return (
      <Animated.View style={styles.cardDropDown}>
        <ScrollableTabView onChangeTab={(tab) => this.setState({currentTab: tab.i})} contentProps={{bounces: false}} initialPage={0} locked={false} renderTabBar={() => <View/>}>
          <StockPerformance {...this.props} onToggleIsDropDownDisplayed={this.props.onToggleIsDropDownDisplayed}/>
          <StockNews news={this.props.news} onToggleIsDropDownDisplayed={this.props.onToggleIsDropDownDisplayed}/>  
        </ScrollableTabView>
        <View style={styles.dotContainer}>
          <View style={[styles.dot, dot1Opacity]}></View>
          <View style={[styles.dot, dot2Opacity]}></View>
        </View>
      </Animated.View>
    )
  }
}

var styles = StyleSheet.create({
  cardDropDown: {
    flex: 1,
    backgroundColor: 'white',
  },
  horizontalScrollView: {
  },
  dotContainer: {
    position: 'absolute',
    bottom: 4,
    right: 0,
    left: 0,
    height: 16,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: 'white',
    borderRadius: 4,
  },
});