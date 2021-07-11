import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getMovie,
  getMovieEveryMinutes,
  isDoneDataChange,
  setDataToLocal,
} from './Main.action';
import ListMovie from '../../Components/ListMovie';

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [isRefesh, setIsRefresh] = useState(false);
  const movie = useSelector(state => state.movieReducer);
  const dispatch = useDispatch();

  const getDataLocal = async () => {
    try {
      const value = await AsyncStorage.getItem('movie');
      if (value !== null) {
        setMovies(JSON.parse(value));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsRefresh(false);
    dispatch(getMovie());
    getDataLocal();

    setInterval(() => {
      dispatch(getMovieEveryMinutes());
    }, 60000);

    if (movie.isChange) {
      setTimeout(() => {
        dispatch(isDoneDataChange());
      }, 10000);
    }
  }, []);

  const handleButton = data => {
    setIsRefresh(true);
    setDataToLocal(data);
    dispatch(isDoneDataChange());
  };

  if (movie.loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{flex: 1}}>
      <ListMovie data={movies} />
      {movie.isChange ? (
        <View style={styles.container}>
          <Text>Penyimpanan lokal telah diperbaharui</Text>
          <Button title="Tampilkan" onPress={() => handleButton(movie.movie)} />
        </View>
      ) : null}
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 20,
  },
});
