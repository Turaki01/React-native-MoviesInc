import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import config from '../config/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {withNavigation} from 'react-navigation';

const ListItem = ({item, navigation}) => {
  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('details', {item});
          }}>
          <Image
            source={{uri: `${config.imageBaseUrl}/${item.poster_path}`}}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.release_date}</Text>

        <Text>
          {item.vote_average}{' '}
          <MaterialCommunityIcons name="thumb-up" color="grey" size={17} />
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('details', {item});
          }}>
          <Text style={styles.viewMore}>View more</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('recommended', {item});
          }}>
          <Text style={styles.recommended}>Recommend Movies</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('similar', {item});
          }}>
          <Text style={styles.recommended}>Similar Movies</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    paddingTop: 8,
  },

  date: {
    fontSize: 12,
    paddingTop: 2,
  },

  recommended: {
    paddingTop: 10,
  },

  viewMore: {
    backgroundColor: '#02ad94',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 15,
    color: '#fff',
    borderRadius: 100 / 2,
  },
});

export default withNavigation(ListItem);
