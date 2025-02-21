import { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Permite detectar cuando la pantalla está activa

import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ContainerGrid } from '@/components/ContainerGrid';
import { ImageCore } from '@/components/ImageCore';
import React from 'react';

export default function TabTwoScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Cargar favoritos cuando la pantalla se monte
  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem('favorites');
    setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
  };

  useEffect(() => {
    loadFavorites();
  }, []); // Se ejecuta solo una vez al montar el componente

  // Detectar cuando el usuario entra a la pantalla y recargar los favoritos
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#000000' }}
      headerImage={<Image source={{ uri: 'https://picsum.photos/600/300/?blur=3' }} style={styles.reactLogo} />}
      title={'Favoritos'}
    >
      <ThemedText>Listado de favoritos</ThemedText>
      <ContainerGrid>
        {favorites.map((item: string, index: number) => (
          <ImageCore key={index} url={item} />
        ))}
      </ContainerGrid>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: "100%",
    width: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
  },
});