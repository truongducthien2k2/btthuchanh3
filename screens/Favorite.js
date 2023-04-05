import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = React.useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    const loadFavorites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('favorites');
        const favorites = jsonValue != null ? JSON.parse(jsonValue) : [];
        setFavorites(favorites);
      } catch (e) {
        console.log('Failed to load favorites', e);
      }
    };
    loadFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      const filteredFavorites = favorites.filter((favorite) => favorite.id !== id);
      await AsyncStorage.setItem('favorites', JSON.stringify(filteredFavorites));
      setFavorites(filteredFavorites);
    } catch (e) {
      console.log('Failed to remove favorite', e);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ProductDetails', { item })}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.favoriteButton} onPress={() => removeFavorite(item.id)}>
          <Ionicons name="heart" size={24} color="red" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>You have no favorites yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  listContainer: {
    alignItems: 'stretch',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
  },
  favoriteButton: {
    marginLeft: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
});

export default FavoriteScreen;
