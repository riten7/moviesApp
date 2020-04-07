import React from "react";
import { mount } from "enzyme";
import SearchFilter from "../SearchFilter";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import * as ReactReduxHooks from "../react-redux-hooks";
import {Provider} from 'react-redux';
import data from '../__mockData__/movielistData.json';
import movies from '../__mockData__/movies.json';

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
    wrapper = mount(<Provider store={store}><SearchFilter/></Provider>);
    expect(wrapper.html()).toMatchSnapshot();

    wrapper.find('.addMovieBtn').at(0).simulate("click");
    expect(store.getState().movieList.status).toEqual('completed');
    expect(store.getState().movieList.movies).toEqual(movies);

    wrapper.find('.searchInput').at(0).simulate('change', { target: {value: 'MR' }});
    expect(store.getActions()).toEqual( [{"payload": {"searchtext": "MR"}, "type": "SEARCH_FILTER"}] );
  });
});