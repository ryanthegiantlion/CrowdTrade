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
  }

  render() {

    let stock0 = this.props.stock
    let stock0News = this.props.news.filter((item) => {return item.symbol == stock0.symbol})

    return (
      <View style={styles.bodyContainer}>
        <View style={styles.header}>
          <TouchableHighlight onPress={() => {this.props.nav.pop()}}>
              <MaterialIcons style={styles.backIcon} name='arrow-back' />
          </TouchableHighlight>
          <Text style={styles.headerName}>{stock0.name}</Text>
        </View>
        <View style={styles.responsiveContainer}>

          <View style={styles.cardsContainer}>
            <Card 
              key={stock0.name} 
              {...stock0} 
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

  // we keep the bottom button sections at height 100
  // the card expands to take up all the rest of the space
  responsiveContainer: {
    flex: 1,
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
