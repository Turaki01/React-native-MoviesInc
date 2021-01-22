import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

Header.defaultProps = {
  title: 'Movies Inc',
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
  },

  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#02ad94',
  },
});

export default Header;
