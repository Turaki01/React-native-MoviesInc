import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Favourite = () => {
  return (
    <View style={styles.container}>
      <Text>Favourite Works</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Favourite;
