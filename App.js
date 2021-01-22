/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from './screens/home';
import Favourite from './screens/favourite';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './components/header';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Details from './screens/details';
import Recommended from './screens/recommended';
import Similar from './screens/similar';

const Tab = createMaterialBottomTabNavigator();

const App = createStackNavigator(
  {
    home: Home,
    details: Details,
    recommended: Recommended,
    similar: Similar,
  },
  {
    initialRouteName: 'home',
    defaultNavigationOptions: {
      title: 'Movies Inc',
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default createAppContainer(App);
