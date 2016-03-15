// action types

export const INCREMENT_TRENDING_CURRENT_POSITION = 'INCREMENT_TRENDING_CURRENT_POSITION'

// action creators

export function incrementTrendingCurrentPosition(position) {
  return {
    type: INCREMENT_TRENDING_CURRENT_POSITION
  }
}
