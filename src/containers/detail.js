import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from './react-redux-hooks';
import { Col, Row, Rate, Button, Spin } from 'antd';
import MoviePopup from './MoviePopup';
import { showMoviePopup, deleteMovieFromList, getMovieDetailById } from '../actions/actionCreators';
import { useHistory } from 'react-router-dom';

const MovieDetail = (props) => {
  const movieId = props.match.params.id;

  const dispatch = useDispatch();
  const history = useHistory();

  const {movieData, popupShown} = useSelector(state => state);
  const {movies, isLoading} = movieData;
  const handlEditMovie = useCallback(() => dispatch(showMoviePopup(true)), [dispatch]);
  
  useEffect(() => {
    dispatch(getMovieDetailById(movieId));
  }, [movieId, dispatch]);

  const handleDeleteMovie = useCallback(() => {
    dispatch(deleteMovieFromList(movieId));
    if(!isLoading) return history.push('/');
  }, [dispatch, isLoading, movieId, history]);

  return (
    <div className="movieDetail">
      {!isLoading ?
      <Row>
        <Col span={8}>
          <img alt={movies.title} width='85%' src={movies.poster} />
        </Col>
        <Col span={12}>
          <h1>{movies.title}</h1>
          <hr />
          <strong> Type: </strong>
          <p>{movies.type}</p>
          <hr />
          <strong> Released On: </strong>
          <p>{movies.date}</p>
          <hr />
          <strong> Rating: </strong>
          <Rate className='rate' value={parseInt(movies.rating)} />
          <hr />
          <strong> Description: </strong>
          <p>{movies.description}</p>
          <hr />
          <div className="actions-movie">
            <Button className="editMovieBtn" onClick={handlEditMovie}>Edit</Button>
            <Button className="deleteMovieBtn" onClick={handleDeleteMovie}>Delete</Button>
          </div>
        </Col>
      </Row> : <Spin size="large"/>}
      {popupShown ? <MoviePopup movie={movies} /> : null}
    </div>
  )
}

export default MovieDetail;