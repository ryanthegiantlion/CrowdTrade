// action types

export const TOGGLE_MENU = "TOGGLE_MENU"
export const CHANGE_ROUTE = 'CHANGE_ROUTE'
export const INCREMENT_TRENDING_CURRENT_POSITION = 'INCREMENT_TRENDING_CURRENT_POSITION'
export const TOGGLE_IS_TRENDING_DROPDOWN_DISPLAYED = 'TOGGLE_IS_TRENDING_DROPDOWN_DISPLAYED'
export const ADD_QUESTION = "ADD_QUESTION"
export const UPDATE_SEARCH_FILTER = "UPDATE_SEARCH_FILTER"

// action creators

export function toggleMenu() {
  return {
    type: TOGGLE_MENU
  }
}

export function changeRoute(route) {
  return {
    type: CHANGE_ROUTE,
    route: route
  }
}

export function incrementTrendingCurrentPosition(position) {
  return {
    type: INCREMENT_TRENDING_CURRENT_POSITION,
    position: position
  }
}

export function toggleIsTrendingDropDownDisplayed() {
  return {
    type: TOGGLE_IS_TRENDING_DROPDOWN_DISPLAYED
  }
}

export function addQuestion(text) {
  return {
    type: ADD_QUESTION,
    text: text
  }
}

export function updateSearchFilter(text) {
  return {
    type: UPDATE_SEARCH_FILTER,
    text: text
  }
}
