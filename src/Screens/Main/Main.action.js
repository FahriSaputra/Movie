import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchStart = () => dispatch => {
  dispatch({
    type: 'FETCH_START',
  });
};

export const fetchEnd = () => dispatch => {
  dispatch({
    type: 'FETCH_END',
  });
};

export const fetchFailed = data => dispatch => {
  dispatch({
    type: 'FETCH_FAILED',
    payload: data,
  });
};

export const fetchSuccessful = data => dispatch => {
  dispatch({
    type: 'FETCH_SUCCESSFUL',
    payload: data,
  });
};

export const isDataChange = () => dispatch => {
  dispatch({
    type: 'IS_CHANGE',
  });
};

export const isDoneDataChange = () => dispatch => {
  dispatch({
    type: 'DONE_CHANGE',
  });
};

export const setDataToLocal = async data => {
  try {
    const movie = JSON.stringify(data);
    await AsyncStorage.setItem('movie', movie);
  } catch (err) {
    console.log(err);
  }
};

export const getDataLocal = async () => {
  try {
    const value = await AsyncStorage.getItem('movie');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getMovie = () => async dispatch => {
  try {
    dispatch(fetchStart());
    const response = await axios(
      'https://api.themoviedb.org/3/discover/movie?api_key=f7b67d9afdb3c971d4419fa4cb667fbf',
    );

    const movie = await response.data.results.slice(0, 10);
    setDataToLocal(movie);
    dispatch(fetchSuccessful(movie));
    dispatch(fetchEnd());
  } catch (err) {
    dispatch(fetchFailed(err));
  }
};

export const getMovieEveryMinutes = () => async dispatch => {
  try {
    const response = await axios(
      'https://api.themoviedb.org/3/discover/movie?api_key=f7b67d9afdb3c971d4419fa4cb667fbf',
    );

    const prevData = await getDataLocal();
    const movie = await response.data.results.slice(0, 10);

    if (JSON.stringify(prevData) !== JSON.stringify(movie)) {
      dispatch(fetchSuccessful(movie));
      dispatch(isDataChange());
    }

    if (JSON.stringify(prevData) === JSON.stringify(movie)) {
      setDataToLocal(movie);
    }
  } catch (err) {
    dispatch(fetchFailed(err));
  }
};
