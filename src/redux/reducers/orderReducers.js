import {ordersConstants} from '../../constants/ordersConstants'

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {

        case ordersConstants.CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ordersConstants.CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ordersConstants.CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ordersConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {

        case ordersConstants.MY_ORDERS_REQUEST:
            return {
                loading: true
            }

        case ordersConstants.MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case ordersConstants.MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ordersConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {

        case ordersConstants.ORDER_DETAILS_REQUEST:
            return {
                loading: true
            }

        case ordersConstants.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ordersConstants.ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ordersConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {

        case ordersConstants.ALL_ORDERS_REQUEST:
            return {
                loading: true
            }

        case ordersConstants.ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                ordersCount: action.payload.ordersCount
            }

        case ordersConstants.ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload.error
            }
        case ordersConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const orderReducer = (state = {}, action) => {
    switch (action.type) {

        case ordersConstants.UPDATE_ORDER_REQUEST:
        case ordersConstants.DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ordersConstants.UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case ordersConstants.DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case ordersConstants.UPDATE_ORDER_FAIL:
        case ordersConstants.DELETE_ORDER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case ordersConstants.UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case ordersConstants.DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case ordersConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}