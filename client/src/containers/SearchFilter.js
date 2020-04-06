import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, showMoviePopup } from '../actions/actionCreators';
import Popup from './Popup';
import { Col, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const SearchFilter = () => {
  const dispatch = useDispatch();
  const moviePopupShown = useSelector(state => state.popupShown);

  const handleInputChange = useCallback((e) => {
    dispatch(setSearchText(e.target.value));
  }, [dispatch]);

  const handleAddMovieBtn = useCallback(() => dispatch(showMoviePopup(true)), [dispatch]);

  return (
    <>
    <div className="search-form">
      <Col>
        <Input className="searchInput" type="text" placeholder="Search your movie here..."
          onChange={handleInputChange} />
          <p>Search your favourite movies by typing.</p>
      </Col>
      <Col>
        <Button className="addMovieBtn" type="primary" onClick={handleAddMovieBtn}><PlusOutlined /></Button>
      </Col>
      </div>
      {moviePopupShown ? <Popup /> : null}
    </>
  );
}

export default SearchFilter;