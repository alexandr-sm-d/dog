import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {fakeCount, fetchReducerTA} from "./reducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware()
const ROOTReducer = combineReducers({
    fetchStatus: fetchReducerTA,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(ROOTReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

setInterval(() => store.dispatch(fakeCount()), 1000)


sagaMiddleware.run(rootSaga)

window.store = store;
export default store;