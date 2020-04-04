import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Spin } from 'antd';
import { fetchMovieList, clearMovieList } from '../actions/actionCreators';
import SearchFilter from './SearchFilter';
import MovieListItem from './MovieListItem';
import { SHOW_ALL, SEARCH_FILTER } from '../actions/actionTypes';

const MovieList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.movies.isLoading);
  const movieList = useSelector((state) => {
    return getFilteredList(state.movies.data, state.searchBy);
  });


  useEffect(() => {
    dispatch(fetchMovieList());
    return () => {
      dispatch(clearMovieList());
    }
  }, [dispatch]);

  return (
    <div className="movie-container">
      <Row className="movieSearch">
        <SearchFilter />
      </Row>
      {!isLoading ?
        <Row className="movieList">
          {movieList && movieList.length > 0 ? movieList.map(item => (
            <MovieListItem key={item._id} movie={item} />
          )) : <div className="noMovieFound">No Movie Found</div>}
        </Row>
        : <Spin size="large" />
      }
    </div>
  )
}

const getFilteredList = (movies, searchObj) => {
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

export default MovieList;