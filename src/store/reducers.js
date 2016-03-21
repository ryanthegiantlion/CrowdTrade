import { combineReducers } from 'redux'
import * as actions from './actions';

function ui(state={isMenuShowing: false, currentRoute: 'trending'}, action) {
  switch (action.type) {
    case actions.TOGGLE_MENU:
      return {
        isMenuShowing: !state.isMenuShowing,
        currentRoute: state.currentRoute
      }
    case actions.CHANGE_ROUTE:
      return {
        isMenuShowing: false,
        currentRoute: action.route
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

const rootReducer = combineReducers({
  ui,
  uiTrending,
  trending,
  watchList,
})

module.exports = rootReducer;
