import React, { ListView, StyleSheet, Text, View, Animated, Component, TouchableHighlight, Image} from 'react-native';

import Dimensions from 'Dimensions';
import Linking from 'Linking';

var IconIonicons = require('react-native-vector-icons/Ionicons');

class NewsItem extends Component {
  openNewsItem(url) {
    Linking.openURL(url)
  }

  render() {
    return (
      <TouchableHighlight onPress={() => {this.openNewsItem(this.props.url)}}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.source}>{this.props.source}</Text>
            <Text style={styles.date}>{this.props.date}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class StockNews extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.news),
    };
  }

  render() {
    let screenwidth = Dimensions.get('window').width;
    return (
      <View style={[styles.stockPerformanceContainer, {width: screenwidth}]}>
        <ListView contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <NewsItem 
          title={rowData.title} 
          description={rowData.description} 
          date={rowData.date} 
          source={rowData.source}
          url={rowData.url}/>}/>
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
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  source: {
    color:'white',
  },
  date: {
    color: 'white',
  },
});