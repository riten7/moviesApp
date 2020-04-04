import { FETCH_START, FETCH_MOVIES, GET_MOVIE_DETAIL, CLEAR_MOVIES, ADD_MOVIE, DELETE_MOVIE } from '../actions/actionTypes';

const initialData = {
  isLoading: false,
  data: {}, 
  updateSuccess: false
};

const moviesReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, isLoading: true };

    case FETCH_MOVIES:
      return { ...state, isLoading: false, data: action.payload };

    case GET_MOVIE_DETAIL:
      return { ...state, isLoading: false, data: action.payload };

    case ADD_MOVIE:
      return { ...state, isLoading: false, data: action.payload };
    
    case DELETE_MOVIE:
      return { ...state, isLoading: false };

    case CLEAR_MOVIES:
    default:
      return state;
  }
}

export default moviesReducer;