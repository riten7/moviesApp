import movies from '../__mockData__/movies.json';
export default {
  get: jest.fn(() => Promise.resolve( { data: movies } )),
  post: jest.fn(() => Promise.resolve( { data: movies }))
};
