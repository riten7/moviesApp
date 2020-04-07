import React from "react";
import { shallow, mount } from "enzyme";
import MoviePopup from "../MoviePopup";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import * as ReactReduxHooks from "../react-redux-hooks";
import {Provider} from 'react-redux';
import data from '../__mockData__/movielistData.json';
import moment from 'moment';

const ipdata = {
      title: 'ytr',
      type: 'hj',
      rating: '1',
      poster: 'hgfgh',
      description: 'jkjlk',
      date: moment('2020/01/01', 'YYYY/MM/DD')}

window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}))

describe("Component renders properly", () => {
  let store;
  let wrapper;
   beforeEach(() => {
    store = configureStore([thunk])(data);
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(state => store.getState());
    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);
  });

  it("Test Submit function works", () => {
    const setPopupState= jest.fn();
    const submitMovie = jest.fn();
    wrapper = mount(<Provider store={store}><MoviePopup 
    setPopupState={setPopupState}
    submitMovie={submitMovie}/></Provider>);
    expect(wrapper.html()).toMatchSnapshot();

    wrapper.find('.moviePopup').at(0).props().form.setFieldsValue(ipdata);
    wrapper.find('.ant-btn.ant-btn-primary').simulate('submit');
    //expect(submitMovie).toHaveBeenCalled();
  });
});