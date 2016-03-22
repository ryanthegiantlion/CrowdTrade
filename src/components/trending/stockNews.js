import React, { ListView, StyleSheet, Text, View, Animated, Component, TouchableHighlight, Image} from 'react-native';

import Dimensions from 'Dimensions';
import Linking from 'Linking';

var IconIonicons = require('react-native-vector-icons/Ionicons');

class NewsItem extends Component {
  openNewsItem() {
    Linking.openURL("http://finance.yahoo.com/news/smaller-iphone-expected-monday-apple-070343620.html")
  }

  render() {
    return (
      <TouchableHighlight onPress={() => {this.openNewsItem()}}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class StockNews extends Component {
  constructor(props) {
    super(props);

    var newsItem = {title: 'Some Title', description: 'some description'}
    newsItems = []
    newsItems.push(newsItem)
    newsItems.push(newsItem)
    newsItems.push(newsItem)
    newsItems.push(newsItem)
    newsItems.push(newsItem)
    newsItems.push(newsItem)
    newsItems.push(newsItem)
    newsItems.push(newsItem)
    newsItems.push(newsItem)
    newsItems.push(newsItem)

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(newsItems),
    };
  }

  render() {
    let screenwidth = Dimensions.get('window').width;
    return (
      <View style={[styles.stockPerformanceContainer, {width: screenwidth}]}>
        <ListView contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <NewsItem title={rowData.title} description={rowData.description}/>}/>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  stockPerformanceContainer: {
    backgroundColor: 'black',
    height: 400,
  },
  itemContainer: {
    padding: 8,
    borderTopColor: '#333',
    borderWidth: 1,
  },
  title: {
    color: 'white',
  },
  description: {
    color: 'white',
  },
});