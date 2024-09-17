import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import { Button, Input, YStack } from 'tamagui'; 
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const AddNewsScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const categories = [
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

  const handleAddNews = async () => {
    if (!title || !description || !category || !imageUrl) {
      console.error('All fields are required');
      return;
    }

    try {
      await addDoc(collection(db, 'news'), {
        title,
        description,
        category,
        date: new Date().toISOString(), 
        image: imageUrl,
      });
      console.log('News added successfully');
      setTitle('');
      setDescription('');
      setCategory('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  return (
    <YStack space="$4" padding="$4">
      <Input
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 10 }}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, padding: 10 }}
      />
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={{ borderWidth: 1, padding: 10 }}
      >
        <Picker.Item label="Select Category" value="" />
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      <Input
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={{ borderWidth: 1, padding: 10 }}
      />
      <Button onPress={handleAddNews}>
        <Text>Add News</Text>
      </Button>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200, marginTop: 10 }} />
      ) : null}
    </YStack>
  );
};

export default AddNewsScreen;