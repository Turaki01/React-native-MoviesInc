import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import ListItem from '../components/listItem';
import config from '../config/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {withNavigation} from 'react-navigation';
import {getRecommendationsApi, getSimilarApi} from '../api/api';

const Similar = ({navigation}) => {
  const selectedMovie = navigation.state.params.item.id;
  const [movies, setMovies] = useState([]);

  const getSimilarMovies = async () => {
    const params = new URLSearchParams();
    params.append('language', 'en-US');
    params.append('api_key', config.api_key);

    await getSimilarApi(params, selectedMovie).then((res) => {
      setMovies(res.data.results);
    });
  };

  useEffect(() => {
    getSimilarMovies();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.recommendedHeader}>Similar Movies</Text>

      {movies.length > 0 && (
        <FlatList
          key={movies.id}
          data={movies}
          renderItem={({item}) => <ListItem item={item} />}
        />
      )}

      {movies.length === 0 && (
        <View style={styles.emptyStates}>
          <Text>Nothing to see here</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  emptyStates: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  recommendedHeader: {
    fontSize: 18,
  },
});
export default Similar;
