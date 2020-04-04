import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMoviePopup } from '../actions/actionCreators';
import { BASE_URL } from '../actions/Constant';
import { Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const layout = { labelCol: { span: 6, }, wrapperCol: {span: 16, },};
const tailLayout = { wrapperCol: { offset: 16 },};

const MoviePopup = (props) => { 
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const history = useHistory();
  const dispatch = useDispatch();
  const moviePopupShown = useSelector(state => state.popup);

  const closePopup = () => (dispatch(showMoviePopup(false)));

  const getBaseUrl = () => {
    return false ? BASE_URL + "/movie/" + props.movie.id : BASE_URL + "/movie";
  }


  // const addMovieToDb = useCallback((data) => {
  //   fetch(getBaseUrl(), {
  //     method: false ? 'PUT' : 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: data,
  //   })
  //     .then(res => res.json())
  //     .then((response) => {
  //       dispatch(showMoviePopup(false));
  //       if (!isEditMode) { dispatch(addMovieToList(response)); }
  //       return history.push('/');
  //     })
  //     .catch(() => console.log('error'));
  // }, [history, dispatch]);

  const onReset = () => {
    form.resetFields();
  };

  const handleSubmit = (values) => {
    values.id = getMovieId();
    values.date = values.date.format('YYYY/MM/DD');;
    // addMovieToDb(JSON.stringify(values));
  }

  const getMovieId = () => (Math.random().toString(36).replace('0.', ''));

  return (
    <Modal
      visible={moviePopupShown}
      title='Add Movie'
      onCancel={closePopup}
      footer={null}>
      <Form className="moviePopup" {...layout} form={form} onFinish={handleSubmit}>
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