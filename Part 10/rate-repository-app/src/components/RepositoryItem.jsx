import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const RepositoryItem = ({item}) => {

    const styles = StyleSheet.create({
        text: {
          
        },
        tinyLogo : {
            width: 50,
            height: 50,
        },
        flexContainerRow: {
            display: 'flex',
            flexDirection: 'row',
          },
        flexContainer: {
            display: 'flex',
            paddingLeft: 10,
        }, 
        language: {
            marginLeft: 50,
            marginRight: 260,
            width: 'auto',
            height: 'auto',
            textAlign: 'center',
            paddingBottom: 10,
            backgroundColor: 'blue',
            borderRadius: 5,
        }, 
        flexContainerInfo: {
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1
        },
        flexElements : {
            marginLeft: 20,
            marginRight: 20,
        },
        flexElementsCenter: {
            marginLeft: 20,
            marginRight: 20,
            textAlign: 'center'
        }
      });

      if(item.stargazersCount > 999) {
          const temp = item.stargazersCount / 1000;
          
          item.stargazersCount = temp.toFixed(1);
      }

      if(item.forksCount > 999) {
          const temp = item.forksCount / 1000;
          item.forksCount = temp.toFixed(1)
      }

    return (
    <View>
        <View style={styles.flexContainerRow}>
            <Image style={styles.tinyLogo} source={{uri: item.ownerAvatarUrl}}></Image>
            <View style={styles.flexContainer}>
                <Text>Full Name: {item.fullName}</Text>
                <Text>Description: {item.description}</Text>
            </View>
        </View>
        <Text style={styles.language}>{item.language}</Text>
        <View style={styles.flexContainerInfo}>
            <View style={styles.flexContainer}>
                <Text style={styles.flexElementsCenter}>{item.stargazersCount}k</Text>
                <Text style={styles.flexElements}>Stars</Text>
            </View>
            <View style={styles.flexContainer}>
                <Text style={styles.flexElementsCenter}>{item.forksCount}k</Text>
                <Text style={styles.flexElements}>Forks</Text>
            </View>
            <View style={styles.flexContainer}>
                <Text style={styles.flexElementsCenter}>{item.reviewCount}</Text>
                <Text style={styles.flexElements}>Reviews</Text>
            </View>
            <View style={styles.flexContainer}>
                <Text style={styles.flexElementsCenter}>{item.ratingAverage}</Text>
                <Text style={styles.flexElements}>Rating</Text>
            </View>
            
        </View>
    </View>
    )
}

export default RepositoryItem;