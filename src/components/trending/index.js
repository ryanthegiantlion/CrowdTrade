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
      dropDownOffset: new Animated.Value(0),
      overlay: false,
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
      onMoveShouldSetResponderCapture: () => {
        return !this.props.isDropDownDisplayed
      },
      onMoveShouldSetPanResponderCapture: () => {
        return !this.props.isDropDownDisplayed
      },

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

  componentWillUnmount() {
    if (this.props.isDropDownDisplayed)
    {
      this.props.onToggleIsDropDownDisplayed();
    }
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

  onToggleIsDropDownDisplayed() {
    
    if (this.state.dropDownOffset._value == 0)
    {
      this.setState({overlay:true});
      Animated.timing(this.state.dropDownOffset, {
              toValue: 60,
              duration: 200,
              delay: 100,
        }).start(function() {
          
          this.props.onToggleIsDropDownDisplayed();
        }.bind(this))
    }
    else
    {
      this.setState({overlay:false});
      Animated.timing(this.state.dropDownOffset, {
              toValue: 0,
              duration: 200,
              delay: 100,
        }).start(function() {    
          this.props.onToggleIsDropDownDisplayed();
        }.bind(this))
    }
  }

  render() {
    let { pan, dropDownOffset } = this.state;
    let cards = this.props.cards
    let currentPosition = this.props.currentPosition

    let [translateX, translateY] = [pan.x, pan.y];

    // card 0 animation
    let rotate = pan.x.interpolate({inputRange: [-240, 0, 240], outputRange: ["-30deg", "0deg", "30deg"]});
    let cardBottom = dropDownOffset.interpolate({inputRange: [0, 80], outputRange: [0, -40]})
    let stockDetailHeight = dropDownOffset.interpolate({inputRange: [0, 80], outputRange: [80, 240]})

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}], bottom: cardBottom};
    let animatedStockDetailHeight = {height: stockDetailHeight}

    let yupOpacity = pan.x.interpolate({inputRange: [0, SWIPE_THRESHOLD], outputRange: [0, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-SWIPE_THRESHOLD, 0], outputRange: [1, 0], extrapolate: 'clamp'});
    let animatedNopeStyles = {opacity: nopeOpacity}

    let card0AnimatedStyles = {
      animatedCardStyles: animatedCardStyles,
      animatedNopeStyles: animatedNopeStyles,
      animatedYupStyles: animatedYupStyles,
      animatedStockDetailHeight: animatedStockDetailHeight,
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
    let stock0News = this.props.news.filter((item) => {return item.symbol == stock0.symbol})
    let stock1News = this.props.news.filter((item) => {return item.symbol == stock1.symbol})
    let stock2News = this.props.news.filter((item) => {return item.symbol == stock2.symbol})
    let stock3News = this.props.news.filter((item) => {return item.symbol == stock3.symbol})

    let overlay = undefined
    if (this.state.overlay)
    {
      overlay = <TouchableHighlight underlayColor='rgba(0,0,0,0.5)' style={styles.overlay} onPress={this.onToggleIsDropDownDisplayed.bind(this)}><View style={styles.overlay} /></TouchableHighlight>
    }

    return (
      <View style={styles.bodyContainer}>
        <View style={styles.responsiveContainer}>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableHighlight style={[styles.button]} underlayColor='#EEE' onPress={() => {this.handleNopePress()}}>
                <View style={styles.buttonInnerContainer}>
                  <Text style={[styles.buttonLabel, styles.redText]}>Say No</Text>
                  <Text style={[styles.buttonPercentage, styles.redText]}>{stock0.noPercent}</Text>
                </View>
              </TouchableHighlight>          
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight style={[styles.button]} underlayColor='#EEE' onPress={() => {this.handleYupPress()}}>
                <View style={styles.buttonInnerContainer}>
                  <Text style={[styles.buttonLabel, styles.greenText]}>Say Yes</Text>
                  <Text style={[styles.buttonPercentage, styles.greenText]}>{stock0.yesPercent}</Text>
                </View>
              </TouchableHighlight>    
            </View>
          </View>
          {overlay}

          <View style={styles.cardsContainer}>
            <Card key={stock3.name} {...stock3} {...card3AnimatedStyles} news={stock3News}/>
            <Card key={stock2.name} {...stock2} {...card2AnimatedStyles} news={stock2News}/>
            <Card key={stock1.name} {...stock1} {...card1AnimatedStyles} news={stock1News}/>
            <Card 
              key={stock0.name} 
              {...stock0} 
              {...card0AnimatedStyles} 
              isDropDownDisplayed={this.props.isDropDownDisplayed} 
              dropDownOffset={dropDownOffset} 
              panResponder={this._panResponder.panHandlers} 
              onToggleIsDropDownDisplayed={this.onToggleIsDropDownDisplayed.bind(this)} 
              news={stock0News}/>   
          </View>
        </View>
      </View>
    );
  }
}

// Phone Dimenstions
// iphone 6 667, 375
// iphone 6 plus 736, 414
// iphone 5 568, 320

// My hacky version of media queries
let screenHeight = Dimensions.get('window').height
var buttonContainerHeight = 140
if (screenHeight > 600)
{
  buttonContainerHeight = 170
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
    paddingBottom: buttonContainerHeight,
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
    height: buttonContainerHeight,
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
  buttonLabel: {
    fontSize: 12
  },
  buttonPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    cards: state.trending.data, 
    currentPosition: state.uiTrending.currentPosition, 
    isDropDownDisplayed: state.uiTrending.isDropDownDisplayed,
    news: state.news.data,
  }
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
