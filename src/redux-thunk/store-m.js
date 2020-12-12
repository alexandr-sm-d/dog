import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk'
import {fetchReducer} from "./reducer";

const ROOTReducer = combineReducers({
    fetchStatus: fetchReducer
})

const store = createStore(ROOTReducer, applyMiddleware(thunkMiddleware))

window.store = store;
export default store;