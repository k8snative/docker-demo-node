import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'

import { authReducer } from './auth/reducer'

const allReducer = combineReducers({
  auth: authReducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    storage.removeItem('persist:tb')
    return allReducer(undefined, action)
  }

  return allReducer(state, action)
}

export default rootReducer
