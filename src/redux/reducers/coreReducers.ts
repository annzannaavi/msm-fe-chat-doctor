import {AnyAction, combineReducers} from "@reduxjs/toolkit"
import {
    COUNT_VERIFY_ACCOUNT_NUMBER,
    GET_DATA_EARNING,
    GET_DATA_EARNING_ERROR,
    GET_DATA_EARNING_SUCCESS,
    GET_DATA_TRANSACTIONS_HISTORY,
    GET_DATA_TRANSACTIONS_HISTORY_ERROR,
    GET_DATA_TRANSACTIONS_HISTORY_SUCCESS,
    RESET_DATA_EARNING,
    RESET_DATA_TRANSACTIONS_HISTORY,
    SET_HEADER_TITLE,
    SET_NATIVE_NAVIGATION,
    SET_NATIVE_NAVIGATION_BACK,
    SET_PAGE_DATA
} from '../types';

const initialState = {
    data: [],
    meta: {},
    loading: true,
    error: false,
};

const earningReducers = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case GET_DATA_EARNING:
            return {
                ...state,
                loading: true
            };
        case GET_DATA_EARNING_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.length > 0 ? [...state.data, ...action.payload.data] : action.payload.data,
                meta: action.payload.meta,
            };
        case GET_DATA_EARNING_ERROR:
            return {
                ...state,
                data: state.data ? state.data : [],
                meta: state.meta ? state.meta : {
                    pagination: {}
                },
                loading: false,
                error: true,
            };
        case RESET_DATA_EARNING:
            return {
                data: [],
                meta: {},
                loading: false,
                error: false,
            }

        default:
            return state;
    }
}

const transactionHistoryReducers = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case GET_DATA_TRANSACTIONS_HISTORY:
            return {
                ...state,
                loading: true
            };
        case GET_DATA_TRANSACTIONS_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.length > 0 ? [...state.data, ...action.payload.data] : action.payload.data,
                meta: action.payload.meta,
            };
        case GET_DATA_TRANSACTIONS_HISTORY_ERROR:
            return {
                ...state,
                data: state.data ? state.data : [],
                meta: state.meta ? state.meta : {
                    pagination: {}
                },
                loading: false,
                error: true,
            };
        case RESET_DATA_TRANSACTIONS_HISTORY:
            return {
                data: [],
                meta: {},
                loading: false,
                error: false,
            }

        default:
            return state;
    }
}


const retrieveHeaderTitle = (state = {titleHeader:'Monetize'}, action: AnyAction) => {
    switch (action.type) {
        case SET_HEADER_TITLE:
            return {
                titleHeader: action.payload || !state.titleHeader
            }
        default:
            return state
    }
}

const retrieveNativeNavigation = (state = {nativeNavigation:false}, action: AnyAction) => {
    switch (action.type) {
        case SET_NATIVE_NAVIGATION:
            return {
                nativeNavigation: action.payload || !state.nativeNavigation
            }
        default:
            return state
    }
}


const retrieveNativeNavigationBack = (state = {urlBack:'nothing'}, action: AnyAction) => {
    switch (action.type) {
        case SET_NATIVE_NAVIGATION_BACK:
            return {
                urlBack: action.payload || !state.urlBack
            }
        default:
            return state
    }
}
const retrievePageData = (state = {pageData:1}, action: AnyAction) => {
    switch (action.type) {
        case SET_PAGE_DATA:
            return {
                pageData: action.payload || !state.pageData
            }
        default:
            return state
    }
}

// use combineReducers if there is more than one reducers
const coreReducers = combineReducers({
    earningReducers,
    transactionHistoryReducers,
    retrieveHeaderTitle,
    retrieveNativeNavigation,
    retrieveNativeNavigationBack,
    retrievePageData
});

export default coreReducers