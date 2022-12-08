import loginReducer from "../features/loginInfoSlice";
import registerReducer from "../features/registerSlice"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";

const combinedReducers = combineReducers({
    loginInfo: loginReducer,
    registerInfo: registerReducer
})

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, combinedReducers)

//! CREATING
const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store)

export default store
