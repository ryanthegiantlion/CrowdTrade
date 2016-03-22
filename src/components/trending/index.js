'use strict';

import React, { AppRegistry, StyleSheet, Text, View, Animated, Component, PanResponder, Image, TouchableHighlight} from 'react-native';
import clamp from 'clamp';
import Dimensions from 'Dimensions';

var Icon = require('react-native-vector-icons/FontAwesome');
var IconIonicons = require('react-native-vector-icons/Ionicons');
import { connect } from 'react-redux'
import { incrementTrendingCurrentPosition, toggleIsTrendingDropDownDisplayed } from '../../store/actions'
import Card from './card'
import CardDropDown from './cardDropDown'

// How far the swipe need to go for a yes/ no to fire
var SWIPE_THRESHOLD = 120;
// To get the stack effect the lower card must pick out at the bottom and appear smaller
var NEXT_CARD_POSITION_OFFSET = 2;
var NEXT_CARD_SIZE_OFFSET = 8;

class Trending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
    }
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    // Animated.timing(this.state.nextCardOpacity, {
    //          toValue: 1,
    //    }).start()
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        console.log('grant')
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
        this.state.isUserDragging = true;
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        console.log('release')
        this.state.isUserDragging = false;
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.99
          }).start(this._resetState.bind(this))
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.props.onGoTonextStock((this.props.currentPosition+1)%this.props.cards.length);
  }

  handleNopePress() {
      let screenwidth = Dimensions.get('window').width;
      let panlength = screenwidth + 100

      Animated.timing(this.state.pan, {
            toValue: {x: -panlength, y: 0}
      }).start(this._resetState.bind(this))
  }

  handleYupPress() {
      let screenwidth = Dimensions.get('window').width;
      let panlength = screenwidth + 100

      Animated.timing(this.state.pan, {
            toValue: {x: panlength, y: 0}
      }).start(this._resetState.bind(this))
  }

  render() {
    let { pan } = this.state;
    let cards = this.props.cards
    let currentPosition = this.props.currentPosition

    let [translateX, translateY] = [pan.x, pan.y];

    // card 0 animation
    let rotate = pan.x.interpolate({inputRange: [-240, 0, 240], outputRange: ["-30deg", "0deg", "30deg"]});

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}]};

    let yupOpacity = pan.x.interpolate({inputRange: [0, SWIPE_THRESHOLD], outputRange: [0, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0], outputRange: [1, 0], extrapolate: 'clamp'});
    let animatedNopeStyles = {opacity: nopeOpacity}

    let card0AnimatedStyles = {
      animatedCardStyles: animatedCardStyles,
      animatedNopeStyles: animatedNopeStyles,
      animatedYupStyles: animatedYupStyles
    }

    // card 1 animation
    let card1BottomTranslation = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [0, -NEXT_CARD_POSITION_OFFSET, 0], extrapolate: 'clamp'});
    let card1SideTranslation = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [0, NEXT_CARD_SIZE_OFFSET, 0], extrapolate: 'clamp'});
    let card1TopTranslation = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [0, NEXT_CARD_POSITION_OFFSET+NEXT_CARD_SIZE_OFFSET, 0], extrapolate: 'clamp'});
    let card1TranslationStyles = {top: card1TopTranslation, bottom: card1BottomTranslation, right: card1SideTranslation, left: card1SideTranslation}
    let card1AnimatedStyles = {
      animatedCardContainerStyles: card1TranslationStyles
    }

    // card 2 animation
    let card2BottomTranslation = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [-NEXT_CARD_POSITION_OFFSET, -NEXT_CARD_POSITION_OFFSET*2, -NEXT_CARD_POSITION_OFFSET], extrapolate: 'clamp'});
    let card2SideTranslation = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [NEXT_CARD_SIZE_OFFSET, NEXT_CARD_SIZE_OFFSET*2, NEXT_CARD_SIZE_OFFSET], extrapolate: 'clamp'});
    let card2TopTranslation = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [NEXT_CARD_POSITION_OFFSET+NEXT_CARD_SIZE_OFFSET, (NEXT_CARD_POSITION_OFFSET+NEXT_CARD_SIZE_OFFSET)*2, NEXT_CARD_POSITION_OFFSET+NEXT_CARD_SIZE_OFFSET], extrapolate: 'clamp'});
    let card2TranslationStyles = {top: card2TopTranslation, bottom: card2BottomTranslation, right: card2SideTranslation, left: card2SideTranslation}
    let card2AnimatedStyles = {
      animatedCardContainerStyles: card2TranslationStyles
    }

    let card3AnimatedStyles = {
      animatedCardContainerStyles: {top: (NEXT_CARD_POSITION_OFFSET+NEXT_CARD_SIZE_OFFSET)*2, bottom: -NEXT_CARD_POSITION_OFFSET*2, right: NEXT_CARD_SIZE_OFFSET*2, left: NEXT_CARD_SIZE_OFFSET*2}
    }


    let stock0 = cards[currentPosition]
    let stock1 = cards[(currentPosition+1) % cards.length]
    let stock2 = cards[(currentPosition+2) % cards.length]
    let stock3 = cards[(currentPosition+3) % cards.length]

    let dropDown = undefined
    let overlay = undefined
    if (this.props.isDropDownDisplayed)
    {
      overlay = <View style={styles.overlay} />
      dropDown = <CardDropDown {...stock0} onToggleIsDropDownDisplayed={this.props.onToggleIsDropDownDisplayed}/>
    }

    return (
      <View style={styles.bodyContainer}>
        <View style={styles.responsiveContainer}>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableHighlight style={[styles.button]} underlayColor='#EEE' onPress={() => {this.handleNopePress()}}>
                  <Icon name='close' size={40} style={styles.redText} />
              </TouchableHighlight>
              <Text style={[styles.likeNopeText, styles.redText]}>{stock0.nopes}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight style={[styles.button]} underlayColor='#EEE' onPress={() => {this.handleYupPress()}}>
                  <Icon name='check' size={40} style={styles.greenText}/>
              </TouchableHighlight>
              <Text style={[styles.likeNopeText, styles.greenText]}>{stock0.likes}</Text>
            </View>
          </View>

          <View style={styles.cardsContainer}>
            <Card key={stock3.name} {...stock3} {...card3AnimatedStyles}/>
            <Card key={stock2.name} {...stock2} {...card2AnimatedStyles}/>
            <Card key={stock1.name} {...stock1} {...card1AnimatedStyles}/>
            <Card key={stock0.name} {...stock0} {...card0AnimatedStyles} panResponder={this._panResponder.panHandlers} onToggleIsDropDownDisplayed={this.props.onToggleIsDropDownDisplayed}/>   
          </View>
        </View>
        {overlay}
        {dropDown}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  // main container
  bodyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  // we keep the bottom button sections at height 100
  // the card expands to take up all the rest of the space
  responsiveContainer: {
    flex: 1,
    paddingBottom: 180,
  },

  // text styles for page
  greenText: {
    color: '#00a060',
  },
  redText: {
    color: '#b5173a',
  },

  // cards
  cardsContainer: {
    flex: 1,
  },

  // buttons

  buttonsContainer: {
    height:180,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#CCCCCC',
    borderWidth: 6,
    padding: 8,
    borderRadius: 40,
  },
  likeNopeText: {
    marginTop: 4,
    fontSize: 8,
    fontWeight: 'bold',
  },

});

function mapStateToProps(state) {
  return {cards: state.trending.data, currentPosition: state.uiTrending.currentPosition, isDropDownDisplayed: state.uiTrending.isDropDownDisplayed}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGoTonextStock: (position) => {
      dispatch(incrementTrendingCurrentPosition(position))
    },
    onToggleIsDropDownDisplayed: () => {
      dispatch(toggleIsTrendingDropDownDisplayed())
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Trending);
