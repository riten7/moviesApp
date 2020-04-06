import { SHOW_ALL, SEARCH_FILTER } from '../actions/actionTypes';
export const getFilteredList = (movies, searchObj) => {
    switch (searchObj.type) {
      case SHOW_ALL:
        return movies;
      case SEARCH_FILTER:
        return movies.flat().filter(item => {
          let title = item.title.toLowerCase();
          return title.indexOf(searchObj.text.toLowerCase()) > -1;
        });
      default:
        return movies;
    }
  }