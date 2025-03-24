import React from 'react';
import {TouchableOpacity, View, StyleSheet, ViewStyle} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import colors from '../theme/color';

interface IconButtonProps {
  name: string;
  size?: number;
  color?: string;
  styleContainer?: ViewStyle | ViewStyle[];
  onPress?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  name,
  size = 24,
  color = colors.blackIcon,
  styleContainer,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styleContainer]}>
      <View style={styles.containerView}>
        <FontAwesome6 name={name} size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerView: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton;
