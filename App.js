import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import ProductListScreen from './screens/ProductList';
import ProductDetailScreen from './screens/ProductDetail';
import FavoriteScreen from './screens/Favorite';
import SettingsScreen from './screens/Setting';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('white');

  useEffect(() => {
    // Load the saved theme from AsyncStorage
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadTheme();
  }, []);

  const onThemeChange = async (newTheme) => {
    // Save the new theme to AsyncStorage
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error(error);
    }
    setTheme(newTheme);
  };

  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Favorite') {
                iconName = focused ? 'heart' : 'heart-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Product List" component={HomeStack} />
          <Tab.Screen name="Favorite" component={FavoriteScreen} />
          <Tab.Screen
            name="Settings"
            options={{ title: 'Settings' }}
            children={() => <SettingsScreen theme={theme} onThemeChange={onThemeChange} />}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
