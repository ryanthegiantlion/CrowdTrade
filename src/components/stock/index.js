'use strict';

import React, { AppRegistry, StyleSheet, Text, View, Animated, Component, PanResponder, Image, TouchableHighlight} from 'react-native';
import clamp from 'clamp';
import Dimensions from 'Dimensions';

var Icon = require('react-native-vector-icons/FontAwesome');
var IconIonicons = require('react-native-vector-icons/Ionicons');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
import { connect } from 'react-redux'
import { incrementTrendingCurrentPosition, toggleIsTrendingDropDownDisplayed } from '../../store/actions'
import Card from './card'
import CardDropDown from './cardDropDown'

// How far the swipe need to go for a yes/ no to fire
var SWIPE_THRESHOLD = 120;
// To get the stack effect the lower card must pick out at the bottom and appear smaller
var NEXT_CARD_POSITION_OFFSET = 2;
var NEXT_CARD_SIZE_OFFSET = 8;

class Stock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      dropDownOffset: new Animated.Value(120),
      overlay: false,
    }
  }

  componentDidMount() {
  }

  componentWillMount() {
  }
    
  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.props.onGoTonextStock((this.props.currentPosition+1)%this.props.cards.length);
  }

  onToggleIsDropDownDisplayed() {
    this.props.onToggleIsDropDownDisplayed();
    if (this.state.dropDownOffset._value == 0)
    {
      Animated.timing(this.state.dropDownOffset, {
              toValue: 120,
              duration: 200,
              delay: 100,
        }).start(function() {this.setState({overlay:true});}.bind(this))
    }
    else
    {
      Animated.timing(this.state.dropDownOffset, {
              toValue: 0,
              duration: 200,
              delay: 100,
        }).start(function() {this.setState({overlay:false});}.bind(this))
    }
  }

  render() {
    let { pan, dropDownOffset } = this.state;
    let cards = this.props.cards
    let currentPosition = this.props.currentPosition

    let [translateX, translateY] = [pan.x, pan.y];

    // card 0 animation
    let rotate = pan.x.interpolate({inputRange: [-240, 0, 240], outputRange: ["-30deg", "0deg", "30deg"]});
    let cardBottom = dropDownOffset.interpolate({inputRange: [0, 80], outputRange: [0, -50]})
    let stockDetailHeight = dropDownOffset.interpolate({inputRange: [0, 80], outputRange: [80, 184]})

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

    let stock0 = this.props.stock
    let stock0News = this.props.news.filter((item) => {return item.symbol == stock0.symbol})

    let overlay = undefined
    if (this.state.overlay)
    {
      overlay = <TouchableHighlight underlayColor='rgba(0,0,0,0.5)' style={styles.overlay} onPress={this.onToggleIsDropDownDisplayed.bind(this)}><View style={styles.overlay} /></TouchableHighlight>
    }

    return (
      <View style={styles.bodyContainer}>
        <View style={styles.header}>
          <TouchableHighlight onPress={() => {this.props.nav.pop()}}>
              <MaterialIcons style={styles.backIcon} name='arrow-back' />
          </TouchableHighlight>
          <Text style={styles.headerName}>{stock0.name}</Text>
        </View>
        <View style={styles.responsiveContainer}>
          {overlay}

          <View style={styles.cardsContainer}>
            <Card 
              key={stock0.name} 
              {...stock0} 
              {...card0AnimatedStyles} 
              isDropDownDisplayed={this.props.isDropDownDisplayed} 
              dropDownOffset={dropDownOffset} 
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
    backgroundColor: 'black',
    paddingTop: 16,
  },

  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },

  headerName: {
    flex: 1,
    fontSize: 20,
    color: 'white',
  },

  backIcon: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
    marginRight: 10,
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
    backgroundColor: 'white',
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
  likeNopeText: {
    marginTop: 4,
    fontSize: 8,
    fontWeight: 'bold',
  },

});

function mapStateToProps(state, props) {
  console.log(props.symbol)
  return {
    stock: state.trending.data.filter((item) => item.symbol == props.symbol)[0], 
    currentPosition: state.uiTrending.currentPosition, 
    isDropDownDisplayed: true,
    news: state.news.data,
  }
}

module.exports = connect(mapStateToProps)(Stock);
