import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {MotiView} from 'moti';
import HorizontalLine from '../HorizontalLine';

interface SkeletonBoxProps {
  width: number;
  height: number;
  radius?: number;
  style?: ViewStyle;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width,
  height,
  radius = 4,
  style,
}) => {
  return (
    <MotiView
      from={{opacity: 0.3}}
      animate={{opacity: 1}}
      transition={{
        type: 'timing',
        duration: 800,
        loop: true,
      }}
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: '#E0E0E0',
        },
        style,
      ]}
    />
  );
};

const OrderDetailSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <SkeletonBox width={80} height={20} />
      <SkeletonBox width={150} height={30} style={styles.marginTop} />

      <SkeletonBox width={80} height={20} style={styles.marginTop} />
      <SkeletonBox width={200} height={30} />

      <SkeletonBox width={120} height={20} style={styles.marginTop} />
      <SkeletonBox width={250} height={30} />

      <SkeletonBox width={100} height={20} style={styles.marginTop} />
      {[...Array(4)].map((_, index) => (
        <View key={index} style={styles.productContainer}>
          <View style={styles.containerValue}>
            <SkeletonBox width={100} height={30} />
            <SkeletonBox width={100} height={30} />
          </View>
          <View style={styles.containerValue}>
            <SkeletonBox width={130} height={20} />
            <SkeletonBox width={170} height={20} />
          </View>
          <View style={styles.containerValue}>
            <SkeletonBox width={120} height={20} />
            <SkeletonBox width={100} height={20} />
          </View>
          <View style={styles.containerValue}>
            <SkeletonBox width={170} height={20} />
            <SkeletonBox width={130} height={20} />
          </View>
          <HorizontalLine />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
    gap: 5,
  },
  marginTop: {
    marginTop: 15,
  },
  productContainer: {
    gap: 5,
    marginTop: 15,
  },
  containerValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OrderDetailSkeleton;
