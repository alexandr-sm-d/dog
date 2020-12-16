import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {fetchReducerTA} from "./reducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware()
const ROOTReducer = combineReducers({
    fetchStatus: fetchReducerTA,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(ROOTReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

window.store = store;
export default store;