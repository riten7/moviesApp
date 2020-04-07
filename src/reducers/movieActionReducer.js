import { FETCH_START, FETCH_MOVIE_DETAIL, UPDATE_MOVIE, DELETE_MOVIE } from '../actions/actionTypes';

const initialData = {
  status: 'default',
  movies: {}
};


const movieActionReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, status: 'loading' , isLoading: true};

    case FETCH_MOVIE_DETAIL:
    case UPDATE_MOVIE:
      return { ...state, status: 'completed', isLoading: false,  movies: action.payload };
    
    case DELETE_MOVIE:
      return { ...state, status: 'completed' };

    default:
      return state;
  }
}

export default movieActionReducer;