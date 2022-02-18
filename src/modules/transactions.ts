import {
    AppDispatch,
} from '../store'

const SET_TRANSACTION = "create/transaction" as const;

export type Transaction = {
    id: number,
    label: string,
    date: string,
    amount: number,
    categoryId: number,
};

const initial: Transaction[] = []

export const loadTransactionList = () => (dispatch: AppDispatch) => {
    const localCategory = localStorage.getItem('transaction');
    if (localCategory) {
        dispatch({
            type: SET_TRANSACTION,
            payload: JSON.parse(localCategory)
        })
    } else {
        dispatch({
            type: SET_TRANSACTION,
            payload: []
        })
    }
};

export const setTransactionList = (trasactionList: Transaction[]) => (dispatch: AppDispatch) => {
    localStorage.setItem('transaction', JSON.stringify(trasactionList));
    dispatch({
        type: SET_TRANSACTION,
        payload: trasactionList
    })
};

export function transactions(state: Transaction[] = initial, action: any): Transaction[] {
    switch (action.type) {
        case SET_TRANSACTION:
            return action.payload;
        default:
            return state;
    }
};

export default transactions;