import * as axios from 'axios';
import {put, all, call, takeEvery} from 'redux-saga/effects'
import {takeLatest} from "@redux-saga/core/effects";
import {createAction, createAsyncAction, createReducer, getType} from "typesafe-actions";

const IS_LOADING = 'IS_LOADING'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_FAILED = 'FETCH_FAILED'
const UPDATE_VERSION = 'UPDATE_VERSION'
const SHOW_AUTHOR = 'SHOW_AUTHOR'

const URL = 'https://dog.ceo/api/breeds/image/random'
let initialState = {
    url: '',
    isLoading: false,
    errorLoading: false,
    info: {title: 1},
    author: ''
}

const fetchDogImage = createAsyncAction(
    [IS_LOADING], // {type: IS_LOADING}
    [FETCH_SUCCESS, (img: string, info: string) => ({img, info})], // {type: FETCH_SUCCESS, img}
    [FETCH_FAILED] // {type: FETCH_FAILED}
)()

export const updateVersionTA = createAction(UPDATE_VERSION)() //..TA = use typesafe-action
export const showAuthorTA = createAction(SHOW_AUTHOR, (payload: string) => payload)()


export const fetchReducerTA = createReducer(initialState, {
    [getType(fetchDogImage.request)]: state => ({
        ...state,
        isLoading: true
    }),
    [getType(fetchDogImage.success)]: (state, {payload}) => ({
        ...state,
        isLoading: false,
        url: payload.img // TA

    }),
    [getType(fetchDogImage.failure)]: state => ({
        ...state,
        isLoading: false,
        errorLoading: true
    }),
    [getType(updateVersionTA)]: state => ({
        ...state,
        info: {
            ...state.info,
            title: state.info.title + 1
        }
    }),
    [getType(showAuthorTA)]: (state, {payload}) => ({
        ...state,
        author: payload
    })
})

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* fetchHandlerTA() {
    try {
        yield put(fetchDogImage.request())
        yield delay(1000)
        let img = yield call(() => axios.get(URL).then(response => response.data.message))
        yield put(fetchDogImage.success(img, 'some info'))
    } catch (err) {
        yield put(fetchDogImage.failure())
    }
}

export function* watchFetchHandler() {
    // yield takeEvery('FETCH_ASYNC', fetchHandler)
    yield takeLatest('FETCH_ASYNC', fetchHandlerTA)
}
