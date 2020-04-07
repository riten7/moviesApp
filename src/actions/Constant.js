export const BASE_URL = 'https://movies7ervice.herokuapp.com/'; //'http://localhost:9000/';
export const PLACEHOLDER_IMG = 'https://placeimg.com/640/480/nature';

export const isValidImageLink = (url) => { return (url.match(/\.(jpeg|jpg|gif|png)$/) != null); }