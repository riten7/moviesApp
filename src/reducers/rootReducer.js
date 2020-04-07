import { combineReducers } from 'redux';
import movieList from './moviesListReducer';
import movieActions from './movieActionReducer';
import searchBy from './searchReducer';

export default combineReducers({
  movieList,
  movieActions,
  searchBy
});