import React, { StyleSheet, Text, View, Animated, Component, PanResponder, Image, TouchableHighlight} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome');
var IconIonicons = require('react-native-vector-icons/Ionicons');
import CardDropDown from './cardDropDown'

let staticContainer = 'https://s3-eu-west-1.amazonaws.com/crowdtrade-stock-logos/v1/';

class StockStatLineItem extends Component {
  render() {
    let stockTextColor = this.props.hasIncreased ? styles.greenText : styles.redText;
    let stockDiffIcon = this.props.hasIncreased ? 'arrow-up-a' : 'arrow-down-a';

    return (
      <View style={styles.cardStockStatsContainer}>
        <View style={styles.cardStockStatContainer}>
          <Text style={styles.cardStockStatLabel}>
            LOW
          </Text>
          <Text style={styles.cardStockStat}>
            22.05
          </Text>
        </View>
        <View style={styles.cardStockStatContainer}>
          <Text style={styles.cardStockStatLabel}>
            AVG
          </Text>
          <Text style={styles.cardStockStat}>
            25.27
          </Text>
        </View>
        <View style={styles.cardStockStatContainer}>
          <Text style={styles.cardStockStatLabel}>
            HIGH
          </Text>
          <Text style={styles.cardStockStat}>
            26.87
          </Text>
        </View>
      </View>
    );
  }
}

class StockDetails extends Component {
  render() {
    let stockTextColor = this.props.hasIncreased ? styles.greenText : styles.redText;
    let stockDiffIcon = this.props.hasIncreased ? 'arrow-up-a' : 'arrow-down-a';

    return (
      <View style={[styles.cardStockDetailsContainer]}>
        <StockStatLineItem />
        <StockStatLineItem />
        <StockStatLineItem />
        <StockStatLineItem />
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
    );
  }
}

class CardImage extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.cardImage} onPress={this.props.onToggleIsDropDownDisplayed}>
        <Image source={{uri: staticContainer + this.props.image}} style={styles.cardImage} resizeMode={Image.resizeMode.cover}>
          <Animated.View style={[styles.cardImageTextContainer, styles.cardImageYupContainer, this.props.animatedYupStyles]}>
            <Icon name='check' style={[styles.cardImageText, styles.greenText]}/>
          </Animated.View>
          <Animated.View style={[styles.cardImageTextContainer, styles.cardImageNopeContainer, this.props.animatedNopeStyles]}>
            <Icon name='close' style={[styles.cardImageText, styles.redText]}/>
          </Animated.View>
          <Text style={styles.cardImageName}>
            {this.props.name}
          </Text>
        </Image>
      </TouchableHighlight>
    );
  }
}

export default class Card extends Component {
  render() {
    let cardImage=<CardImage {...this.props}/>
    if (this.props.isDropDownDisplayed) {
      cardImage=<CardDropDown {...this.props} onToggleIsDropDownDisplayed={this.props.onToggleIsDropDownDisplayed} news={this.props.news}/>
    }
    return (
      <Animated.View style={[styles.cardContainer, this.props.animatedCardContainerStyles]}>
        <Animated.View style={[styles.card, this.props.animatedCardStyles]} {...this.props.panResponder}>
          <StockDetails {...this.props}/>
          {cardImage}
          <Animated.View style={[styles.stockDetailsPlaceHolder, this.props.animatedStockDetailHeight]}>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({

  // text styles for page
  greenText: {
    color: '#00a060',
  },
  redText: {
    color: '#b5173a',
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
    backgroundColor: 'white',
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

  stockDetailsPlaceHolder: {
    height: 80,
  },
  cardStockDetailsContainer: {
    backgroundColor: '#FFF',
    //height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
    //overflow: 'hidden',
  },
  cardStockStatsContainer: {
    flexDirection: 'row',
    height: 30,
    //flex: 2,
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
    //flex: 3,
    height: 50,
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
});