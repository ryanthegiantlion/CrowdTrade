// action types

export const TOGGLE_MENU = "TOGGLE_MENU"
export const CHANGE_ROUTE = 'CHANGE_ROUTE'
export const INCREMENT_TRENDING_CURRENT_POSITION = 'INCREMENT_TRENDING_CURRENT_POSITION'

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
    type: INCREMENT_TRENDING_CURRENT_POSITION
  }
}
