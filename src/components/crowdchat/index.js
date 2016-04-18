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
var Icon = require('react-native-vector-icons/FontAwesome');


class AskContainer extends Component {
  render() {
    // optional submit button . . .
    // <View style={styles.askButtonContainer}><
    //   TouchableHighlight style={styles.askButton}>
    //     <Text style={styles.askButtonText}>Submit</Text>
    //   </TouchableHighlight>
    // </View>
    // autoFocus={true}
    return (
      <View style={styles.askContainer}>
        <TextInput placeholder="Is Facebook going to the gutters ?!?!?" multiline={true} style={styles.askInput}/>  
      </View>
    )
  }
}

class AnswerItem extends Component {
  render() {
    return (
      <View style={styles.answerItemContainer}>
        <Text style={styles.answer}>{this.props.comment}</Text>
        <View style={styles.likeAndDateContainer}>
          <TouchableHighlight underlayColor="rgba(0,0,0,0.3)"><Icon style={styles.like} name='thumbs-up' size={12} /></TouchableHighlight>
          <Text style={styles.date}>{this.props.date}</Text>
        </View>
      </View>
    )
  }
}

class AnswersContainer extends Component {
  render() {
    let answerItems = this.props.answers.map((item) => <AnswerItem key={item.id} comment={item.comment} date={item.date} />);
    return (
      <View style={styles.answersContainer}>
        {answerItems}
      </View>
    )
  }
}

class QuestionItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false,
    };
  }

  toggleItem() {
    console.log("fgdgd dfgd fdg dfg ")
    this.setState({isExpanded: !this.state.isExpanded})
  }

  render() {
    let description = <Text style={styles.description}>{this.props.description}</Text>
    let answers = undefined
    if (this.state.isExpanded) {
      description = undefined
      answers = <AnswersContainer answers={this.props.answers} />
    } 
    return (
      <TouchableHighlight onPress={() => this.toggleItem()} underlayColor="rgba(0,0,0,0.3)">
        <View style={styles.questionItemContainer}>
          <Text style={styles.number}>{this.props.id + "."}</Text>
          <View style={styles.titleAndDescriptionContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
            {description}
            {answers}
          </View>
        </View>
      </TouchableHighlight>
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
      <View style={styles.questionsContainer}>
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
        <ScrollableTabView contentProps={{bounces: false}} initialPage={0} renderTabBar={() => <CrowdChatTabBar />}>
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

    answerItemContainer: {
      marginBottom: 12,
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
      fontSize: 16,
    },

    description: {
      color: '#999',
      fontStyle: 'italic',
      fontSize: 14,
    },

    answer: {
      color: '#999',
      fontSize: 14,
      marginBottom: 5,
    },

    like: {
      color: '#5890ff',
      marginRight: 10,
    },

    date: {
      color: '#999',
      fontSize: 14,
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

    likeAndDateContainer: {
      flexDirection: 'row',
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