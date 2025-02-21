import { View, type ViewProps, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ImageCoreProps = ViewProps & {
  url: string;
};

export function ImageCore({ style, url, ...otherProps }: ImageCoreProps) {
  const backgroundColor = useThemeColor({ light: "#fff", dark: "#2d2d2d" }, 'background');

  // Estado para manejar si la imagen está en favoritos
  const [isFavorite, setIsFavorite] = useState(false);

  // Cargar el estado de favoritos al montar el componente
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          const favoritesArray = JSON.parse(storedFavorites);
          setIsFavorite(favoritesArray.includes(url));
        }
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      }
    };

    loadFavorites();
  }, [url]);

  // Función para manejar el clic en el botón
  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (isFavorite) {
        // Si ya es favorito, eliminarlo
        favoritesArray = favoritesArray.filter((item: string) => item !== url);
      } else {
        // Si no es favorito, agregarlo
        favoritesArray.push(url);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error al guardar en favoritos:", error);
    }
  };

  return (
    <View style={[{ backgroundColor }, style]} {...otherProps}>
      <Image source={{ uri: url }} style={styles.image} />
      <TouchableHighlight style={styles.iconContainer} onPress={toggleFavorite} underlayColor="transparent">
        <Ionicons name="heart" size={32} color={isFavorite ? "#ff0000" : "#00000080"} style={styles.icon} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});