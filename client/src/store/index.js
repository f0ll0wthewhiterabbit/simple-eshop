import { applyMiddleware, createStore, compose } from 'redux'
import reduxLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'
import rootSaga from './sagas'

let store = null

const sagaMiddleware = createSagaMiddleware()

const createDevelopmentStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware, reduxLogger)))
}

const createProductionStore = () => createStore(reducer, applyMiddleware(sagaMiddleware))

const getStore = () => {
  if (!store) {
    store =
      process.env.NODE_ENV === 'development' ? createDevelopmentStore() : createProductionStore()

    sagaMiddleware.run(rootSaga)
  }

  return store
}

export default getStore
