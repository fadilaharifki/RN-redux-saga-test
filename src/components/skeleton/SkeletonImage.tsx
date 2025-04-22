import React from 'react';
import {StyleSheet, ViewStyle, DimensionValue} from 'react-native';
import {MotiView} from 'moti';

interface SkeletonImageProps {
  width: DimensionValue;
  height: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({
  width,
  height,
  borderRadius = 4,
  style,
}) => {
  return (
    <MotiView
      from={{opacity: 0.3}}
      animate={{opacity: 1}}
      transition={{loop: true, type: 'timing', duration: 700}}
      style={[styles.skeleton, {width, height, borderRadius}, style]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E0E0E0',
  },
});

export default SkeletonImage;
