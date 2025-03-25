import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {MotiView} from 'moti';
import colors from '../../theme/color';

interface SkeletonBoxProps {
  width: number;
  height: number;
  borderRadius?: number;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width,
  height,
  borderRadius = 4,
}) => {
  return (
    <MotiView
      from={{opacity: 0.3}}
      animate={{opacity: 1}}
      transition={{loop: true, type: 'timing', duration: 700}}
      style={{width, height, borderRadius, backgroundColor: '#E0E0E0'}}
    />
  );
};

const SkeletonCard: React.FC = () => {
  return (
    <MotiView
      from={{opacity: 0.3}}
      animate={{opacity: 1}}
      transition={{loop: true, type: 'timing', duration: 700}}
      style={styles.card}>
      <View style={styles.row}>
        <SkeletonBox width={80} height={30} />
        <SkeletonBox width={40} height={30} />
      </View>
      <View style={styles.row}>
        <SkeletonBox width={120} height={30} />
        <SkeletonBox width={120} height={30} />
      </View>
      <View style={styles.row}>
        <SkeletonBox width={170} height={30} />
        <SkeletonBox width={50} height={30} />
      </View>
      <View style={styles.row}>
        <SkeletonBox width={140} height={30} />
        <SkeletonBox width={80} height={30} />
      </View>
      <View style={styles.row}>
        <SkeletonBox width={90} height={30} />
        <SkeletonBox width={120} height={30} />
      </View>
      <View style={styles.buttonContainer}>
        <SkeletonBox
          width={Dimensions.get('screen').width / 3}
          height={50}
          borderRadius={8}
        />
        <SkeletonBox
          width={Dimensions.get('screen').width / 3}
          height={50}
          borderRadius={8}
        />
        <SkeletonBox width={50} height={50} borderRadius={8} />
      </View>
    </MotiView>
  );
};

const SkeletonList: React.FC = () => {
  return (
    <View style={styles.containerSkeletonList}>
      {[1, 2, 3, 4].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: colors.blackIcon,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    gap: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  containerSkeletonList: {
    gap: 15,
  },
});

export default SkeletonList;
