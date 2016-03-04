'use strict';

import React, { AppRegistry, StyleSheet, Text, View, Animated, Component, PanResponder, Image, TouchableHighlight} from 'react-native';
import clamp from 'clamp';
import Dimensions from 'Dimensions';

var Icon = require('react-native-vector-icons/FontAwesome');

const Persons = [
  {name: 'Barrack Obama', image: 'https://pbs.twimg.com/profile_images/451007105391022080/iu1f7brY_400x400.png'},
  {name: 'Albert Einstein', image: 'http://www.deism.com/images/Einstein_laughing.jpeg'},
  {name: 'The Beast', image: 'http://vignette2.wikia.nocookie.net/marveldatabase/images/4/43/Henry_McCoy_(Earth-10005)_0002.jpg/revision/latest?cb=20091116202257'},
  {name: 'Me', image: 'https://avatars0.githubusercontent.com/u/1843898?v=3&s=460'}
]

var SWIPE_THRESHOLD = 120;
var CARD_WIDTH = 310
var CARD_HEIGHT = 400
var CARD_LABEL_SIZE = 40

class Trending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(1),
      nextCardOpacity: new Animated.Value(1),
      currentPerson: Persons[0],
      nextPerson: Persons[1],
      isUserDragging: false,
    }
  }

  _goToNextPerson() {
    let currentPersonIdx = Persons.indexOf(this.state.currentPerson);
    let newIdx = (currentPersonIdx + 1) > Persons.length - 1 ? 0 : (currentPersonIdx + 1);
    let nextPersonIdx = (newIdx + 1) > Persons.length - 1 ? 0 : (newIdx + 1)

    this.setState({
      currentPerson: Persons[newIdx],
      nextPerson: Persons[nextPersonIdx]
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
        console.log('release');
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
    this._goToNextPerson();
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
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let animatedYupStyles = {opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let animatedNopeStyles = {opacity: nopeOpacity}

    return (
      <View style={styles.container}>
        <View style={styles.cardsContainer}>

          <Animated.View key={this.state.nextPerson.name} style={[styles.card]}>
            <Image source={{uri: this.state.nextPerson.image}} style={styles.cardImage}>
              <Animated.View style={[styles.cardYupContainer]}>
                <Text style={styles.cardYupText}>LOVE</Text>
              </Animated.View>
              <Animated.View style={[styles.cardNopeContainer]}>
                <Text style={styles.cardNopeText}>NEIN</Text>
              </Animated.View>
            </Image>
            <View style={styles.cardLabelContainer}>
              <Text style={styles.name}>{this.state.nextPerson.name}</Text>
              <Text style={styles.value}>100$</Text>
            </View>
          </Animated.View>

          <Animated.View key={this.state.currentPerson.name} style={[styles.card, animatedCardStyles]} {...this._panResponder.panHandlers}>
            <Image source={{uri: this.state.currentPerson.image}} style={styles.cardImage}>
              <Animated.View style={[styles.cardYupContainer, animatedYupStyles]}>
                <Text style={styles.cardYupText}>LOVE</Text>
              </Animated.View>
              <Animated.View style={[styles.cardNopeContainer, animatedNopeStyles]}>
                <Text style={styles.cardNopeText}>NEIN</Text>
              </Animated.View>
            </Image>
            <View style={styles.cardLabelContainer}>
              <Text style={styles.name}>{this.state.currentPerson.name}</Text>
              <Text style={styles.value}>100$</Text>
            </View>
          </Animated.View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonNopeContainer}>
            <TouchableHighlight style={styles.buttonNope} onPress={() => {this.handleNopePress()}}>
                <Icon name="remove" size={24} color="red" />
            </TouchableHighlight>
          </View>
          <View style={styles.buttonYupContainer}>
            <TouchableHighlight style={styles.buttonYup} onPress={() => {this.handleYupPress()}}>
                <Icon name="check" size={24} color="green" />
            </TouchableHighlight>
          </View>
        </View>
        
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardsContainer: {
    marginTop: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderColor: '#AAA',
    borderWidth: 2,
    //borderRadius: 3,
    //shadowOpacity: 0.1,
    //shadowRadius: 1
    overflow: 'hidden', // TODO: Work out why image is overflowing div
    borderRadius: 8,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cardImage: {
    width: CARD_WIDTH - 4,  // TODO: Work out why image is overflowing div
    height: CARD_HEIGHT - CARD_LABEL_SIZE,
    borderRadius: 4,
    //borderTopLeftRadius: 4,
    //borderTopRightRadius: 4,
  },
  nextCard: {
    position: 'absolute',
    top: 0,
  },
  cardYupContainer : {
    position: 'absolute',
    top: 40,
    left: 40,
    transform:[{rotate: '-20deg'}],
    borderColor: 'green',
    borderWidth: 3,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 4,
    opacity: 0,
  },
  cardNopeContainer : {
    position: 'absolute',
    top: 40,
    right: 40,
    transform:[{rotate: '20deg'}],
    borderColor: 'red',
    borderWidth: 3,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 4,
    opacity: 0,
  },
  cardNopeText: {
    fontSize: 40,
    color: 'red',
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
  },
  cardYupText: {
    fontSize: 40,
    color: 'green',
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
  },
  cardLabelContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: CARD_LABEL_SIZE - 4,
    justifyContent: 'center',
    borderColor: "#999",
    borderRadius: 4,
    borderBottomWidth: 2,
  },
  name: {
    marginLeft: 8,
    marginTop: 8,
    fontWeight: 'bold',
    color: '#999',
    //position: 'absolute',
    //left:8,
    //top:8,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    marginTop: 8,
    marginRight: 8,
    fontWeight: 'bold',
    color: '#999',
    //position: 'absolute',
    //right: 8,
    //top: 8,
  },

  // buttons
  buttonContainer: {
    height: 60,
    width: CARD_WIDTH,
    //width: CARD_WIDTH,
    //flexDirection: 'row',
    //alignItems: 'flex-start',
  },
  buttonNopeContainer: {
  },
  buttonYupContainer: {
    //flex: 1,
    
  },
  buttonNope: {
    borderColor: '#CCC',
    borderWidth: 4,
    padding: 8,
    borderRadius: 40,
    position: 'absolute', // TODO learn how to use flexbox properly
    top: 10,
    left: 10,
    width: 80,
    height: 80,
    alignItems: 'center',
  },
  buttonYup: {
    borderColor: '#CCC',
    borderWidth: 4,
    padding: 8,
    borderRadius: 40,
    position: 'absolute', // TODO learn how to use flexbox properly
    top: 10,
    right: 10,
    width: 80,
    height: 80,
    alignItems: 'center',
  },
});

module.exports = Trending