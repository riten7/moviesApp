import React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import * as ReactReduxHooks from "../react-redux-hooks";
import MovieList from "../MovieList";
import data from '../__mockData__/movielistData.json';
import movies from '../__mockData__/movies.json';
import MovieListItem from "../MovieListItem";
import { Provider } from 'react-redux';

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

describe("Movie List", () => {
  let wrapper;
  let useEffect;
  let store;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    /* mocking store */
    store = configureStore([thunk])(data);
    /* mocking useEffect */
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect(); // 2 times
    mockUseEffect(); //   

    /* mocking useSelector on our mock store */
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(state => store.getState());

    /* mocking useDispatch on our mock store  */
    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);  /* shallow rendering */
    wrapper = mount(<Provider store={store}><MovieList /> </Provider>);
  });

  it("dispatch movie list to store works", () => {
    const actions = store.getActions();
    expect(actions).toEqual([{ type: "FETCH_START" },
    { type: "FETCH_MOVIES", payload: movies }]);
  });

  it("should render MovieListItem components with movies", () => {
    expect(wrapper.find(MovieListItem)).toHaveLength(5);
  });
}); 