import {
    getDataTransactionHistoryAction,
    getDataTransactionHistoryActionError,
    getDataTransactionHistoryActionSuccess
} from "@/redux/actions";
import type {AppDispatch} from '@/redux/store'
import {fetchMonetizeListTransactions} from "@/services/dashboard";

interface Params {
    page: number; // Define the type of the 'page' property, assuming it's a number
}

export const getDataTransactionHistoryService = (params: Params) => {
    const { page } = params
    const token = localStorage.getItem('token')
    return async (dispatch:AppDispatch) => {
        dispatch(getDataTransactionHistoryAction());
        try {
            if(!token){
                throw new Error('Token is null or undefined'); // Throw an error if user_id is not available
            }
            const res = await fetchMonetizeListTransactions({ page: page, length:10 },token,false);
            dispatch(getDataTransactionHistoryActionSuccess(res.data));
        } catch (error) {
            // Handle error
            console.error('Error fetching data:', error);
            // Dispatch an error action if needed
            dispatch(getDataTransactionHistoryActionError());
        }
    };
};

