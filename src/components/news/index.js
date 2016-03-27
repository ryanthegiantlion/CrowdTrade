'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  Image,
  Dimensions,
  Animated,
  WebView,
} from 'react-native';
import { connect } from 'react-redux'
import Search from '../shared/search/index'
import Linking from 'Linking';
var ScrollableTabView = require('react-native-scrollable-tab-view');


const itemWidth = 100
let screenWidth = Dimensions.get('window').width
let imageDimension = screenWidth/2-8

class RowItem extends Component {
  onClick(url) {
    Linking.openURL(url)
  }
  
  render() {
    console.log(this.props.newsItem.image)
    return (
      <TouchableHighlight style={styles.newsButton} onPress={() => this.onClick(this.props.newsItem.url)}>
        <View style={styles.imageContainer}>  
          <Image source={{uri: this.props.newsItem.image}} style={styles.newsImage} resizeMode={Image.resizeMode.cover} />
          <Text style={styles.name}>{this.props.newsItem.symbol}</Text>
          <Text numberOfLines={2} style={styles.title}>{this.props.newsItem.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class GridView extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items),
    };
  }

  render() {
    
    var containerDimensions = Math.floor(screenWidth/ this.props.itemsPerRow)

    return (
      <ListView contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <View style={[styles.itemContainer, {width: containerDimensions, height: containerDimensions}]}><RowItem nav={this.props.nav} newsItem={rowData}/></View>}/>
    );
  }
}

class RowItem2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      rotate: new Animated.Value(0),
      shift: new Animated.ValueXY(), // inits to zero
      test: new Animated.Value(0),
    }
  }

  onClick(url) {
    this.refs.card.measure(this.animate.bind(this))
    
  }

  animate(ox, oy, width, height, px, py) {
    this.setState({url: 'https://facebook.github.io/react/', isInFront: true})
    // Animated.timing(this.state.rotate, {
    //         toValue: 180,
    //         duration: 2000,
    //   }).start()
    console.log("ox: " + ox);
    console.log("oy: " + oy);
    console.log("width: " + width);
    console.log("height: " + height);
    console.log("px: " + px);
    console.log("py: " + py);
    Animated.timing(
           this.state.shift,         // Auto-multiplexed
           {toValue: {x: 100, y: 200}, duration: 5000} // Back to zero
         ).start(console.log('done shifting'));
    // Animated.timing(this.state.test, {
    //         toValue: 180,
    //         duration: 2000,
    //   }).start(console.log('done shifting'))
  }
  
  render() {
    let {rotate, shift, test} = this.state
    let card1RotateY = rotate.interpolate({inputRange: [0, 180], outputRange: ["0deg", "180deg"]});
    let card2RotateY = rotate.interpolate({inputRange: [0, 180], outputRange: ["180deg", "360deg"]});
    var card1AnimatedStyles = {transform: [{perspective: 1000},{rotateY: card1RotateY}, {translateX: test}, {translateY: shift.y}]}
    var card2AnimatedStyles = {transform: [{perspective: 1000}, {rotateY: card2RotateY}]}
    let source = undefined
    if (this.state.url)
    {
      source = {source:{uri: this.state.url}}
    }
    
    return (
      <TouchableHighlight ref="card" style={styles.newsButton} onPress={() => this.onClick(this.props.newsItem.url)}>
        <View style={styles.imageContainer}>
          <Animated.View style={[styles.card2, card2AnimatedStyles]}>
            <View style={{flex:1}}>
              <WebView
                style={{
                  flex: 1
                }}
                {...source}
                scalesPageToFit={true}/>
            </View>
          </Animated.View> 
          <Animated.View style={[styles.card1, card1AnimatedStyles]}>
            <View style={styles.imageContainer}>
              <Image source={{uri: this.props.newsItem.image}} style={styles.newsImage} resizeMode={Image.resizeMode.cover} />
              <Text style={styles.name}>{this.props.newsItem.symbol}</Text>
              <Text numberOfLines={2} style={styles.title}>{this.props.newsItem.title}</Text>
            </View>
          </Animated.View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class GridView2 extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items),
    };
  }

  render() {
    
    var containerDimensions = Math.floor(screenWidth/ this.props.itemsPerRow)

    return (
      <ListView contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <View style={[styles.itemContainer, {width: containerDimensions, height: containerDimensions}]}><RowItem2 nav={this.props.nav} newsItem={rowData}/></View>}/>
    );
  }
}

class News extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.bodyContainer}>
        <Search title='News' />
        
        <ScrollableTabView contentProps={{bounces: false}} initialPage={0}>
          <GridView items={this.props.news} itemsPerRow={2} nav={this.props.nav} key="ANIMATION1" tabLabel="Animation 1"/>
          <GridView2 items={this.props.news} itemsPerRow={2} nav={this.props.nav} key="ANIMATION2" tabLabel="Animation 2"/>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  listContainer: { 
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsButton: {
    height: imageDimension,
    width: imageDimension,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 2,
    shadowColor: '#AAA',
    //shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  imageContainer: {
    flex: 1,
  },
  newsImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  name: {
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(30,30,30,0.8)',
    padding: 4,
    paddingLeft: 8,
  },
  title: {
    color: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(30,30,30,0.8)',
    padding: 4,
    paddingLeft: 8,
  },
  card1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
    backfaceVisibility: 'hidden',
  },
  card2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, 
  },
});

function mapStateToProps(state) {
  return {news: state.news.data}
}

module.exports = connect(mapStateToProps)(News);
