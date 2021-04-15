import {
    ALL_TRANSACTIONOM_REQUEST,
    ALL_TRANSACTIONOM_SUCCESS,
    ALL_TRANSACTIONOM_FAIL,
    ADMIN_TRANSACTIONOM_REQUEST,
    ADMIN_TRANSACTIONOM_SUCCESS,
    ADMIN_TRANSACTIONOM_FAIL,
    NEW_TRANSACTIONOM_REQUEST,
    NEW_TRANSACTIONOM_SUCCESS,
    NEW_TRANSACTIONOM_RESET,
    NEW_TRANSACTIONOM_FAIL,
    DELETE_TRANSACTIONOM_REQUEST,
    DELETE_TRANSACTIONOM_SUCCESS,
    DELETE_TRANSACTIONOM_RESET,
    DELETE_TRANSACTIONOM_FAIL,
    UPDATE_TRANSACTIONOM_REQUEST,
    UPDATE_TRANSACTIONOM_SUCCESS,
    UPDATE_TRANSACTIONOM_RESET,
    UPDATE_TRANSACTIONOM_FAIL,
    TRANSACTIONOM_DETAILS_REQUEST,
    TRANSACTIONOM_DETAILS_SUCCESS,
    TRANSACTIONOM_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../../constants/transactionomConstants'

export const transactionomsReducer = (state = { transactionoms: [] }, action) => {
    switch (action.type) {
        case ALL_TRANSACTIONOM_REQUEST:
        case ADMIN_TRANSACTIONOM_REQUEST:
            return {
                loading: true,
                transactionoms: []
            }

        case ALL_TRANSACTIONOM_SUCCESS:
            return {
                loading: false,
                transactionoms: action.payload.transactionoms,
                transactionomsCount: action.payload.transactionomsCount,
                resPerPage: action.payload.resPerPage,
                filteredtransactionomsCount: action.payload.filteredtransactionomsCount
            }

        case ADMIN_TRANSACTIONOM_SUCCESS:
            return {
                loading: false,
                transactionoms: action.payload
            }

        case ALL_TRANSACTIONOM_FAIL:
        case ADMIN_TRANSACTIONOM_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newTransactionomReducer = (state = { transactionom: {} }, action) => {
    switch (action.type) {

        case NEW_TRANSACTIONOM_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_TRANSACTIONOM_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                transactionom: action.payload.transactionom
            }

        case NEW_TRANSACTIONOM_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_TRANSACTIONOM_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const transactionomReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_TRANSACTIONOM_REQUEST:
        case UPDATE_TRANSACTIONOM_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_TRANSACTIONOM_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_TRANSACTIONOM_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_TRANSACTIONOM_FAIL:
        case UPDATE_TRANSACTIONOM_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_TRANSACTIONOM_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_TRANSACTIONOM_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const transactionomDetailsReducer = (state = { transactionom: {} }, action) => {
    switch (action.type) {

        case TRANSACTIONOM_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TRANSACTIONOM_DETAILS_SUCCESS:
            return {
                loading: false,
                transactionom: action.payload
            }

        case TRANSACTIONOM_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}