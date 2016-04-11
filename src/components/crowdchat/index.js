'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Search from '../shared/search/index'
import CrowdChatTabBar from './tabBar'
var ScrollableTabView = require('react-native-scrollable-tab-view');

class AskContainer extends Component {
  render() {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.tempHeading}>{this.props.title}</Text>
      </View>
    )
  }
}

class QuestionsContainer extends Component {
  render() {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.tempHeading}>{this.props.title}</Text>
      </View>
    )
  }
}

class CrowdChat extends Component {

    render() {
      return (
      <View style={styles.bodyContainer}>
        <Search title='Crowd chat' />
        <ScrollableTabView contentProps={{bounces: false}} initialPage={0} renderTabBar={() => <CrowdChatTabBar />}>
          <QuestionsContainer key="HOT" title='HOT' tabLabel='HOT'/>
          <QuestionsContainer key="NEW" title='NEW' tabLabel='NEW'/>
          <QuestionsContainer key="TOP" title='TOP' tabLabel='TOP'/>
          <AskContainer key="ASK" title='ASK' tabLabel='ASK'/>
        </ScrollableTabView>
      </View>
      );
    }
}

const styles = StyleSheet.create({
    bodyContainer: {
      flex: 1,
      backgroundColor: '#eee',
    },

    questionsContainer: {
      flex: 1,
    },

    tempHeading: {

    },
  });

module.exports = CrowdChat