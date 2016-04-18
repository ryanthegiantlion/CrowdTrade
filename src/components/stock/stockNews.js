import React, { ListView, StyleSheet, Text, View, Animated, Component, TouchableHighlight, Image} from 'react-native';

import Dimensions from 'Dimensions';
import Linking from 'Linking';
var ScrollableTabView = require('react-native-scrollable-tab-view');

var IconIonicons = require('react-native-vector-icons/Ionicons');

const monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "June", "July",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];

class NewsItem extends Component {
  openNewsItem(url) {
    Linking.openURL(url)
  }

  formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  render() {
    let date = this.formatDate(new Date(this.props.date))
    return (
      <TouchableHighlight onPress={() => {this.openNewsItem(this.props.url)}}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.source}>{this.props.source}</Text>
            <Text style={styles.date}>{date}</Text>
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
        <Text style={styles.heading}>News</Text>
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
  heading: {
    color: 'white',
    fontWeight: 'bold',
    padding: 8,
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
    flex: 1,
    textAlign: 'right',
    color: 'white',
  },
});