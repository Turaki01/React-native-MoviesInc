import config from '../config/config';

export const GET_NOW_PLAYING = `${config.base_url}/movie/now_playing?api_key=${config.api_key}`;
export const GET_SELECTED_MOVIE = `${config.base_url}/movie`;
export const GET_GENRES = `${config.base_url}/genre/movie/list?api_key=${config.api_key}`;
