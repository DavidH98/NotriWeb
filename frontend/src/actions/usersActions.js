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
    FILE_UPLOAD_REQUEST,
FILE_UPLOAD_SUCCESSES,
FILE_UPLOAD_FAIL,
} from '../constants/usersConstants'

// Node packages
import axios from 'axios'
import serialize from'serialize-javascript';
import { json } from 'react-router-dom';
import stringify from 'json-stringify-safe';






// User login
export const login = (email,password)=> async(dispatch)=> {
    try {
        dispatch({type: USER_LOGIN_REQUEST })

        // Make a json request
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // (url,data,config)
        const {data}  = await axios.post('/api/users/login',{email,password},config)
        
        dispatch({
            type: USER_LOGIN_SUCCESSES,
            payload: data
        })

        // Set user info on localStorage
        localStorage.setItem('userInfo',JSON.stringify(data))


    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

// User logout
export const logout = ()=> async(dispatch)=> {

    localStorage.removeItem('userInfo')
    // localStorage.setItem('userInfo', {});
     dispatch({type: USER_LOGOUT})
     dispatch({type: USER_DETAILS_RESET})



}


// User register
export const register = (hebrewName,englishName,englishAddress,email,password,address,licenseNumber)=> async(dispatch)=> {
    try {
        dispatch({type: USER_REGISTER_REQUEST })

        // Make a json request
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // (url,data,config)
        const {data}  = await axios.post('/api/users',{hebrewName,englishName,englishAddress,email,password,address,licenseNumber},config)

        dispatch({
            type: USER_REGISTER_SUCCESSES,
            payload: data
        })

        // Login the user after register
        dispatch({
            type: USER_LOGIN_SUCCESSES,
            payload: data
        })

        // Set user info on localStorage
        localStorage.setItem('userInfo',JSON.stringify(data))


    } catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

// Get login user Profile
export const getUserProfile = (id)=> async(dispatch,getState)=> {
    try {
        dispatch({type: USER_DETAILS_REQUEST })

        const {userLogin:{userInfo}} = getState()

        // Make a json request & get the token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }
        // (url,data,config)
        const {data}  = await axios.get('/api/users/'+id,config)

        dispatch({
            type: USER_DETAILS_SUCCESSES,
            payload: data
        })



    } catch (error) {

        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

// Update login user Profile
export const updateUserProfile = (user)=> async(dispatch,getState)=> {
    try {

        dispatch({type: USER_UPDATE_PROFILE_REQUEST })

        const {userLogin:{userInfo}} = getState()

        // Make a json request & get the token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }
        // (url,data,config)
        const {data}  = await axios.put('/api/users/profile',user,config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESSES,
            payload: data
        })
        // Login the user after register
        dispatch({
            type: USER_LOGIN_SUCCESSES,
            payload: data
        })

        // Set user info on localStorage
        localStorage.setItem('userInfo',JSON.stringify(data))



    } catch (error) {

        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}
// Upload file
export const uploadFile = (file)=> async(dispatch,getState)=> {
    try {


        dispatch({type: FILE_UPLOAD_REQUEST })

        const {userLogin:{userInfo}} = getState()

        // Make a json request & get the token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }
        // const temp = stringify(file);
        console.log(file);
        console.log(file);
        
        // (url,data,config)
        const {data}  = await axios.post('/api/users/upload',file,config)
        console.log(file);

        dispatch({
            type: FILE_UPLOAD_SUCCESSES,
            payload:data,
        })
        // Login the user after register


  


    } catch (error) {
        console.log(error);

        dispatch({
            type: FILE_UPLOAD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

// Rest login user Profile
export const resetUserProfile = ()=> async(dispatch)=> {
    try {


        dispatch({type: USER_UPDATE_PROFILE_RESET })


    } catch (error) {

        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

// Get all users
export const getAllUsers = ()=> async(dispatch,getState)=> {

    try {
        dispatch({type: USER_LIST_REQUEST })

        const {userLogin:{userInfo}} = getState()

        // Make a json request & get the token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }
        // (url,data,config)
        const {data}  = await axios.get('/api/users/',config)

        dispatch({
            type: USER_LIST_SUCCESSES,
            payload: data
        })



    } catch (error) {

        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }


}

// Delete a user
export const deleteUser = (id)=> async(dispatch,getState)=> {

    try {
        dispatch({type: USER_DELETE_REQUEST })

        const {userLogin:{userInfo}} = getState()

        // Make a json request & get the token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }
        // (url,data,config)
        await axios.delete('/api/users/'+id,config)

        dispatch({
            type: USER_DELETE_SUCCESSES,
        })



    } catch (error) {

        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }


}

// Update a user
export const updateUser = (user)=> async(dispatch,getState)=> {
    try {


        dispatch({type: USER_UPDATE_REQUEST })

        const {userLogin:{userInfo}} = getState()

        // Make a json request & get the token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }
        // (url,data,config)
        const {data}  = await axios.put('/api/users/'+user._id,user,config)

        dispatch({
            type: USER_UPDATE_SUCCESSES,
        })

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESSES,
            payload: data
        })



    } catch (error) {

        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}