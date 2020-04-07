import { SHOW_ALL, SEARCH_FILTER } from '../actions/actionTypes';
export const getFilteredList = (movies, searchType, searchText) => {
    switch (searchType) {
      case SHOW_ALL:
        return movies;
      case SEARCH_FILTER:
        return movies.flat().filter(item => {
          let title = item.title.toLowerCase();
          return title.indexOf(searchText.toLowerCase()) > -1;
        });
      default:
        return movies;
    }
  }