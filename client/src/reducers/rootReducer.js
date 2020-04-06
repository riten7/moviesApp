import { combineReducers } from 'redux';
import movieData from './moviesReducer';
import searchBy from './searchReducer';
import popupShown from './popupReducer';

export default combineReducers({
  movieData, 
  searchBy,
  popupShown
});