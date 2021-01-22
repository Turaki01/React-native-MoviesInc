import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native';
import {getListOfNowPlayingMovies} from '../api/api';
import ListItem from '../components/listItem';
import {sortingTitleAlphabetically} from '../utils/sortingFn';

const Home = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const params = new URLSearchParams();
    params.append('language', 'en-US');
    params.append('page', 1);
    await getListOfNowPlayingMovies(params)
      .then((res) => {
        setMovies(sortingTitleAlphabetically(res.data.results, 'title'));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Now Playing</Text>
      <FlatList
        key={movies.id}
        data={movies}
        renderItem={({item}) => <ListItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 17,
  },
  container: {
    flex: 1,
    padding: 15,
  },
});

export default Home;
