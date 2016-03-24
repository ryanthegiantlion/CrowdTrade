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
      pan: new Animated.ValueXY(),
      bottom: new Animated.Value(Dimensions.get('window').height)
    }
  }

  _animateEntrance() {
    // Animated.timing(this.state.bottom, {
    //          toValue: 0,
    //    }).start()
  }

  _resetState() {
    this.props.onToggleIsDropDownDisplayed();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // if (Math.abs(gestureState.vy) > Math.abs(gestureState.vx))
        // {
        //   return true;
        // }

        return false;
      },

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        console.log('release')
        this.state.pan.flattenOffset();
        var velocity;

        if (vy >= 0) {
          velocity = clamp(vy, 3, 5);
        } else if (vy < 0) {
          velocity = clamp(vy * -1, 3, 5) * -1;
        }

        console.log(velocity)

        if (Math.abs(this.state.pan.y._value) > SWIPE_THRESHOLD) {
          console.log('here');
          Animated.decay(this.state.pan, {
            velocity: {x: vx, y: velocity},
            deceleration: 0.997
          }).start(this._resetState.bind(this))
        } else {
          // Animated.spring(this.state.pan, {
          //   toValue: {x: 0, y: 0},
          //   friction: 4
          // }).start()
        }
      }
    })
  }

  componentDidMount() {
    this._animateEntrance();
  }

  render() {
    let translateY = this.state.pan.y.interpolate({inputRange: [-400, 0], outputRange: [-400, 0], extrapolate: 'clamp'});
    //var animatedDropDownStyles = {transform: [{translateY: translateY}], bottom: this.state.bottom}
    var animatedDropDownStyles = {}
    return (
      <Animated.View style={[styles.cardDropDown, animatedDropDownStyles]} {...this._panResponder.panHandlers}>
        <ScrollableTabView contentProps={{bounces: false}} initialPage={0} locked={false} renderTabBar={() => <View/>}>
          <StockPerformance {...this.props}/>
          <StockNews news={this.props.news}/>
        </ScrollableTabView >
      </Animated.View>
    )
  }
}

var styles = StyleSheet.create({
  cardDropDown: {
    //position: 'absolute',
    //top: 0,
    //right: 0,
    //left: 0,
    flex: 1,
    backgroundColor: 'white',
  },
  horizontalScrollView: {
  },
});