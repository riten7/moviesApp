import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from './react-redux-hooks';
import { Col, Row, Rate, Button, Spin } from 'antd';
import MoviePopup from './MoviePopup';
import ConfirmationPoup from './ConfirmationPopup';
import { deleteMovieFromList, getMovieDetailById, updateMovieInList } from '../actions/actionCreators';
import { useHistory } from 'react-router-dom';

const MovieDetail = (props) => {
  const movieId = props.match.params.id;

  const [popupDisplay, setPopupDisplay] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { movies, status } = useSelector(state => state.movieActions);
  const setPopupState = (value) => setPopupDisplay(value);

  useEffect(() => {
    dispatch(getMovieDetailById(movieId));
  }, [movieId, dispatch]);

  useEffect(() => {
    if (status === 'completed') {
      setPopupDisplay(false);
    }
  }, [status]);

  const submitMovie = (values) => {
    dispatch(updateMovieInList(movieId, values))
  }

  const closePopup = () => setDeletePopup(false);

  const handleDeleteMovie = async() => {
    closePopup();
    await dispatch(deleteMovieFromList(movieId));
    if (status === 'completed') { history.push('/'); }
  };

  const handleDeleteBtn = () => setDeletePopup(true);

  const handleBackBtn = useCallback(() => {
    history.push('/');
  }, [history])

  return (
    <div className="movieDetail">
      {status === 'completed' ?
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
              <Button className="editMovieBtn" onClick={setPopupState}>Edit</Button>
              <Button className="deleteMovieBtn" onClick={handleDeleteBtn}>Delete</Button>
              <Button className="goBackBtn" onClick={handleBackBtn}>Back</Button>
            </div>
          </Col>
        </Row> : <Spin size="large" />}
      {popupDisplay ? <MoviePopup
        movie={movies}
        submitMovie={submitMovie}
        setPopupState={setPopupState} /> : null}

        {deletePopup ? <ConfirmationPoup title={movies.title}
        closePopup={closePopup}
        handleDeleteMovie={handleDeleteMovie}/> : null}
    </div>
  )
}

export default MovieDetail;