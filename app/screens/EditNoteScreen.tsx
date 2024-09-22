// EditNoteScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditNoteScreen({ route, navigation }) {
  const { id } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadNote = async () => {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        const notes = JSON.parse(storedNotes);
        const note = notes.find(n => n.id === id);
        if (note) {
          setTitle(note.title);
          setContent(note.content);
        }
      }
    };
    loadNote();
  }, [id]);

  const updateNote = async () => {
    const storedNotes = await AsyncStorage.getItem('notes');
    const notes = storedNotes ? JSON.parse(storedNotes) : [];

    const updatedNotes = notes.map( note => note.id === id ? { ...note, title, content } : note);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    navigation.goBack();
  };

  return (
    <View style={styles.view}>
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
        style = {styles.content}
      />
      <Button title="Save Changes" onPress={updateNote} disabled = {title.trimEnd() ? false: true} />
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
