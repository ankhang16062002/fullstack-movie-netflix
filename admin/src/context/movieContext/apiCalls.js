import axios from 'axios'
import {getMoviesStart, getMoviesFailure, getMoviesSuccess} from './MovieAction'
import { 
    deleteMoviesStart, 
    deleteMoviesSuccess, 
    deleteMoviesFailure,
    createMovieStart, 
    createMovieSuccess, 
    createMovieFailure,
} from './MovieAction'

//GET

export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart())
    try{
        const res = await axios.get('/movies', {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(getMoviesSuccess(res.data))
    }catch(err) {
        dispatch(getMoviesFailure())
    }
}

//CREATE
export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart())
    try{
        const res = await axios.post(`/movies/`, movie, {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(createMovieSuccess(res.data))
    }catch(err) {
        dispatch(createMovieFailure())
    }
}

//UPDATE làm sau

//DELETE
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMoviesStart())
    try{
        await axios.delete(`/movies/${id}`, {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(deleteMoviesSuccess(id))
    }catch(err) {
        dispatch( deleteMoviesFailure())
    }
}

//