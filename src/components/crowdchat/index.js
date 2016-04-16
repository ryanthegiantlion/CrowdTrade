'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Search from '../shared/search/index'
import CrowdChatTabBar from './tabBar'
import { connect } from 'react-redux'
var ScrollableTabView = require('react-native-scrollable-tab-view');


class AskContainer extends Component {
  render() {
    // optional submit button . . .
    // <View style={styles.askButtonContainer}><
    //   TouchableHighlight style={styles.askButton}>
    //     <Text style={styles.askButtonText}>Submit</Text>
    //   </TouchableHighlight>
    // </View>
    return (
      <View style={styles.askContainer}>
        <TextInput autoFocus={true} multiline={true} style={styles.askInput} value="Is Facebook going to the gutters ?!?!?"/>  
      </View>
    )
  }
}

class QuestionItem extends Component {
  render() {
    return (
      <View style={styles.questionItemContainer}>
        <Text style={styles.number}>{this.props.id + "."}</Text>
        <View style={styles.titleAndDescriptionContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
        </View>
      </View>
    )
  }
}

class QuestionsContainer extends Component {
  constructor(props) {
    super(props)

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.chats),
    };
  }

  render() {
    return (
      <View style={styles.questionContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <QuestionItem {...rowData} />}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}/>
      </View>
    )
  }
}

class CrowdChat extends Component {

    render() {
      return (
      <View style={styles.bodyContainer}>
        <Search title='Crowd chat' />
        <ScrollableTabView contentProps={{bounces: false}} initialPage={3} renderTabBar={() => <CrowdChatTabBar />}>
          <QuestionsContainer chats={this.props.chats} key="HOT" title='HOT' tabLabel='HOT'/>
          <QuestionsContainer chats={this.props.chats} key="NEW" title='NEW' tabLabel='NEW'/>
          <QuestionsContainer chats={this.props.chats} key="TOP" title='TOP' tabLabel='TOP'/>
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

    askContainer: {
      flex: 1,
    },

    questionsContainer: {
      flex: 1,
    },

    questionItemContainer: {
      flexDirection: 'row',
      padding: 20,

    },

    number: {
      marginRight: 10,
      width: 20,
      fontWeight: 'bold',
    },

    titleAndDescriptionContainer: {
      flex: 1,  
    },

    title: {
      fontWeight: 'bold',
      marginBottom: 10,
    },

    description: {
      color: '#999',
      fontStyle: 'italic',
    },

    separator: {
      height: 2,
      backgroundColor: '#888',
    },

    askInput: {
      //height: 200,
      //width: 40,
      color: '#666',
      fontSize: 14,
      flex: 1,
      margin: 10,
    },

    askButtonContainer: {
      flexDirection: 'row',
    },

    askButton: {
      flex: 1,
      borderWidth: 1,
      margin: 8,
    },

    askButtonText: {
      height: 20,
    },
  });

function mapStateToProps(state) {
  return {
    chats: state.crowdChat.data,
  }
}

module.exports = connect(mapStateToProps)(CrowdChat);