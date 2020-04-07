import movie from '../__mockData__/movie.json';
import movies from '../__mockData__/movies.json';
import { SHOW_ALL, SEARCH_FILTER } from '../../actions/actionTypes';
import { getFilteredList } from '../filter';

describe("filter works correctly", () => {
  it("with no search text",  () => {
    const list = getFilteredList(movies, SHOW_ALL, '' );
    expect(list).toEqual(movies);
  })
  it("with some text on the seach field", () => {
    const list = getFilteredList(movies, SEARCH_FILTER, 'est Case' );
    expect(list).toEqual([movie]);
  });
});
