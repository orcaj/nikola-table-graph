import { combineReducers } from "redux";
import category from "./category";
import transactions from './transactions';

const rootReducer = combineReducers({
    category,
    transactions
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;