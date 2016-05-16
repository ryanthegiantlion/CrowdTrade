'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Search from '../shared/search/index'
import CrowdChatTabBar from './tabBar'
import { connect } from 'react-redux'
import { addQuestion, addComment } from '../../store/actions'
var ScrollableTabView = require('react-native-scrollable-tab-view');
var Icon = require('react-native-vector-icons/FontAwesome');


class AskContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      askText: '',
    };
  }

  onAddQuestion()
  {
    this.props.onAddQuestion(this.state.askText);
    this.setState({askText: ''})
  }

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
        <TextInput
          value={this.state.askText}
          onChangeText={(text) => this.setState({askText: text})} 
          placeholder="Is Facebook going to the gutters ?!?!?" 
          multiline={true} 
          style={styles.askInput}/>  
        <TouchableOpacity style={styles.askButton} onPress={() => this.onAddQuestion()}>
          <View style={{flex: 1}}><Text style={styles.askButtonText}>Submit</Text></View>
        </TouchableOpacity>
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
  constructor(props) {
    super(props)

    this.state = {
      comment: '',
    };
  }

  onAddComment()
  {
    console.log('on add comment');
    this.props.onAddComment(this.state.comment);
    this.setState({comment: ''})
  }

  render() {
    let answerItems = this.props.answers.map((item) => <AnswerItem key={item.id} comment={item.comment} date={item.date} />);
    return (
      <View style={styles.answersContainer}>
        {answerItems}
        <View style={styles.commentInputContainer}>
          <TextInput 
            value={this.state.comment}
            onChangeText={(text) => this.setState({comment: text})} 
            placeholder="Post your comment" 
            multiline={true} 
            style={styles.commentInput}/>
          <TouchableOpacity style={styles.commentButton} onPress={() => this.onAddComment()}><View style={{flex:1}}><Text style={styles.commentButtonText}>Post</Text></View></TouchableOpacity>
        </View>
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
    this.setState({isExpanded: !this.state.isExpanded})
  }

  render() {
    let description = undefined
    let answers = undefined
    let separator = undefined
    
    if (this.state.isExpanded) {
      answers = <AnswersContainer onAddComment={(text) => this.props.onAddComment(this.props.id, text)} answers={this.props.answers} />
      description = <Text style={styles.description}>{this.props.description}</Text>
      
      if (this.props.description) {
        separator = <View style={styles.questionAnswerSeparator}></View>
      }
    }
    else if (this.props.description) {
      description = <Text style={styles.description}>{this.props.description.substring(0, 100) + "..."}</Text>
    }
    return (
      <TouchableHighlight onPress={() => this.toggleItem()} underlayColor="rgba(0,0,0,0.3)">
        <View style={styles.questionItemContainer}>
          <Text style={styles.number}>{this.props.rowID + "."}</Text>
          <View style={styles.titleAndDescriptionContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
            {description}
            {separator}
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

    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    // this.state = {
    //   dataSource: ds.cloneWithRows(this.props.chats),
    // };
  }

  render() {
    return (
      <View style={styles.questionsContainer}>
        <ListView
          keyboardShouldPersistTaps={true}
          dataSource={this.props.chats}
          renderRow={(rowData, sectionID, rowID) => <QuestionItem onAddComment={this.props.onAddComment} rowID={parseInt(rowID)+1} {...rowData} />}
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
      <ScrollableTabView contentProps={{bounces: false, keyboardShouldPersistTaps: true}} initialPage={0} renderTabBar={() => <CrowdChatTabBar />}>
        <QuestionsContainer onAddComment={this.props.onAddComment} chats={this.props.chats} key="HOT" title='HOT' tabLabel='HOT'/>
        <QuestionsContainer onAddComment={this.props.onAddComment} chats={this.props.newChats} key="NEW" title='NEW' tabLabel='NEW'/>
        <QuestionsContainer onAddComment={this.props.onAddComment} chats={this.props.chats} key="TOP" title='TOP' tabLabel='TOP'/>
        <AskContainer onAddQuestion={this.props.onAddQuestion} key="ASK" title='ASK' tabLabel='ASK'/>
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

    questionAnswerSeparator: {
      height: 1,
      backgroundColor: '#AAA',
      marginBottom: 10,
      marginTop: 10,
    },

    askInput: {
      //height: 200,
      //width: 40,
      color: '#666',
      fontSize: 14,
      flex: 1,
      margin: 10,
    },

    commentInputContainer: {
      borderColor: '#CCC',
      borderWidth: 1,
      borderRadius: 4,
    },

    commentInput: {
      padding: 2,
      //borderWidth: 1,
      height: 30,
      fontSize: 14,
      //borderColor: '#CCC',
      //borderRadius: 4,
    },

    commentButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#CCC',
      borderWidth: 1,
      borderRadius: 4,
    },
    commentButtonText: {
      marginTop: 4,
      marginRight: 8,
      marginLeft: 8,
    },

    likeAndDateContainer: {
      flexDirection: 'row',
    },

    askButtonContainer: {
      
    },

    askButton: {
      flexDirection: 'row',
      borderWidth: 1,
      margin: 10,
      height: 28,
      padding: 4,
      borderRadius: 4,
    },

    askButtonText: {
      flex: 1,
      textAlign: 'center',
    },
  });

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

function mapStateToProps(state) {
  if (state.ui.searchFilter.length == 0) {
    return {
      chats: dataSource.cloneWithRows(state.crowdChat.data.filter((item) => !item.isNew)),
      newChats: dataSource.cloneWithRows(state.crowdChat.data.filter((item) => item.isNew))
    }
  } else {
    return {
      chats: dataSource.cloneWithRows(state.crowdChat.data.filter((item) => !item.isNew && item.title.toLowerCase().indexOf(state.ui.searchFilter.toLowerCase()) != -1)),
      newChats: dataSource.cloneWithRows(state.crowdChat.data.filter((item) => item.isNew && item.title.toLowerCase().indexOf(state.ui.searchFilter.toLowerCase()) != -1))
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddQuestion: (text) => {
      dispatch(addQuestion(text))
    },
    onAddComment: (questionId, text) => {
      dispatch(addComment(questionId, text))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(CrowdChat);