import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PRODUCTS from '../products';

const ProductDetailScreen = ({ route, navigation }) => {
  const product = route.params.product;

  const [isFavorite, setIsFavorite] = useState(product.isFavorite);

  const handleFavoritePress = () => {
    // Toggle favorite status of product
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);

    // Update AsyncStorage with new favorite status of product
    // ...

    // Force re-render of component to reflect new favorite status
    navigation.setParams({ isFavorite: newIsFavorite });
  };

  const favoriteIconName = isFavorite ? 'heart' : 'heart-outline';

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
          <Ionicons name={favoriteIconName} size={24} color="#F00" />
        </TouchableOpacity>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: '#F00',
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 8,
  },
  descriptionContainer: {
    marginTop: 32,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});

export default ProductDetailScreen;
