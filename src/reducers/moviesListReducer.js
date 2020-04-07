import { FETCH_START, FETCH_MOVIES, CLEAR_MOVIES, ADD_MOVIE, MOVIE_ERROR } from '../actions/actionTypes';

const initialData = {
  status: 'default',
  movies: {}
};

const moviesReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, status: 'loading' };

    case FETCH_MOVIES:
      return { ...state, status: 'completed', movies: action.payload };

    case ADD_MOVIE:
      return { ...state, status: 'completed', movies: action.payload };
    
    case MOVIE_ERROR:
      return { ...state, status: 'error'}

    case CLEAR_MOVIES:
    default:
      return state;
  }
}

export default moviesReducer;