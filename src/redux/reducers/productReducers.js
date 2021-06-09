import {productConstants} from '../../constants/productConstants'

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case productConstants.ALL_PRODUCTS_REQUEST:
        case productConstants.ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }

        case productConstants.ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            }

        case productConstants.ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }

        case productConstants.ALL_PRODUCTS_FAIL:
        case productConstants.ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case productConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {

        case productConstants.NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case productConstants.NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                // product: action.payload.product
            }

        case productConstants.NEW_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case productConstants.NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false
            }

        case productConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const productReducer = (state = {}, action) => {
    switch (action.type) {

        case productConstants.DELETE_PRODUCT_REQUEST:
        case productConstants.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case productConstants.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.isDeleted
            }

        case productConstants.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.isUpdated
            }


        case productConstants.DELETE_PRODUCT_FAIL:
        case productConstants.UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload.error
            }

        case productConstants.DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case productConstants.UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case productConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {

        case productConstants.PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case productConstants.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload.product
            }

        case productConstants.PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case productConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}