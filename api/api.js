import config from '../config/config';
import {GET, POST} from './constants';
import {GET_GENRES, GET_NOW_PLAYING, GET_SELECTED_MOVIE} from './endpoints';
import {axiosInstance} from './method';

// function to get list of now playing movies
export const getListOfNowPlayingMovies = (params) => {
  return axiosInstance({
    method: GET,
    url: GET_NOW_PLAYING,
    params,
  });
};

// function to get list of genres
export const getListOfGenreApi = (params) => {
  return axiosInstance({
    method: GET,
    url: GET_GENRES,
    params,
  });
};

//function to rate
export const rateMovieApi = (params, id, data) => {
  return axiosInstance({
    method: POST,
    url: `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${config.api_key}&guest_session_id=57952b448e3a3e8c6841b27d41d459ad`,
    params,
    data,
  });
};

// function to get credits
export const getCastsApi = (params, id) => {
  return axiosInstance({
    method: GET,
    url: `${GET_SELECTED_MOVIE}/${id}/credits`,
    params,
  });
};

// function to get similar
export const getSimilarApi = (params, id) => {
  return axiosInstance({
    method: GET,
    url: `${GET_SELECTED_MOVIE}/${id}/similar`,
    params,
  });
};

// function to get recommended
export const getRecommendationsApi = (params, id) => {
  return axiosInstance({
    method: GET,
    url: `${GET_SELECTED_MOVIE}/${id}/recommendations`,
    params,
  });
};
