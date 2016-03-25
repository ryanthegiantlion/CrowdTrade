// action types

export const TOGGLE_MENU = "TOGGLE_MENU"
export const CHANGE_ROUTE = 'CHANGE_ROUTE'
export const INCREMENT_TRENDING_CURRENT_POSITION = 'INCREMENT_TRENDING_CURRENT_POSITION'
export const TOGGLE_IS_TRENDING_DROPDOWN_DISPLAYED = 'TOGGLE_IS_TRENDING_DROPDOWN_DISPLAYED'

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
