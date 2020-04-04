import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, showMoviePopup } from '../actions/actionCreators';
import Popup from './Popup';
import { Col, Input, Button } from 'antd';

const SearchFilter = () => {
  const dispatch = useDispatch();
  const moviePopupShown = useSelector(state => state.popup);

  const handleInputChange = useCallback((e) => {
    dispatch(setSearchText(e.target.value));
  }, [dispatch]);

  const handleAddMovieBtn = useCallback(() => dispatch(showMoviePopup(true)), [dispatch]);

  return (
    <>
      <Col span={14} offset={3}>
        <Input className="searchInput" type="text" placeholder="Search your movie here..."
          onChange={handleInputChange} />
      </Col>
      <Col span={6} offset={1}>
        <Button className="addMovieBtn" type="primary" onClick={handleAddMovieBtn}>Add Movie</Button>
      </Col>
      {moviePopupShown ? <Popup /> : null}
    </>
  );
}

export default SearchFilter;