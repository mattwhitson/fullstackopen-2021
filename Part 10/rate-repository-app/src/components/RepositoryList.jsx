import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { INIT_REPOSITORIES } from '../graphql/queries';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const repositoriesQuery = useQuery(INIT_REPOSITORIES)
  
  if(repositoriesQuery.loading) {
    return<Text>Loading...</Text>
  }

  const repositories = repositoriesQuery.data.repositories.edges.map(edge => edge.node)

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;