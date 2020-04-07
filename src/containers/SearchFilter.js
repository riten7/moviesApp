import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, addMovieToList } from '../actions/actionCreators';
import MoviePopup from './MoviePopup';
import { Col, Input, Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const SearchFilter = () => {
  const [popupDisplay, setPopupDisplay] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.movieList);

  useEffect(() => {
    if (status === 'completed') {
      setPopupDisplay(false);
    }
  }, [status]);

  const handleInputChange = useCallback((e) => {
    dispatch(setSearchText(e.target.value));
  }, [dispatch]);

  const submitMovie = (values) => {
    setLoader(true);
    dispatch(addMovieToList(values));
  }

  const setPopupState = (value) => setPopupDisplay(value);

  return (
    <>
      <div className="search-form">
        <Col>
          <Input className="searchInput" type="text" placeholder="Search your movie here..."
            onChange={handleInputChange} />
          <p>Search your favourite movies by typing.</p>
        </Col>
        <Col>
          <Button className="addMovieBtn" type="primary" onClick={setPopupState}><PlusOutlined /></Button>
        </Col>
      </div>
      {popupDisplay ?<MoviePopup
        submitMovie={submitMovie}
        setPopupState={setPopupState} />: null}
    </>
  );
}

export default SearchFilter;