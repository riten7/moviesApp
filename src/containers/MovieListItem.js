import React from 'react';
import { Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { PLACEHOLDER_IMG } from '../actions/Constant';

const MovieListItem = ({ movie }) => {
  const { Meta } = Card;

  return (
    <>
      <Col key={movie._id} className="gutter-row" span={4}>
        <Link to={{ pathname: `/movie/${movie.id}`}}>
        <Card hoverable
          style={{ width: 240 }}
          cover={<img src={movie.poster ? movie.poster : PLACEHOLDER_IMG} className="card-img-top" alt={movie.title} />}>
          <Meta title={movie.title} description={movie.type} />
        </Card>
        </Link>
      </Col>
    </>
  );
}

// function checkURL(url) {
//     return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
// }

export default MovieListItem;