import React from 'react';
import { Text, View } from 'react-native';

const RepositoryItem = ({item}) => {
    return (
    <View>
        <Text>Full Name: {item.fullName}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Language: {item.language}</Text>
        <Text>Stars: {item.stargazersCount}</Text>
        <Text>Forks: {item.forksCount}</Text>
        <Text>Total Reviews: {item.reviewCount}</Text>
        <Text>Rating: {item.ratingAverage}</Text>
    </View>
    )
}

export default RepositoryItem;