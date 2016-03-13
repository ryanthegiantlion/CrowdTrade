'use strict';

import React, { AppRegistry, StyleSheet, Text, View, Animated, Component, PanResponder, Image, TouchableHighlight} from 'react-native';
import clamp from 'clamp';
import Dimensions from 'Dimensions';

var Icon = require('react-native-vector-icons/FontAwesome');
var IconIonicons = require('react-native-vector-icons/Ionicons');

const Stocks = [
  {
    name: 'Anglo American', 
    image: 'http://www.iprocess.co.za/wp-content/uploads/2015/09/anglo.jpg',
    low: 1.01,
    ave: 2.27,
    high: 10.87,
    hasIncreased: false,
    current: 1.05,
    percentageChange: '-90.10%',
    likes: '1.2 K',
    nopes: '112.8 K',
  },
  {
    name: 'Coca Cola', 
    image: 'http://www.picgifs.com/wallpapers/wallpapers/coca-cola/Coca_Cola03.jpg',
    low: 29.01,
    ave: 31.27,
    high: 32.87,
    hasIncreased: true,
    current: 32.21,
    percentageChange: '+0.10%',
    likes: '93.2 K',
    nopes: '11.8 K',
  },
  {
    name: 'Microsoft', 
    image: 'http://research-methodology.net/wp-content/uploads/2015/05/Microsoft-PESTEL-Analysis.jpg',
    low: 80.01,
    ave: 81.57,
    high: 82.87,
    hasIncreased: false,
    current: 80.05,
    percentageChange: '-0.11%',
    likes: '10.2 K',
    nopes: '1.8 K',
  },
  {
    name: 'Amazon', 
    image: 'http://www.authormedia.com/wp-content/uploads/2015/03/amazon.jpg',
    low: 50.05,
    ave: 51.27,
    high: 52.87,
    hasIncreased: false,
    current: 50.51,
    percentageChange: '-0.12%',
    likes: '3.2 K',
    nopes: '12.8 K',
  },
  {
    name: 'Google', 
    image: 'http://www.betches.com/sites/default/files/article/list/images/google.jpg',
    low: 22.05,
    ave: 25.27,
    high: 26.87,
    hasIncreased: true,
    current: 24.41,
    percentageChange: '+0.12%',
    likes: '31.2 K',
    nopes: '32.8 K',
  }
  
]

// How far the swipe need to go for a yes/ no to fire
var SWIPE_THRESHOLD = 120;
// To get the stack effect the lower card must pick out at the bottom and appear smaller
var NEXT_CARD_POSITION_OFFSET = 2;
var NEXT_CARD_SIZE_OFFSET = 8;

class Card extends Component {
  render() {
    let stockTextColor = this.props.hasIncreased ? styles.greenText : styles.redText;
    let stockDiffIcon = this.props.hasIncreased ? 'arrow-up-a' : 'arrow-down-a';

    return (
      <Animated.View style={[styles.cardContainer, this.props.animatedCardContainerStyles]}>
        <Animated.View style={[styles.card, this.props.animatedCardStyles]} {...this.props.panResponder}>
          <Image source={{uri: this.props.image}} style={styles.cardImage} resizeMode={Image.resizeMode.stretch}>
            <Animated.View style={[styles.cardImageTextContainer, styles.cardImageYupContainer, this.props.animatedYupStyles]}>
              <Icon name='close' style={[styles.cardImageText, styles.redText]}/>
            </Animated.View>
            <Animated.View style={[styles.cardImageTextContainer, styles.cardImageNopeContainer, this.props.animatedNopeStyles]}>
              <Icon name='check' style={[styles.cardImageText, styles.greenText]}/>
            </Animated.View>
            <Text style={styles.cardImageName}>
              {this.props.name}
            </Text>
          </Image>
          <View style={styles.cardStockDetailsContainer}>
            <View style={styles.cardStockStatsContainer}>
              <View style={styles.cardStockStatContainer}>
                <Text style={styles.cardStockStatLabel}>
                  LOW
                </Text>
                <Text style={styles.cardStockStat}>
                  {this.props.low}
                </Text>
              </View>
              <View style={styles.cardStockStatContainer}>
                <Text style={styles.cardStockStatLabel}>
                  AVG
                </Text>
                <Text style={styles.cardStockStat}>
                  {this.props.ave}
                </Text>
              </View>
              <View style={styles.cardStockStatContainer}>
                <Text style={styles.cardStockStatLabel}>
                  HIGH
                </Text>
                <Text style={styles.cardStockStat}>
                  {this.props.high}
                </Text>
              </View>
            </View>
            <View style={styles.cardStockDiffContainer}>        
              <IconIonicons name={stockDiffIcon} style={[styles.cardStockDiffImage, stockTextColor]} />
              <View style={styles.cardStockDiffTextContainer}>
                <Text style={[styles.cardStockDiffLabel, stockTextColor]}>
                  KO
                </Text>
                <Text style={[styles.cardStockDiff, stockTextColor]}>
                  {this.props.current}
                </Text>
                <Text style={[styles.cardStockPercentageChange, stockTextColor]}>
                  {this.props.percentageChange}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}

class Trending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      cards: Stocks,
      currentPosition: 0,
    }
  }

  _goTonextStock() {
    let nextPosition = (this.state.currentPosition + 1) % this.state.cards.length
    this.setState({currentPosition: nextPosition});
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
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
        this.state.isUserDragging = true;
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
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
    //this.state.enter.setValue(0);
    this._goTonextStock();
    //this._animateEntrance();
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
    let { pan, cards, currentPosition} = this.state;

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
            <Card key={stock1.name} {...stock1} {...card1AnimatedStyles} />
            <Card key={stock0.name} {...stock0} {...card0AnimatedStyles} panResponder={this._panResponder.panHandlers}/>
          </View>

        </View>   
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

  // we keep the bottom button sections at height 100
  // the card expands to take up all the rest of the space
  responsiveContainer: {
    flex: 1,
    paddingBottom: 150,
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

  cardContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0, 
    right: 0,
    justifyContent: 'flex-end',
  },

  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0, 
    right: 0,
    borderWidth: 1,
    borderColor: '#999',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    shadowRadius: 2,
    shadowColor: '#999',
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },

  cardImage: {
    flex: 1,
  },

  cardImageTextContainer: {
    position: 'absolute',
    opacity: 0,
  },
  cardImageYupContainer : {
    top: 20,
    left: 20,
    transform:[{rotate: '-10deg'}],
  },
  cardImageNopeContainer : {
    top: 20,
    right: 20,
    transform:[{rotate: '10deg'}],
  },
  cardImageText: {
    fontSize: 50,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  cardImageName: {
    color: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(30,30,30,0.8)',
    padding: 4,
    paddingLeft: 8,
  },

  cardStockDetailsContainer: {
    backgroundColor: '#FFF',
    height: 80,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
    //borderBottomWidth: 1,
    //borderColor: '#BBB',
  },
  cardStockStatsContainer: {
    flexDirection: 'row',
    flex: 2,
    borderBottomWidth: 1,
    borderColor: '#BBB',
    alignItems: 'flex-end',
  },
  cardStockStatContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  cardStockStatLabel: {
    fontSize: 7,
    marginRight: 4,
    color: '#666',
    fontWeight: '500',
  },
  cardStockStat: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardStockDiffContainer: {
    flexDirection: 'row',
    flex: 3,  
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStockDiffImage: {
    marginRight: 2,
  },
  cardStockDiffTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    //height: 14,
  },
  cardStockDiffImage: {
    fontSize: 24,
    marginRight: 8,
  },
  cardStockDiffLabel: {
    fontSize: 7,
    marginRight: 2,
    paddingBottom: 2,
  },
  cardStockDiff: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 6,
  },
  cardStockPercentageChange: {
    fontSize: 7,
    alignSelf: 'flex-start',
  },
  
  // buttons

  buttonsContainer: {
    height:150,
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

module.exports = Trending