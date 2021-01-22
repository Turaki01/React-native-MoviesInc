import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import config from '../config/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {withNavigation} from 'react-navigation';
import {getRecommendationsApi} from '../api/api';
import ListItem from '../components/listItem';

const Recommended = ({navigation}) => {
  const selectedMovie = navigation.state.params.item.id;
  const [movies, setMovies] = useState([]);

  const getRecommendedMovies = async () => {
    const params = new URLSearchParams();
    params.append('language', 'en-US');
    params.append('api_key', config.api_key);
    await getRecommendationsApi(params, selectedMovie).then((res) => {
      setMovies(res.data.results);
    });
  };

  useEffect(() => {
    getRecommendedMovies();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.recommendedHeader}>Recommended Movies</Text>
      <FlatList
        key={movies.id}
        data={movies}
        renderItem={({item}) => <ListItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  recommendedHeader: {
    fontSize: 18,
  },
});

export default Recommended;
