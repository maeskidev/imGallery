import { Image, StyleSheet, Platform, ActivityIndicator, FlatList, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ImageFull } from '@/components/ImageFull';
import { ContainerGrid } from '@/components/ContainerGrid';
import { ImageCore } from '@/components/ImageCore';
import { useState, useEffect } from 'react';

export default function HomeScreen() {

  interface ImageData {
    id: string;
    download_url: string;
  }

  const [data, setData] = useState<ImageData[]>([]); // Estado para almacenar las imágenes
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://picsum.photos/v2/list?page=2'); // Reemplaza con tu URL
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json();
        setData(result); // Guarda los datos en el estado
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#2d2d2d', dark: '#1D3D47' }}
      headerImage={<Image
        source={{uri: 'https://picsum.photos/600/300/?blur=2'}}
        style={styles.reactLogo } />} title={'Para ti'}>
      <ThemedView style={styles.titleContainer} lightColor='#2d2d2d' darkColor='#fff'>
        {/* <ThemedText type="title">Para ti</ThemedText> */}
      </ThemedView>
      <ContainerGrid>

        {
          data.map((item) => (
            <ImageCore url={item.download_url} key={item.id}>
            </ImageCore>
          ))
        }
      </ContainerGrid>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#808080',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: '100%',
    top: 0,
    left: 0,
    position: 'absolute',  },
});
