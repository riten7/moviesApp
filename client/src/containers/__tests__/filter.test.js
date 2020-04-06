import movie from '../__mockData__/movie.json';
import movies from '../__mockData__/movies.json';
import { SHOW_ALL, SEARCH_FILTER } from '../../actions/actionTypes';
import { getFilteredList } from '../filter';

describe("filter works correctly", () => {
  it("with no search text",  () => {
    const list = getFilteredList(movies, { type:SHOW_ALL, text:'' });
    expect(list).toEqual(movies);
  })
  it("with some text on the seach field", () => {
    const list = getFilteredList(movies, { type:SEARCH_FILTER, text:'est Case' });
    expect(list).toEqual([movie]);
  });
});
