import {
    ALL_MACHINE_REQUEST,
    ALL_MACHINE_SUCCESS,
    ALL_MACHINE_FAIL,
    ADMIN_MACHINE_REQUEST,
    ADMIN_MACHINE_SUCCESS,
    ADMIN_MACHINE_FAIL,
    NEW_MACHINE_REQUEST,
    NEW_MACHINE_SUCCESS,
    NEW_MACHINE_RESET,
    NEW_MACHINE_FAIL,
    DELETE_MACHINE_REQUEST,
    DELETE_MACHINE_SUCCESS,
    DELETE_MACHINE_RESET,
    DELETE_MACHINE_FAIL,
    UPDATE_MACHINE_REQUEST,
    UPDATE_MACHINE_SUCCESS,
    UPDATE_MACHINE_RESET,
    UPDATE_MACHINE_FAIL,
    MACHINE_DETAILS_REQUEST,
    MACHINE_DETAILS_SUCCESS,
    MACHINE_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/machineConstants'

export const machinesReducer = (state = { machines: [] }, action) => {
    switch (action.type) {
        case ALL_MACHINE_REQUEST:
        case ADMIN_MACHINE_REQUEST:
            return {
                loading: true,
                machines: []
            }

        case ALL_MACHINE_SUCCESS:
            return {
                loading: false,
                machines: action.payload.machines,
                machinesCount: action.payload.machinesCount,
                resPerPage: action.payload.resPerPage,
                filteredmachinesCount: action.payload.filteredmachinesCount
            }

        case ADMIN_MACHINE_SUCCESS:
            return {
                loading: false,
                machines: action.payload
            }

        case ALL_MACHINE_FAIL:
        case ADMIN_MACHINE_FAIL:
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

export const newMachineReducer = (state = { machine: {} }, action) => {
    switch (action.type) {

        case NEW_MACHINE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_MACHINE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                machine: action.payload.machine
            }

        case NEW_MACHINE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_MACHINE_RESET:
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

export const machineReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_MACHINE_REQUEST:
        case UPDATE_MACHINE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_MACHINE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_MACHINE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_MACHINE_FAIL:
        case UPDATE_MACHINE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_MACHINE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_MACHINE_RESET:
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

export const machineDetailsReducer = (state = { machine: {} }, action) => {
    switch (action.type) {

        case MACHINE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case MACHINE_DETAILS_SUCCESS:
            return {
                loading: false,
                machine: action.payload
            }

        case MACHINE_DETAILS_FAIL:
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