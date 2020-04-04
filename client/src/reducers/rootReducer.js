import { combineReducers } from 'redux';
import movies from './moviesReducer';
import searchBy from './searchReducer';
import popup from './popupReducer';

export default combineReducers({
  movies, 
  searchBy,
  popup
});