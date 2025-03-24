import {StyleSheet, View} from 'react-native';
import CustomText from './CustomText';
import ButtonComponent from './ButtonComponent';
import colors from '../theme/color';
import {getFontFamily} from '../theme/typography';
import HorizontalLine from './HorizontalLine';
import {formatNumber} from '../utils/formatNumber';
import IconButton from './IconButton';
import Space from './Space';

const Card = () => {
  return (
    <View style={styles.containerCard}>
      <View style={styles.containerValue}>
        <CustomText style={styles.textOrderID}>Order Id</CustomText>
        <CustomText style={styles.textNumberOrder}>10981234566</CustomText>
      </View>
      <HorizontalLine />
      <View style={styles.containerValue}>
        <View style={styles.rowText}>
          <CustomText>Customer</CustomText>
          <CustomText>Anugrah Store</CustomText>
        </View>
        <View style={styles.rowText}>
          <CustomText>Total Products</CustomText>
          <CustomText>{formatNumber(1541000)}</CustomText>
        </View>
        <View style={styles.rowText}>
          <CustomText>Total Price</CustomText>
          <CustomText>{formatNumber(4541000)}</CustomText>
        </View>
        <View style={styles.rowText}>
          <CustomText>Order Date</CustomText>
          <CustomText>13/03/2021 10:43</CustomText>
        </View>
        <Space />
        <View style={styles.containerButton}>
          <ButtonComponent
            textStyle={{fontSize: 18}}
            title="Edit"
            variant="solid"
            onPress={() => console.log('Edit')}
          />
          <ButtonComponent
            textStyle={{fontSize: 18}}
            title="Detail"
            variant="outline"
            onPress={() => console.log('Detail')}
          />
          <IconButton
            styleContainer={styles.trashBtn}
            name="trash-can"
            color={colors.error}
          />
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
  textOrderID: {
    fontFamily: getFontFamily('500'),
    fontSize: 14,
  },
  textNumberOrder: {
    fontFamily: getFontFamily('700'),
    fontSize: 14,
  },
  rowText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerValue: {
    gap: 8,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  trashBtn: {
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 5,
    aspectRatio: 1 / 1,
  },
});

export default Card;
