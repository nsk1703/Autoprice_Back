import {transactionsConstants} from '../../constants/transactionomConstants'

export const transactionomsReducer = (state = { transactionoms: [] }, action) => {
    switch (action.type) {
        case transactionsConstants.ALL_TRANSACTIONOM_REQUEST:
        case transactionsConstants.ADMIN_TRANSACTIONOM_REQUEST:
            return {
                loading: true,
                transactionoms: []
            }

        case transactionsConstants.ALL_TRANSACTIONOM_SUCCESS:
            return {
                loading: false,
                transactionoms: action.payload.transactionoms,
                transactionomsCount: action.payload.transactionomsCount,
                // resPerPage: action.payload.resPerPage,
                // filteredtransactionomsCount: action.payload.filteredtransactionomsCount
            }

        case transactionsConstants.ADMIN_TRANSACTIONOM_SUCCESS:
            return {
                loading: false,
                transactionoms: action.payload
            }

        case transactionsConstants.ALL_TRANSACTIONOM_FAIL:
        case transactionsConstants.ADMIN_TRANSACTIONOM_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case transactionsConstants.CLEAR_ERRORS:
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

        case transactionsConstants.NEW_TRANSACTIONOM_REQUEST:
            return {
                ...state,
                loading: true
            }

        case transactionsConstants.NEW_TRANSACTIONOM_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                transactionom: action.payload.transactionom
            }

        case transactionsConstants.NEW_TRANSACTIONOM_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case transactionsConstants.NEW_TRANSACTIONOM_RESET:
            return {
                ...state,
                success: false
            }

        case transactionsConstants.CLEAR_ERRORS:
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

        case transactionsConstants.DELETE_TRANSACTIONOM_REQUEST:
        case transactionsConstants.UPDATE_TRANSACTIONOM_REQUEST:
            return {
                ...state,
                loading: true
            }

        case transactionsConstants.DELETE_TRANSACTIONOM_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case transactionsConstants.UPDATE_TRANSACTIONOM_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case transactionsConstants.DELETE_TRANSACTIONOM_FAIL:
        case transactionsConstants.UPDATE_TRANSACTIONOM_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case transactionsConstants.DELETE_TRANSACTIONOM_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case transactionsConstants.UPDATE_TRANSACTIONOM_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case transactionsConstants.CLEAR_ERRORS:
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

        case transactionsConstants.TRANSACTIONOM_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case transactionsConstants.TRANSACTIONOM_DETAILS_SUCCESS:
            return {
                loading: false,
                transactionom: action.payload
            }

        case transactionsConstants.TRANSACTIONOM_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case transactionsConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}