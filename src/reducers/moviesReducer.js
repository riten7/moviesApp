import { FETCH_START, FETCH_MOVIES, GET_MOVIE_DETAIL, CLEAR_MOVIES, ADD_MOVIE, DELETE_MOVIE, MOVIE_ERROR } from '../actions/actionTypes';

const initialData = {
  isLoading: false,
  movies: {}, 
  hasError: false
};

const moviesReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, isLoading: true };

    case FETCH_MOVIES:
      return { ...state, isLoading: false, movies: action.payload };

    case GET_MOVIE_DETAIL:
      return { ...state, isLoading: false, movies: action.payload };

    case ADD_MOVIE:
      return { ...state, isLoading: false, movies: action.payload };
    
    case DELETE_MOVIE:
      return { ...state, isLoading: false };

    case MOVIE_ERROR:
      return { ...state, hasError: true }

    case CLEAR_MOVIES:
    default:
      return state;
  }
}

export default moviesReducer;