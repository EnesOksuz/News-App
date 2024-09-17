import React from 'react';
import { YStack, Text } from 'tamagui';
import { Image, StyleSheet, ScrollView } from 'react-native';

const NewsDetail = ({ route }) => {
  const { newsItem } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: newsItem.image }} style={styles.newsImage} />
      <YStack space="$4" padding="$4">
        <Text style={styles.newsTitle}>{newsItem.title}</Text>
        <Text style={styles.newsDate}>{new Date(newsItem.date).toLocaleDateString()}</Text>
        <Text style={styles.newsDescription}>{newsItem.description}</Text>
      </YStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 20, 
  },
  newsImage: {
    width: '100%',
    height: 300, 
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  newsTitle: {
    fontSize: 26, 
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  newsDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  newsDescription: {
    fontSize: 18,
    lineHeight: 28, 
    color: '#444',
  },
});

export default NewsDetail;
