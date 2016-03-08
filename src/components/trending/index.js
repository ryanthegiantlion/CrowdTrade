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

// The card area expands to take up the space not used but the button area
var SWIPE_THRESHOLD = 120;

class Trending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(1),
      nextCardOpacity: new Animated.Value(1),
      currentStock: Stocks[0],
      nextStock: Stocks[1],
      isUserDragging: false,
    }
  }

  _goTonextStock() {
    let currentStockIdx = Stocks.indexOf(this.state.currentStock);
    let newIdx = (currentStockIdx + 1) > Stocks.length - 1 ? 0 : (currentStockIdx + 1);
    let nextStockIdx = (newIdx + 1) > Stocks.length - 1 ? 0 : (newIdx + 1)

    this.setState({
      currentStock: Stocks[newIdx],
      nextStock: Stocks[nextStockIdx]
    });
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
    let { pan, enter, nextCardOpacity, currentStock, nextStock} = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let animatedYupStyles = {opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let animatedNopeStyles = {opacity: nopeOpacity}

    let currentStockTextColor = currentStock.hasIncreased ? styles.greenText : styles.redText;
    let nextStockTextColor = nextStock.hasIncreased ? styles.greenText : styles.redText;
    
    let currentStockDiffIcon = currentStock.hasIncreased ? 'arrow-up-a' : 'arrow-down-a';
    let nextStockDiffIcon = nextStock.hasIncreased ? 'arrow-up-a' : 'arrow-down-a';
    
    // the rendering here is quite tricky. it was tricky getting all three correct at the same time . . .

    // 1. the card should always appear on top when being dragged so needs to be rendered near the end 
    // (at least after the buttons)
    // 2. the layout should be responsive
    // 3. the buttons need to work ofc - we have to be careful about rendering a view on top of them

    return (
      <View style={styles.bodyContainer}>
        <View style={styles.responsiveContainer}>

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableHighlight style={[styles.button]} underlayColor='#EEE' onPress={() => {this.handleNopePress()}}>
                  <Icon name='close' size={40} style={styles.redText} />
              </TouchableHighlight>
              <Text style={[styles.likeNopeText, styles.redText]}>{this.state.currentStock.nopes}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight style={[styles.button]} underlayColor='#EEE' onPress={() => {this.handleYupPress()}}>
                  <Icon name='check' size={40} style={styles.greenText}/>
              </TouchableHighlight>
              <Text style={[styles.likeNopeText, styles.greenText]}>{this.state.currentStock.likes}</Text>
            </View>
          </View>

          <View style={styles.cardsContainer}>
            <Animated.View key={this.state.nextStock.name} style={[styles.card]}>
              <Image source={{uri: this.state.nextStock.image}} style={styles.cardImage}>
                <Animated.View style={[styles.cardImageTextContainer, styles.cardImageYupContainer]}>
                  <Text style={[styles.cardImageText, styles.cardImageYupText]}>LOVE</Text>
                </Animated.View>
                <Animated.View style={[styles.cardImageTextContainer, styles.cardImageNopeContainer]}>
                  <Text style={[styles.cardImageText, styles.cardImageNopeText]}>NEIN</Text>
                </Animated.View>
                <Text style={styles.cardImageName}>
                  {this.state.nextStock.name}
                </Text>
              </Image>
              <View style={styles.cardStockDetailsContainer}>
                <View style={styles.cardStockStatsContainer}>
                  <View style={styles.cardStockStatContainer}>
                    <Text style={styles.cardStockStatLabel}>
                      LOW
                    </Text>
                    <Text style={styles.cardStockStat}>
                      {this.state.nextStock.low}
                    </Text>
                  </View>
                  <View style={styles.cardStockStatContainer}>
                    <Text style={styles.cardStockStatLabel}>
                      AVG
                    </Text>
                    <Text style={styles.cardStockStat}>
                      {this.state.nextStock.ave}
                    </Text>
                  </View>
                  <View style={styles.cardStockStatContainer}>
                    <Text style={styles.cardStockStatLabel}>
                      HIGH
                    </Text>
                    <Text style={styles.cardStockStat}>
                      {this.state.nextStock.high}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardStockDiffContainer}>        
                  <IconIonicons name={nextStockDiffIcon} style={[styles.cardStockDiffImage, nextStockTextColor]} />
                  <View style={styles.cardStockDiffTextContainer}>
                    <Text style={[styles.cardStockDiffLabel, nextStockTextColor]}>
                      KO
                    </Text>
                    <Text style={[styles.cardStockDiff, nextStockTextColor]}>
                      {this.state.nextStock.current}
                    </Text>
                    <Text style={[styles.cardStockPercentageChange, nextStockTextColor]}>
                      {this.state.nextStock.percentageChange}
                    </Text>
                  </View>
                </View>
              </View>
            </Animated.View>
            <Animated.View key={this.state.currentStock.name} style={[styles.card, animatedCardStyles]} {...this._panResponder.panHandlers}>
              <Image source={{uri: this.state.currentStock.image}} style={styles.cardImage}>
                <Animated.View style={[styles.cardImageTextContainer, styles.cardImageYupContainer, animatedYupStyles]}>
                  <Icon name='close' style={[styles.cardImageText, styles.redText]}/>
                </Animated.View>
                <Animated.View style={[styles.cardImageTextContainer, styles.cardImageNopeContainer, animatedNopeStyles]}>
                  <Icon name='check' style={[styles.cardImageText, styles.greenText]}/>
                </Animated.View>
                <Text style={styles.cardImageName}>
                  {this.state.currentStock.name}
                </Text>
              </Image>
              <View style={styles.cardStockDetailsContainer}>
                <View style={styles.cardStockStatsContainer}>
                  <View style={styles.cardStockStatContainer}>
                    <Text style={styles.cardStockStatLabel}>
                      LOW
                    </Text>
                    <Text style={styles.cardStockStat}>
                      {this.state.currentStock.low}
                    </Text>
                  </View>
                  <View style={styles.cardStockStatContainer}>
                    <Text style={styles.cardStockStatLabel}>
                      AVG
                    </Text>
                    <Text style={styles.cardStockStat}>
                      {this.state.currentStock.ave}
                    </Text>
                  </View>
                  <View style={styles.cardStockStatContainer}>
                    <Text style={styles.cardStockStatLabel}>
                      HIGH
                    </Text>
                    <Text style={styles.cardStockStat}>
                      {this.state.currentStock.high}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardStockDiffContainer}>        
                  <IconIonicons name={currentStockDiffIcon} style={[styles.cardStockDiffImage, currentStockTextColor]} />
                  <View style={styles.cardStockDiffTextContainer}>
                    <Text style={[styles.cardStockDiffLabel, currentStockTextColor]}>
                      KO
                    </Text>
                    <Text style={[styles.cardStockDiff, currentStockTextColor]}>
                      {this.state.currentStock.current}
                    </Text>
                    <Text style={[styles.cardStockPercentageChange, currentStockTextColor]}>
                      {this.state.currentStock.percentageChange}
                    </Text>
                  </View>
                </View>
              </View>
            </Animated.View>
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

  card: {
    position: 'absolute',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0, 
    right: 0,
    borderWidth: 1,
    borderColor: '#BBB',
    shadowRadius: 2,
    shadowColor: '#BBB',
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