import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/redux/counterSlice';
import commonReducer from '../features/common/redux/commonSlice';
import accountReducer from '../features/account/redux/accountSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['account']
}

const rootReducer = combineReducers({
  counter: counterReducer,
  common: commonReducer,
  account: accountReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
