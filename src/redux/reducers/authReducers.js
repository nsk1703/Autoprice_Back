import { authConstants } from "../../constants/userConstants"; 

const initialState ={
    user: {},
    token: null, 
    roles: {}, 
    isAuthenticated: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case authConstants.LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            } 

        case authConstants.LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                roles: action.payload.roles
            }

        case authConstants.LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case authConstants.LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case authConstants.LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                message: action.payload
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