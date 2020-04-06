import axios from 'axios';
import { FETCH_START, FETCH_MOVIES, CLEAR_MOVIES, GET_MOVIE_DETAIL, SEARCH_FILTER, ADD_MOVIE, 
DELETE_MOVIE, POPUP_SHOWN, MOVIE_ERROR } from './actionTypes';
import { BASE_URL } from './Constant';

export const clearMovieList = () => ({
  type: CLEAR_MOVIES
});

export const setSearchText = (searchtext) => ({
  type: SEARCH_FILTER,
  payload: { searchtext }
});

export const showMoviePopup = (value) => ({
  type: POPUP_SHOWN,
  payload: {
    isShown: value
  }
});

export const fetchMovieList = () => {
  return async dispatch => {
    dispatch({ type: FETCH_START });
    try {
      const response = await axios.get(BASE_URL + 'getAllMovies');
      dispatch({ type: FETCH_MOVIES, payload: response.data });
    } catch {
      dispatch({ type: MOVIE_ERROR });
    }
  };
};

export const getMovieDetailById = (id) => {
  return async dispatch => {
    dispatch({ type: FETCH_START });
    try {
      const response = await axios.get(BASE_URL + "getMovie/" + id);
      dispatch({ type: GET_MOVIE_DETAIL, payload: response.data });
    } catch {
      dispatch({ type: MOVIE_ERROR });
    }
  }
}

export const addMovieToList = (data) => {
  return async dispatch => {
    dispatch({ type: FETCH_START });
    try {
      const response = axios.post(BASE_URL + "insertMovie", data);
      dispatch({ type: ADD_MOVIE, payload: response.data })
    } catch {
      dispatch({ type: MOVIE_ERROR });
    }

  }
}

export const updateMovieInList = (id, data) => {
  return async dispatch => {
    dispatch({ type: FETCH_START });
    try {
      await axios.put(BASE_URL + "updateMovie/" + id, data);
      dispatch(getMovieDetailById(id));
    } catch {
      dispatch({ type: MOVIE_ERROR })
    }
  }
}

export const deleteMovieFromList = (id) => {
  return async dispatch => {
    dispatch({ type: FETCH_START });
    try {
      const response = await axios.delete(BASE_URL + "deleteMovie/" + id);
      console.log(response);
      dispatch({ type: DELETE_MOVIE });
    } catch {
      dispatch({ type: MOVIE_ERROR })
    }
  }
}