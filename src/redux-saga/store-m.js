import {createStore, applyMiddleware, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga, {fetchReducer} from "../redux-saga/reducer";
import {fetchReducerTA} from "./reducer";

const sagaMiddleware = createSagaMiddleware()
const ROOTReducer = combineReducers({
    fetchStatus: fetchReducerTA,
})

const store = createStore(ROOTReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

window.store = store;
export default store;