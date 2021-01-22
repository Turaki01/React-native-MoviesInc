import React, {useEffect, useState} from 'react';
import {Image, Text, View, StyleSheet, Alert} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {getCastsApi, getListOfGenreApi, rateMovieApi} from '../api/api';
import config from '../config/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Carousel from 'react-native-snap-carousel';
import {axiosInstance} from '../api/method';
import {withNavigation} from 'react-navigation';

const Details = ({navigation}) => {
  const selectedMovie = navigation.state.params.item;

  const [genres, setGenres] = useState([]);
  const [retrivedGenreNames, setRetrivedGenreNames] = useState([]);

  const [credits, setCredits] = useState([]);

  const getListOfGenres = async () => {
    const params = new URLSearchParams();
    params.append('language', 'en-US');

    await getListOfGenreApi(params)
      .then((res) => setGenres(res.data.genres))
      .catch((error) => console.error(error));
  };

  const getGenreNames = () => {
    selectedMovie.genre_ids.forEach((id) =>
      setRetrivedGenreNames(genres.filter((genre) => genre.id === id)),
    );
  };

  const SubmitRating = async (rating) => {
    const params = new URLSearchParams();
    params.append('language', 'en-US');
    params.append('api_key', config.api_key);
    params.append('guest_session', config.guest_Session);

    const data = {
      value: Number(rating * 2),
    };

    await rateMovieApi(params, selectedMovie.id, data).then((res) => {
      if (res.status === 201) {
        Alert.alert(
          'Successful',
          'Review recieved, thanks',
          [{text: 'OK', onPress: () => navigation.navigate('home')}],
          {cancelable: false},
        );
      }
    });
  };

  const getCredits = async () => {
    const params = new URLSearchParams();
    params.append('language', 'en-US');
    params.append('api_key', config.api_key);

    await getCastsApi(params, selectedMovie.id).then((res) =>
      setCredits(res.data.cast),
    );
  };

  useEffect(() => {
    getListOfGenres();
    getCredits();
  }, []);

  useEffect(() => {
    if (genres.length > 0) {
      if (selectedMovie) {
        getGenreNames();
      }
    }
  }, [genres]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{
            uri: selectedMovie
              ? `${config.imageBaseUrl}/${selectedMovie.poster_path}`
              : '',
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>{selectedMovie && selectedMovie.title}</Text>
        <Text style={styles.date}>
          Released {selectedMovie && selectedMovie.release_date.substr(0, 4)}
        </Text>

        <Text>
          {selectedMovie && selectedMovie.vote_average}{' '}
          <MaterialCommunityIcons name="thumb-up" color="grey" size={17} />
        </Text>

        <FlatList
          key={retrivedGenreNames.id}
          data={retrivedGenreNames}
          renderItem={({item}) => (
            <Text key={item.id} style={styles.genreDiv}>
              {item.name}
            </Text>
          )}
        />

        <Text style={styles.overview}>Overview</Text>

        <Text>{selectedMovie && selectedMovie.overview}</Text>

        <Text style={styles.overview}>Cast(s)</Text>

        <FlatList
          data={credits}
          keyExtractor={(credit) => credit.id}
          renderItem={({item}) => (
            <View style={styles.character}>
              <View style={styles.chkdiv}>
                <Text style={styles.chk}>Character:</Text>
                <Text>{item.character}-</Text>
              </View>
              <View style={styles.chkdiv}>
                <Text style={styles.chk}>Real Name:</Text>
                <Text>{item.original_name}</Text>
              </View>
            </View>
          )}
        />

        <Text style={styles.ratingHeader}>Please rate the movie</Text>

        <AirbnbRating
          count={5}
          defaultRating={selectedMovie && selectedMovie.vote_average / 2}
          ratingColor="#3498db"
          ratingBackgroundColor="#c8c7c8"
          onFinishRating={SubmitRating}
          size={15}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },

  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ratingHeader: {
    paddingTop: 10,
    textAlign: 'center',
  },

  overview: {
    paddingTop: 8,
    paddingBottom: 4,
    fontSize: 16,
  },

  title: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '500',
    paddingTop: 15,
  },

  date: {
    fontSize: 12,
    paddingTop: 5,
  },

  viewMore: {
    backgroundColor: '#02ad94',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 15,
    color: '#fff',
    borderRadius: 100 / 2,
  },

  genreDiv: {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 100 / 2,
    textAlign: 'center',
    paddingVertical: 2,
    marginVertical: 10,
    maxWidth: 100,
  },

  actor: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    marginBottom: 30,
  },
  character: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  chk: {
    fontWeight: 'bold',
  },
  chkdiv: {
    flexDirection: 'row',
    marginLeft: 10,
  },
});

export default withNavigation(Details);
