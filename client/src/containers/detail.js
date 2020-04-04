import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Rate, Button, Spin } from 'antd';
import Popup from './Popup';
import { showMoviePopup, deleteMovieFromList, getMovieDetailById } from '../actions/actionCreators';
import { useHistory } from 'react-router-dom';

const MovieDetail = (props) => {
  const movieId = props.match.params.id;

  const dispatch = useDispatch();
  const history = useHistory();

  const movieDetail = useSelector(state => state.movies.data);
  const popupShown = useSelector(state => state.popup);
  
  const handlEditMovie = useCallback(() => dispatch(showMoviePopup(true)), [dispatch]);
  const isLoading = useSelector(state => state.movies.isLoading);

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
        <Col span={8} offset={1}>
          <img alt={movieDetail.title} width='85%' src={movieDetail.poster} />
        </Col>
        <Col span={12} offset={1}>
          <h1>{movieDetail.title}</h1>
          <hr />
          <strong> Type: </strong>
          <p>{movieDetail.type}</p>
          <hr />
          <strong> Released On: </strong>
          <p>{movieDetail.date}</p>
          <hr />
          <strong> Description: </strong>
          <p>{movieDetail.description}</p>
          <hr />
          <Rate className='rate' value={parseInt(movieDetail.rating)} />
          <hr />
          <div className="actions-movie">
            <Button className="editMovieBtn" onClick={handlEditMovie}>Edit</Button>
            <Button className="deleteMovieBtn" onClick={handleDeleteMovie}>Delete</Button>
          </div>
        </Col>
      </Row> : <Spin size="large"/>}
      {popupShown ? <Popup movie={movieDetail} /> : null}
    </div>
  )
}

export default MovieDetail;