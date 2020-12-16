import * as axios from 'axios';
import {put, all, call, takeEvery} from 'redux-saga/effects'
import {takeLatest} from "@redux-saga/core/effects";
import {createAction, createAsyncAction} from "typesafe-actions";

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

export const fetchReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }
        case FETCH_SUCCESS: {
            debugger
            return {
                ...state,
                isLoading: false,
                // url: action.img
                url: action.payload.img // TA
            }
        }
        case FETCH_FAILED: {
            return {
                ...state,
                isLoading: false,
                errorLoading: true
            }
        }
        case UPDATE_VERSION: {
            console.log(state.info)
            return {
                ...state,
                info: {
                    ...state.info,
                    title: state.info.title + 1
                }
            }
        }
        case SHOW_AUTHOR: {
            return {
                ...state,
                author: action.payload
            }
        }
        default:
            return state
    }
}

const isLoading = () => ({type: IS_LOADING})
const getImg = (img) => ({type: FETCH_SUCCESS, img})
const error = () => ({type: FETCH_FAILED})

export const updateVersion = () => ({type: UPDATE_VERSION})
export const updateVersionTA = createAction(UPDATE_VERSION)() //..TA = use typesafe-action

export const showAuthor = (payload) => ({type: SHOW_AUTHOR, payload})
export const showAuthorTA = createAction(SHOW_AUTHOR, (payload: string) => payload)()

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* fetchHandler() {
    try {
        yield put(isLoading())
        yield delay(2000)
        let img = yield call(() => axios.get(URL).then(response => response.data.message))
        yield put(getImg(img))
    } catch (err) {
        yield put(error())
    }
}

const fetchDogImage = createAsyncAction(
    [IS_LOADING], // {type: IS_LOADING}
    [FETCH_SUCCESS, (img: string, info: string) => ({img, info})], // {type: FETCH_SUCCESS, img}
    [FETCH_FAILED] // {type: FETCH_FAILED}
)()
console.log('fetchDogImage', fetchDogImage)

function* fetchHandlerTA() {
    try {
        yield put(fetchDogImage.request())
        yield delay(2000)
        let img = yield call(() => axios.get(URL).then(response => response.data.message))
        debugger
        yield put(fetchDogImage.success(img, 'some info'))
    } catch (err) {
        yield put(fetchDogImage.failure())
    }
}

function* watchFetchHandler() {
    // yield takeEvery('FETCH_ASYNC', fetchHandler)
    yield takeLatest('FETCH_ASYNC', fetchHandlerTA)
}

export default function* rootSaga() {
    yield all([
        watchFetchHandler()
    ])
}