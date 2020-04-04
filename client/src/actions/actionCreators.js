import axios from 'axios';
import { FETCH_START, FETCH_MOVIES, CLEAR_MOVIES, GET_MOVIE_DETAIL, SEARCH_FILTER, ADD_MOVIE, DELETE_MOVIE, POPUP_SHOWN } from './actionTypes';
import { BASE_URL } from './Constant';

export const clearMovieList = () => ({
  type: CLEAR_MOVIES
});

export const fetchMovieList = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios.get(BASE_URL + 'getAllMovies')
      .then(response => {
        dispatch({ type: FETCH_MOVIES, payload: response.data });
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const getMovieDetailById = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios.get(BASE_URL + "getMovie/" + id)
      .then(response => {
        dispatch({ type: GET_MOVIE_DETAIL, payload: response.data });
      })
  }
}

export const addMovieToList = (data) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios.post(BASE_URL + "insertMovie", data)
    .then((response) => {
      dispatch({ type: ADD_MOVIE, payload: response.data })
    })
  }
}

export const updateMovieInList = (id, data) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios.put(BASE_URL + "updateMovie/" + id, data)
    .then(() => {
      dispatch(getMovieDetailById(id));
    })
  }
}

export const deleteMovieFromList = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios.delete(BASE_URL + "deleteMovie/" + id)
    .then(() => {
      dispatch({ type: DELETE_MOVIE })
    })
  }
}

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