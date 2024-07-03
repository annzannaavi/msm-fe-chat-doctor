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
    SET_PAGE_DATA,
    SET_NATIVE_NAVIGATION_BACK
} from "../types";
import {ResponseAPI} from "@/model/DashboardModel";

export const getDataEarningAction = () => ({
    type: GET_DATA_EARNING,
});

export const getDataEarningActionSuccess = (data: ResponseAPI) => ({
    type: GET_DATA_EARNING_SUCCESS,
    payload: data,
});

export const getDataEarningActionError = () => ({
    type: GET_DATA_EARNING_ERROR,
});

export const resetDataEarningAction = () => ({
    type: RESET_DATA_EARNING
})

export const getDataTransactionHistoryAction = () => ({
    type: GET_DATA_TRANSACTIONS_HISTORY,
});

export const getDataTransactionHistoryActionSuccess = (data: ResponseAPI) => ({
    type: GET_DATA_TRANSACTIONS_HISTORY_SUCCESS,
    payload: data,
});

export const getDataTransactionHistoryActionError = () => ({
    type: GET_DATA_TRANSACTIONS_HISTORY_ERROR,
});

export const resetDataTransactionHistoryAction = () => ({
    type: RESET_DATA_TRANSACTIONS_HISTORY
})
export const countTotalRequestVerifyAccountNumber = (payload: number) => ({
    type: COUNT_VERIFY_ACCOUNT_NUMBER,
    payload
})

export const setHeaderTitle = (payload: string) => ({
    type: SET_HEADER_TITLE,
    payload
})

export const setNativeNavigation = (payload: boolean) => ({
    type: SET_NATIVE_NAVIGATION,
    payload
})

export const setNativeNavigationBack = (payload: string) => ({
    type: SET_NATIVE_NAVIGATION_BACK,
    payload
})

export const setPageData = (payload: number) => ({
    type: SET_PAGE_DATA,
    payload
})