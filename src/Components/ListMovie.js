import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

const ListMovie = ({data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>{item.original_title}</Text>
            <Text>{item.release_date}</Text>
          </View>
        );
      }}
    />
  );
};

export default ListMovie;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  title: {
    fontSize: 20,
  },
});
