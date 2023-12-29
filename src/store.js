import {configureStore} from '@reduxjs/toolkit';
import {composeWithDevTools} from '@redux-devtools/extension';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage,
  };
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({reducer: persistedReducer,}, composeWithDevTools());

export const persistor = persistStore(store);
export default store;
