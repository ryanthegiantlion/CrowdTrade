import { combineReducers } from 'redux'
import * as actions from './actions';

function trending(state = {data: [], currentPosition: 0}, action) {
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

const rootReducer = combineReducers({
  trending,
})

module.exports = rootReducer;
