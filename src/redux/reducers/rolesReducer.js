import { roleConstants } from '../../constants/roleConstants'

export const rolesReducer = (state = { roles: [] }, action) => {
    switch (action.type) {
        case roleConstants.ALL_ROLES_REQUEST:
            return {
                loading: true,
                roles: []
            }

        case roleConstants.ALL_ROLES_SUCCESS:
            return {
                loading: false,
                roles: action.payload.roles,
                success: action.payload.success,

            }

        case roleConstants.ALL_ROLES_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case roleConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newRoleReducer = (state = { role: {} }, action) => {
    switch (action.type) {

        case roleConstants.NEW_ROLES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case roleConstants.NEW_ROLES_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                role: action.payload.role,
                // token: action.payload.token
            }

        case roleConstants.NEW_ROLES_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case roleConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const roleReducer = (state = {}, action) => {
    switch (action.type) {

        case roleConstants.DELETE_ROLES_REQUEST:
        case roleConstants.UPDATE_ROLES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case roleConstants.DELETE_ROLES_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.isDeleted
            }

        case roleConstants.UPDATE_ROLES_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.isUpdated
            }


        case roleConstants.DELETE_ROLES_FAIL:
        case roleConstants.UPDATE_ROLES_FAIL:
            return {
                ...state,
                error: action.payload.error
            }

        case roleConstants.DELETE_ROLES_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case roleConstants.UPDATE_ROLES_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case roleConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const roleDetailsReducer = (state = { role: {} }, action) => {
    switch (action.type) {

        case roleConstants.ROLE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case roleConstants.ROLE_DETAILS_SUCCESS:
            return {
                loading: false,
                // success: action.payload.success,
                role: action.payload.role
            }

        case roleConstants.ROLE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case roleConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}