import { applyMiddleware, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
// @ts-ignore
import storage from 'redux-persist-indexeddb-storage'
import thunk from 'redux-thunk'

import rootReducer from './store'

const persistConfig = {
  key: 'tb',
  storage: storage('tb'),
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
