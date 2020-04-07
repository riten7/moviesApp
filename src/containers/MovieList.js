import React from 'react';
import { useSelector, useDispatch } from './react-redux-hooks';
import { Row, Spin } from 'antd';
import { fetchMovieList, clearMovieList } from '../actions/actionCreators';
import SearchFilter from './SearchFilter';
import MovieListItem from './MovieListItem';
import { getFilteredList } from './filter';
import { FileSearchOutlined } from '@ant-design/icons';

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector(state => state.movieList);
  const {type, text} = useSelector(state => state.searchBy);
  const movieList = getFilteredList(movies, type, text);

  React.useEffect(() => {
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
      {status === 'completed' ?
        <Row className="movieList">
          {movieList && movieList.length > 0 ? movieList.map(item => (
            <MovieListItem key={item._id} movie={item} />
          )) : <div className="noMovieFound"><FileSearchOutlined /><p>No Movie Found</p></div>}
        </Row>
        : <Spin size="large" />
      }
    </div>
  )
}

export default MovieList;