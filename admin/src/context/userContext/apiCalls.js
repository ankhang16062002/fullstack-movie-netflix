import axios from 'axios'

import { 
    getUsersStart, 
    getUsersSuccess, 
    getUsersFailure,
    createUserStart, 
    createUserSuccess, 
    createUserFailure,
    deleteUserStart, 
    deleteUserSuccess, 
    deleteUserFailure,
    updateUserStart, 
    updateUserSuccess, 
    updateUserFailure,
} from './UserAction'

//GET

export const getUsers = async (dispatch) => {
    dispatch(getUsersStart())
    try{
        const res = await axios.get('/users', {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(getUsersSuccess(res.data))
    }catch(err) {
        dispatch(getUsersFailure())
    }
}

//CREATE

export const createUser = async (user, dispatch) => {
    dispatch(createUserStart())
    try{
        const res = await axios.post(`/users/`, user, {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(createUserSuccess(res.data))
    }catch(err) {
        dispatch(createUserFailure())
    }
}

//UPDATE

export const updateUser = async (id, userUpdate, dispatch) => {
    dispatch(updateUserStart())
    try{
        const res = await axios.put(`/users/${id}`, userUpdate, {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
            }
        })
        dispatch(updateUserSuccess(res.data))
    }
    catch(err) {
        dispatch(updateUserFailure())
    }
}

//DELETE
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart())
    try{
        await axios.delete(`/users/${id}`, {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
            }
        })
        dispatch(deleteUserSuccess(id))
    }catch(err) {
        dispatch( deleteUserFailure())
    }
}
