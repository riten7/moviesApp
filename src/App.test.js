import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render } from "enzyme";
import App from "./App";
import configureStore from "./store/reduxStore";

let store = configureStore();
beforeEach(() => {});
test("renders learn react link", () => {
  const wrapper = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  expect(wrapper.html()).toMatchSnapshot();
});