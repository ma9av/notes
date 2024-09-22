// screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text,  Pressable, StyleSheet,  ScrollView, StatusBar, Button, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
export default function HomeScreen({ navigation }: { navigation: any }) {
  const [notes, setNotes] = useState([]);

    const loadNotes = async () => {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    };

    const deleteNote = async (id: string) => {
        const filteredNotes = notes.filter(note => note.id !== id);
        setNotes(filteredNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(filteredNotes));
      };
    
    
  const confirmDelete = (id: any) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteNote(id),
          style: "destructive"
        }
      ]
    );
  };  

    useFocusEffect(
        React.useCallback(() => {
          loadNotes();
        }, [])
      );

  return (
    <>
    <ScrollView style={styles.con}>

    <View style={styles.view}>

    <Pressable onPress={() => navigation.navigate('Add-note')} style={styles.addItem}>
       <Text style= {styles.text}> + </Text> 
       </Pressable>
     {notes.reverse().map((note: any) => (
         <Pressable onPress={() => navigation.navigate('Edit-note', { id: note.id })} style={styles.Card}>
        <Text>  {note.title}
        </Text>

        <Text style= {styles.delete} onPress={() => confirmDelete(note.id)} > x
             </Text>
        
         </Pressable>
    ))}
    </View>

     </ScrollView>

    </>
  )}




const styles = StyleSheet.create({
    view:{
        flexWrap: 'wrap',
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        gap: 20 ,
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingLeft: 10,
        // width: 'auto',
        // height: 'auto',  
        
    },
    con: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
        paddingBottom: 10
      },
      scrollView: {
        flexDirection: 'column',
      },

      Card:{
        opacity: 0.7 ,
        padding: 10 ,
        width: 150,
        height: 120,
        backgroundColor: 'pink',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 30
      },
      addItem:{
        opacity: 0.7 ,
        borderStyle: 'dashed', 
        borderWidth: 4, 
        borderColor: 'gray',
        width: 150, 
        height: 120, 
        backgroundColor: 'gray',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 30
      },

      text:{
        fontWeight: 'bold', fontSize: 30, color: 'white'
      },
      delete:{
        fontWeight: 'bold', fontSize: 20, color: 'white',
        position: 'absolute',
        top: 10,
        right: 10
      }
  })
