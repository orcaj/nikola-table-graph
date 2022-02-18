import {
    AppDispatch,
} from '../store'

const SET_CATEGORY = "create/category" as const;

export type Category = {
    id: number,
    label: string
};

const initialCategory: Category[] = []

export const loadCategoryList = () => (dispatch: AppDispatch) => {
    const localCategory = localStorage.getItem('category');
    if (localCategory) {
        dispatch({
            type: SET_CATEGORY,
            payload: JSON.parse(localCategory)
        })
    } else {
        const initCategoryList = [
            { id: 1, label: "Salary" },
            { id: 2, label: "Gifts" },
            { id: 3, label: "Food" },
            { id: 4, label: "Going out" },
            { id: 5, label: "Traveling" }
        ];
        dispatch({
            type: SET_CATEGORY,
            payload: initCategoryList
        })
    }
};

export const setCategoryList = (categoryList: Category[]) => (dispatch: AppDispatch) => {
    localStorage.setItem('category', JSON.stringify(categoryList));
    dispatch({
        type: SET_CATEGORY,
        payload: categoryList
    })
};

type reduxAction = ReturnType<typeof setCategoryList>;

function category(state: Category[] = initialCategory, action: any): Category[] {
    switch (action.type) {
        case SET_CATEGORY:
            return action.payload;
        default:
            return state;
    }
};

export default category;