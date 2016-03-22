import React, { PanResponder, ScrollView, StyleSheet, Text, View, Animated, Component, TouchableHighlight, Image} from 'react-native';
import Dimensions from 'Dimensions';
import clamp from 'clamp';
import StockPerformance from './stockPerformance'
import StockNews from './stockNews'
var IconIonicons = require('react-native-vector-icons/Ionicons');
var ScrollableTabView = require('react-native-scrollable-tab-view');

const SWIPE_THRESHOLD = 40

export default class CardDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      bottom: new Animated.Value(Dimensions.get('window').height)
    }
  }

  _animateEntrance() {
    Animated.timing(this.state.bottom, {
             toValue: 0,
       }).start()
  }

  _resetState() {

  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (Math.abs(gestureState.vy) > Math.abs(gestureState.vx))
        {
          return true;
        }

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

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.y._value) > SWIPE_THRESHOLD) {
          console.log('here');
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.97
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
    let translateY = this.state.pan.y.interpolate({inputRange: [-200, 0], outputRange: [-200, 0], extrapolate: 'clamp'});
    var animatedDropDownStyles = {transform: [{translateY: translateY}], bottom: this.state.bottom}

    return (
      <Animated.View style={[styles.cardDropDown, animatedDropDownStyles]} {...this._panResponder.panHandlers}>
        <ScrollableTabView contentProps={{bounces: false}} initialPage={0} locked={false} renderTabBar={() => <View />}>
          <StockPerformance {...this.props}/>
          <StockNews {...this.props}/>
        </ScrollableTabView >
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
  },
  horizontalScrollView: {
  },
});