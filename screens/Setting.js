import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

const SettingsScreen = () => {
  const { colors } = useTheme();
  const [theme, setTheme] = useState(null);

  const setStorageValue = async (value) => {
    try {
      await AsyncStorage.setItem('@theme', value);
      setTheme(value);
    } catch (e) {
      console.log(e);
    }
  };

  const getStorageValue = async () => {
    try {
      const value = await AsyncStorage.getItem('@theme');
      if (value !== null) {
        setTheme(value);
      } else {
        setTheme('Light');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStorageValue();
  }, []);

  const handleThemeChange = (value) => {
    setStorageValue(value);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Theme settings:</Text>
      <TouchableOpacity
        style={[
          styles.button,
          theme === 'Light' && styles.selectedButton,
          { backgroundColor: colors.card },
        ]}
        onPress={() => handleThemeChange('Light')}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>Light</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          theme === 'Dark' && styles.selectedButton,
          { backgroundColor: colors.card },
        ]}
        onPress={() => handleThemeChange('Dark')}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>Dark</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
