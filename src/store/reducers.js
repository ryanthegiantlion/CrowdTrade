import { combineReducers } from 'redux'
import * as actions from './actions';

function ui(state={isMenuShowing: false, currentRoute: 'trending', searchFilter: ''}, action) {
  switch (action.type) {
    case actions.TOGGLE_MENU:
      return {
        isMenuShowing: !state.isMenuShowing,
        currentRoute: state.currentRoute,
        searchFilter: state.searchFilter
      }
    case actions.CHANGE_ROUTE:
      return {
        isMenuShowing: false,
        currentRoute: action.route,
        searchFilter: state.searchFilter
      }
    case actions.UPDATE_SEARCH_FILTER: 
      return {
        isMenuShowing: state.isMenuShowing,
        currentRoute: state.currentRoute,
        searchFilter: action.text
      }
    default:
      return state
  }
}

function uiTrending(state={currentPosition: 0, isDropDownDisplayed: false}, action) {
  switch (action.type) {
    case actions.INCREMENT_TRENDING_CURRENT_POSITION:
      return {
        isDropDownDisplayed: state.isDropDownDisplayed,
        currentPosition: action.position 
      }
    case actions.TOGGLE_IS_TRENDING_DROPDOWN_DISPLAYED:
      return {
        isDropDownDisplayed: !state.isDropDownDisplayed,
        currentPosition: state.currentPosition
      }
    default:
      return state
  }
}

function trending(state={data: [], currentPosition: 0}, action) {
  return state
}

function watchList(state={data: []}, action) {
  return state
}

function news(state={data: []}, action) {
  return state
}

function featuredNews(state={data: []}, action) {
  return state
}

// "id": 5,
//     "isNew": false, 
//     "title": "Who else things that investing in Microsoft is the s***???", 
//     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...",
//     "answers": [
//       {
//         "id": 13,
//         "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "date": "30 April 2016"
//       },
//       {
//         "id": 14,
//         "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "date": "1 May 2016"
//       },
//       {
//         "id": 15,
//         "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "date": "10 minutes ago"
//       }
//     ]

function crowdChat(state={data: []}, action) {
  switch (action.type) {
    case actions.ADD_QUESTION:
      var last = state.data[state.data.length-1]
      return Object.assign({}, state, 
        {currentMaxQuestionId: state.currentMaxQuestionId+1},
        {
          data: [
            {
              "id": state.currentMaxQuestionId,
              "topOrder": null,
              "hotOrder": null,
              "isNew": true,
              "title": action.text,
              "description": '',
              "answers": []
            },
            ...state.data]
          })
    case actions.ADD_COMMENT:
      var questionIndex = state.data.findIndex((item) => item.id == action.questionId);
      return Object.assign({}, state, 
        {currentMaxAnswerId: state.currentMaxAnswerId+1},
        {
          data: state.data.map((question, index) => {
            if (index === questionIndex) {
              return Object.assign({}, question, {
                answers: [
                  ...question.answers,
                  {
                    "id": state.currentMaxAnswerId,
                    "comment": action.text,
                    "date": "1 minute ago"
                  }
                ]
              })
            }
            return question
          })
        })
    default:
      return state
  }
  return state
}

function virtualPortfolio(state={data: []}, action) {
  return state
}

const rootReducer = combineReducers({
  ui,
  uiTrending,
  trending,
  watchList,
  news,
  crowdChat,
  featuredNews,
  virtualPortfolio
})

module.exports = rootReducer;
