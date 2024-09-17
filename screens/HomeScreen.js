import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { YStack, Text } from 'tamagui';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image'; 

const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('All Time');

  const categories = [
    'All',
    'Technology',
    'Health',
    'Sports',
    'Entertainment',
    'Politics',
    'Business',
    'Science',
    'Education',
    'Travel',
    'Lifestyle',
  ];

  const timeFilters = [
    'All Time',
    'Today',
    'Last 7 Days',
    'Last Month',
  ];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'news'), (snapshot) => {
      const newsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sortedNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNews(sortedNews);
      setFilteredNews(sortedNews); 
    }, (error) => {
      console.error('Error fetching news:', error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = news;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedTimeFilter === 'Last 7 Days') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      filtered = filtered.filter(item => new Date(item.date) >= sevenDaysAgo);
    } else if (selectedTimeFilter === 'Last Month') {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      filtered = filtered.filter(item => new Date(item.date) >= lastMonth);
    }else if (selectedTimeFilter === 'Today') {
      const Today = new Date();
      Today.setDate(Today.getDate() - 1);
      filtered = filtered.filter(item => new Date(item.date) >= Today);
    }

    setFilteredNews(filtered);
  }, [selectedCategory, selectedTimeFilter, news]); 

  const handlePress = (newsItem) => {
    navigation.navigate('NewsDetail', { newsItem });
  };

  return (
    <YStack padding="$4" flex={1} backgroundColor="#f5f5f5">
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedTimeFilter}
          onValueChange={(itemValue) => setSelectedTimeFilter(itemValue)}
          style={styles.picker}
        >
          {timeFilters.map((filter) => (
            <Picker.Item key={filter} label={filter} value={filter} />
          ))}
        </Picker>
      </View>

      <FlatList
        data={filteredNews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <YStack space="$2" style={styles.newsCard}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.newsImage} 
                contentFit="cover" 
                transition={1000} 
              />
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsTitle}>{item.category}</Text>

              <Text style={styles.newsDate}>{new Date(item.date).toLocaleDateString()}</Text>
            </YStack>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </YStack>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  newsDate: {
    fontSize: 14,
    color: 'gray',
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
