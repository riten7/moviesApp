import React from "react";
import { shallow, mount } from "enzyme";
import Popup from "../Popup";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import * as ReactReduxHooks from "../react-redux-hooks";
import {Provider} from 'react-redux';
import data from '../__mockData__/movielistData.json';

window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}))

describe("Component renders properly", () => {
  let store;
  let wrapper;
   beforeEach(() => {
    /* mocking store */
    store = configureStore([thunk])(data);

    /* mocking useSelector on our mock store */
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(state => store.getState());

    /* mocking useDispatch on our mock store  */
    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);  /* shallow rendering */
  });

  it("Test SearchFilter Component works", () => {
    wrapper = mount(<Provider store={store}><Popup/></Provider>);
    expect(wrapper.html()).toMatchSnapshot();

    wrapper.find('.ant-modal-close').simulate('click');
    expect(store.getActions()).toEqual( [{"payload": {"isShown": false}, "type": "POPUP_SHOWN"}])

    const handleSubmit = jest.fn();
    wrapper.find('.ant-btn-primary').simulate('click');
    expect(handleSubmit).not.toHaveBeenCalled();

    wrapper.find('#title').at(0).simulate('change', { target: {value: 'MR' }})
    wrapper.find('#type').at(0).simulate('change', { target: {value: 'Movie' }})
    wrapper.find('#rating').at(0).simulate('change', { target: {value: '1' }})
    wrapper.find('#poster').at(0).simulate('change', { target: {value: 'werty' }})
    wrapper.find('#description').at(0).simulate('change', { target: {value: 'wertyui' }})
    wrapper.find("input[placeholder='Select date']").first().simulate('change', { target: {value: '2020-04-07' }})
    wrapper.find('.ant-btn-primary').simulate('click');
    //expect(handleSubmit).toHaveBeenCalled();
    //console.log(wrapper.find("input[placeholder='Select date']"))
  });
});