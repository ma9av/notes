import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import AddNoteScreen from "./screens/AddNoteScreen";
import EditNoteScreen from "./screens/EditNoteScreen";

export default function RootLayout() {

  

  const Stack = createStackNavigator();
  return (
     <NavigationContainer independent = {true} >
   
    <Stack.Navigator initialRouteName="Home" >
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="Add-note" component={AddNoteScreen}/>
    <Stack.Screen name="Edit-note" component={EditNoteScreen} />
      
  

    </Stack.Navigator>
    </NavigationContainer>
  )
}
