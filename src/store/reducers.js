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

function trending(state={data: [], currentPosition: 0}, action) {
  switch (action.type) {
    case actions.INCREMENT_TRENDING_CURRENT_POSITION:
      return {
        data: state.data,
        currentPosition: (state.currentPosition + 1) % state.data.length
      }
    default:
      return state
  }
}

function watchList(state={data: []}, action) {
  return state
}

const rootReducer = combineReducers({
  ui,
  trending,
  watchList,
})

module.exports = rootReducer;
