import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TamaguiProvider } from 'tamagui';
import customConfig from './tamagui.config';
import HomeScreen from './screens/HomeScreen';
import AddNewsScreen from './screens/AddNewsScreen';
import NewsDetail from './screens/NewsDetail';
import { useFonts } from "expo-font";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'; // Import FontAwesome5
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="News" component={HomeScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetail} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null; // or a loading spinner
  }

  return (
    <TamaguiProvider config={customConfig}>
      <NavigationContainer>
        <Tab.Navigator>
          {/* Home tab with icon */}
          <Tab.Screen 
            name="News" 
            component={HomeStack} 
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="newspaper" color={color} size={size} /> // Icon for Home
              ),
            }} 
          />
          {/* Add News tab with icon */}
          <Tab.Screen 
            name="Add News" 
            component={AddNewsScreen} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome6 name="add" color={color} size={size} /> // Icon for Add News
              ),
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
};

export default App;