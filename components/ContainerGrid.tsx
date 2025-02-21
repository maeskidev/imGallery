import { View, type ViewProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ContainerGridProps = ViewProps & {
  grid?: number;
};

export function ContainerGrid({ style, ...otherProps }: ContainerGridProps) {

  return <View style={styles.gridGallery} {...otherProps}>
            
        </View>;
}


const styles = StyleSheet.create({
  gridGallery: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
