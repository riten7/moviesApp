import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMoviePopup, addMovieToList, updateMovieInList } from '../actions/actionCreators';
import { Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';

const layout = { labelCol: { span: 6, }, wrapperCol: {span: 16, },};
const tailLayout = { wrapperCol: { offset: 16 },};

const MoviePopup = (props) => { 
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const moviePopupShown = useSelector(state => state.popup);
  const isLoading = useSelector(state => state.movies.isLoading);

  const closePopup = () => (dispatch(showMoviePopup(false)));

  const getInitialValues = () => {
    if (props.movie) {
      return {
        title: props.movie.title,
        type: props.movie.type,
        rating: parseInt(props.movie.rating),
        poster: props.movie.poster,
        description: props.movie.description,
        date: moment(props.movie.date, 'YYYY/MM/DD')
      }
    }
  }

  const onReset = () => {
    form.resetFields();
  };
  
  const handleSubmit = useCallback((values) => {
    if (!props.movie) { values.id = getMovieId(); }
    values.date = values.date.format('YYYY/MM/DD');
    props.movie ? dispatch(updateMovieInList(props.movie.id, values)) : dispatch(addMovieToList(values));
    if (!isLoading) {
      dispatch(showMoviePopup(false));
    }
  }, [dispatch, isLoading, props.movie]);

  const getMovieId = () => (Math.random().toString(36).replace('0.', ''));

  return (
    <Modal
      visible={moviePopupShown}
      title='Add Movie'
      onCancel={closePopup}
      footer={null}>
      <Form className="moviePopup" {...layout} form={form} initialValues={getInitialValues()} onFinish={handleSubmit}>
        <Form.Item name="title" label="Title"
          rules={[{ required: true, },]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type"
          rules={[{ required: true, },]}>
          <Select allowClear>
            <Option value="Movie">Movie</Option>
            <Option value="Series">Series</Option>
            <Option value="Documentary">Documentary</Option>
          </Select>
        </Form.Item>
        <Form.Item name="rating" label="Rating"
          rules={[{ required: true, },]}>
          <Select allowClear>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </Form.Item>
        <Form.Item name="date" label="Released on"
          rules={[{ required: true, },]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="poster" label="Poster"
          rules={[{ required: true, },]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description"
          rules={[{ required: true, },]}>
          <TextArea placeholder='Description...' autoSize />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="button" onClick={onReset}>Reset</Button>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default MoviePopup;