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
} from 'react-native';
import { connect } from 'react-redux'
import Search from '../shared/search/index'
import Linking from 'Linking';


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

class News extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.bodyContainer}>
        <Search title='News' />
        <GridView items={this.props.news} itemsPerRow={2} nav={this.props.nav}/>
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
});

function mapStateToProps(state) {
  return {news: state.news.data}
}

module.exports = connect(mapStateToProps)(News);
