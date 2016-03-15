import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      loggerMiddleware
    )
  )
}

module.exports = configureStore;