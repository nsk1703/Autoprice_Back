import { appromonnaieConstants } from '../../constants/appromonnaieConstants'

export const appromonnaiesReducer = (state = { appromonnaies: [] }, action) => {
    switch (action.type) {
        case appromonnaieConstants.ALL_APPROMONNAIE_REQUEST:
        case appromonnaieConstants.ADMIN_APPROMONNAIE_REQUEST:
            return {
                loading: true,
                appromonnaies: []
            }

        case appromonnaieConstants.ALL_APPROMONNAIE_SUCCESS:
            return {
                loading: false,
                appromonnaies: action.payload.appromonnaies,
                appromonnaiesCount: action.payload.appromonnaiesCount,
                // resPerPage: action.payload.resPerPage,
                // filteredappromonnaiesCount: action.payload.filteredappromonnaiesCount
            }

        case appromonnaieConstants.ADMIN_APPROMONNAIE_SUCCESS:
            return {
                loading: false,
                appromonnaies: action.payload
            }

        case appromonnaieConstants.ALL_APPROMONNAIE_FAIL:
        case appromonnaieConstants.ADMIN_APPROMONNAIE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case appromonnaieConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newAppromonnaieReducer = (state = { appromonnaie: {} }, action) => {
    switch (action.type) {

        case appromonnaieConstants.NEW_APPROMONNAIE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case appromonnaieConstants.NEW_APPROMONNAIE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                appromonnaie: action.payload.appromonnaie,
                // token: action.payload.token
            }

        case appromonnaieConstants.NEW_APPROMONNAIE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case appromonnaieConstants.NEW_APPROMONNAIE_RESET:
            return {
                ...state,
                success: action.payload.success
            }

        case appromonnaieConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const appromonnaieReducer = (state = {}, action) => {
    switch (action.type) {

        case appromonnaieConstants.DELETE_APPROMONNAIE_REQUEST:
        case appromonnaieConstants.UPDATE_APPROMONNAIE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case appromonnaieConstants.DELETE_APPROMONNAIE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case appromonnaieConstants.UPDATE_APPROMONNAIE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case appromonnaieConstants.DELETE_APPROMONNAIE_FAIL:
        case appromonnaieConstants.UPDATE_APPROMONNAIE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case appromonnaieConstants.DELETE_APPROMONNAIE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case appromonnaieConstants.UPDATE_APPROMONNAIE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case appromonnaieConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const appromonnaieDetailsReducer = (state = { appromonnaie: {} }, action) => {
    switch (action.type) {

        case appromonnaieConstants.APPROMONNAIE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case appromonnaieConstants.APPROMONNAIE_DETAILS_SUCCESS:
            return {
                loading: false,
                appromonnaie: action.payload
            }

        case appromonnaieConstants.APPROMONNAIE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case appromonnaieConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}