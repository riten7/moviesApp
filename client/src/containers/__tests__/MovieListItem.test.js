import React from "react";
import { mount } from "enzyme";
import MovieListItem from "../MovieListItem";
import { BrowserRouter } from 'react-router-dom';
import movie from '../__mockData__/movie.json';

describe("Component renders properly", () => {
  it("Test MovieListItem Value", () => {
    const wrapper = mount(<BrowserRouter><MovieListItem movie={movie} /></BrowserRouter>);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find("img").prop("src")).toEqual('https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg');
    expect(wrapper.find('[href="/movie/burx2s81pa"]').at(0).length).toBe(1);
    expect(wrapper.find('.ant-card-meta-description').text()).toEqual('Documentary');
  });
});