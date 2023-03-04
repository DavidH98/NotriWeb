// Constants
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESSES,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESSES,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESSES,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESSES,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESSES,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESSES,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESSES,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    FILE_UPLOAD_REQUEST,
FILE_UPLOAD_SUCCESSES,
FILE_UPLOAD_FAIL,
} from '../constants/usersConstants'



// User login
export const userLoginReducer = (state= {}, action)=>{

    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESSES:
            return {loading:false, userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false, error:action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }

}
// FILE UPLOAD
export const uploadFile = (state= {}, action)=>{

    switch (action.type) {
        case FILE_UPLOAD_REQUEST:
            return { loading:true , success:false}
        case FILE_UPLOAD_SUCCESSES:
            return {loading:false, ...state, transferredVariable: action.payload,  success:true}
        case FILE_UPLOAD_FAIL:
            return {loading:false, error:action.payload , success:false}
        default:
            return state
    }

}

// User register
export const userRegisterReducer = (state= {}, action)=>{

    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESSES:
            return {loading:false, userInfo:action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

}

// Get user profile
export const userProfileReducer = (state= {user:{}}, action)=>{

    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {...state, loading:true}
        case USER_DETAILS_SUCCESSES:
            return {loading:false, user:action.payload}
        case USER_DETAILS_FAIL:
            return {loading:false, error:action.payload}
        case USER_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }

}

// Update login user profile
export const updateProfileReducer = (state= {files:[{names:[]}]}, action)=>{

    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading:true , success:false}
        case USER_UPDATE_PROFILE_SUCCESSES:
            return {loading:false, userInfo:action.payload, success:true}
        case USER_UPDATE_PROFILE_FAIL:
            return {loading:false, error:action.payload , success:false}
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }

}

// Get all users
export const getAllUsersReducer = (state= {users:[]}, action)=>{

    switch (action.type) {
        case USER_LIST_REQUEST:
            return {...state, loading:true}
        case USER_LIST_SUCCESSES:
            return {loading:false, users:action.payload}
        case USER_LIST_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

}

// Delete a user
export const userDeleteReducer = (state= {}, action)=>{

    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {...state, loading:true}
        case USER_DELETE_SUCCESSES:
            return {loading:false, success:true}
        case USER_DELETE_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

}

// Update user admin
export const userUpdateReducer = (state= {user:{}}, action)=>{

    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading:true , success:false}
        case USER_UPDATE_SUCCESSES:
            return {loading:false, success:true}
        case USER_UPDATE_FAIL:
            return {loading:false, error:action.payload , success:false}
        case USER_UPDATE_RESET:
            return {user:{}}
        default:
            return state
    }

}