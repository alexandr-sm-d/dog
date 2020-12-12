import {createStore, applyMiddleware, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga, {fetchReducer} from "../redux-saga/reducer";

const sagaMiddleware = createSagaMiddleware()
const ROOTReducer = combineReducers({
    fetchStatus: fetchReducer
})

const store = createStore(ROOTReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

window.store = store;
export default store;