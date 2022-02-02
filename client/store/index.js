import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import initSubscriber from 'redux-subscriber';
import reduxReset from 'redux-reset';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage'
import rootReducer from './reducer';

const persistConfig = {
  key: 'root',
  stateReconciler: autoMergeLevel2,
  storage: AsyncStorage,
  whitelist: ['authentication'] // only app will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunk);
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enHanceCreateStore = composeEnhancers(
  middleware,
  reduxReset() // Will use 'RESET' as default action.type to trigger reset
)(createStore);

// // ------------- these are the actions -------------
export * from './reducer';

let store = enHanceCreateStore(persistedReducer);
let persistor = persistStore(store);
initSubscriber(store);
export { store, persistor };

