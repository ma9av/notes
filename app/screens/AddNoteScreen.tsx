// screens/AddNoteScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid  from 'react-native-uuid';

export default function AddNoteScreen({ navigation }: {navigation: any}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const saveNote = async () => {
    const note = { id: uuid.v4(), title, content };
    const storedNotes = await AsyncStorage.getItem('notes');
    const notes = storedNotes ? JSON.parse(storedNotes) : [];
    await AsyncStorage.setItem('notes', JSON.stringify([...notes, note]));
    navigation.goBack();
  };

  return (
    <View style = {styles.view}>
      <TextInput
        
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.title}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.content}
      />
      <Button title="Save" onPress={saveNote} disabled = {title.trimEnd() ? false: true} />
    </View>
  );
}

const styles = StyleSheet.create({
  view:{
    padding: 15,
    flex: 1,
    gap: 10
  },
  content:{ padding: 10, borderWidth: 1, minHeight: 100 , borderRadius: 20 },
  title:{ padding: 10, borderWidth: 1, marginBottom: 10 , borderRadius: 20 },

})