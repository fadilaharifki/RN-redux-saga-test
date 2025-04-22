import {StyleSheet, View} from 'react-native';
import CustomText from './CustomText';
import colors from '../theme/color';
import HorizontalLine from './HorizontalLine';
import {Pokemon} from '../interface/PokemonsInterface';
import {useState} from 'react';
import SkeletonImage from './skeleton/SkeletonImage';
import FastImage from 'react-native-fast-image';
interface CardProps {
  item: Pokemon;
}

const Card = ({item}: CardProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.containerCard}>
      <View style={styles.containerValue}>
        <View style={{alignItems: 'center'}}>
          {loading && <SkeletonImage width="100%" height={200} />}
          <FastImage
            style={[styles.image, loading && {display: 'none'}]}
            source={{
              uri: item.detail.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            onLoad={() => setLoading(false)}
          />
        </View>
      </View>
      <HorizontalLine />
      <View style={styles.containerValue}>
        <View style={styles.rowText}>
          <CustomText>Name</CustomText>
          <CustomText>{item.name}</CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.grayBorder,
    padding: 16,
  },
  rowText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerValue: {
    gap: 8,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Card;
