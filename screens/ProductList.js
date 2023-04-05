import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-ionicons';
import PRODUCTS from '../products';

const ProductListScreen = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [productList, setProductList] = useState([]);

  const navigation = useNavigation();

  const loadFavorites = async () => {
    try {
      const storedFavoriteIds = await AsyncStorage.getItem('@favorites');
      if (storedFavoriteIds !== null) {
        setFavoriteIds(JSON.parse(storedFavoriteIds));
      }
    } catch (e) {
      console.log('Error loading favorites:', e);
    }
  };

  useEffect(() => {
    setProductList(PRODUCTS);
    loadFavorites();
  }, []);

  const toggleFavorite = async (productId) => {
    const newFavoriteIds = favoriteIds.includes(productId)
      ? favoriteIds.filter((id) => id !== productId)
      : [...favoriteIds, productId];

    setFavoriteIds(newFavoriteIds);

    try {
      await AsyncStorage.setItem('@favorites', JSON.stringify(newFavoriteIds));
    } catch (e) {
      console.log('Error saving favorites:', e);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() =>
              navigation.navigate('ProductDetail', {
                product: item,
              })
            }
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                //name={item.isFavorite ? 'heart' : 'heart-outline'}
                name='heart'
                size={24}
                color="red"
                onPress={() => toggleFavorite(item.id)}
                style={{ marginLeft: 20 }}
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: '#4169E1',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
