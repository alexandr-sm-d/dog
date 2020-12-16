import {all} from "redux-saga/effects";
import {watchFetchHandler} from "./reducer";

export default function* rootSaga() {
    yield all([
        watchFetchHandler()
    ])
}