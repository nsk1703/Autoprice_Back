import {categoriesConstants} from '../../constants/categoryConstants'

export const categoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case categoriesConstants.ALL_CATEGORY_REQUEST:
            return {
                loading: true,
                categories: []
            }

        case categoriesConstants.ALL_CATEGORY_SUCCESS:
            return {
                loading: false,
                categories: action.payload.categories,
                categoriesCount: action.payload.categoriesCount
            }

        case categoriesConstants.ALL_CATEGORY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case categoriesConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newCategoryReducer = (state = { category: {} }, action) => {
    switch (action.type) {

        case categoriesConstants.NEW_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case categoriesConstants.NEW_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                category: action.payload.category
            }

        case categoriesConstants.NEW_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case categoriesConstants.NEW_CATEGORY_RESET:
            return {
                ...state,
                success: false
            }

        case categoriesConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const categoryReducer = (state = {}, action) => {
    switch (action.type) {

        case categoriesConstants.DELETE_CATEGORY_REQUEST:
        case categoriesConstants.UPDATE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case categoriesConstants.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case categoriesConstants.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case categoriesConstants.DELETE_CATEGORY_FAIL:
        case categoriesConstants.UPDATE_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case categoriesConstants.DELETE_CATEGORY_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case categoriesConstants.UPDATE_CATEGORY_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case categoriesConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}