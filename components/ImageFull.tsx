import { View, type ViewProps , Image,StyleSheet, TouchableHighlight} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import Ionicons from '@expo/vector-icons/Ionicons';


export type ImageFullProps = ViewProps & {
  url: string;
  like?: boolean;
};

export function ImageFull({ style, url, like, ...otherProps }: ImageFullProps) {
  const backgroundColor = useThemeColor({ light: "#2d2d2d", dark: "#2d2d2d" }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps}>
            <Image source={{uri: url}} style={{width: 120, height: 120, resizeMode: 'cover', borderRadius: 10}}>

            </Image>
            <TouchableHighlight style={{position: 'absolute', top: 0, right: 0}} onPress={() => alert('Pressed')}>
                {like ? <Ionicons name="heart" size={32} color="#FF0000f0" style={styles.iconPosition}/> : <Ionicons name="heart" size={32} color="#00000080" style={styles.iconPosition}
                />}
            </TouchableHighlight>
        </View>    
    ;
}

const styles = StyleSheet.create({
  iconPosition: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
