import {StyleSheet, View} from 'react-native';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import colors from '../theme/color';
import {getFontFamily} from '../theme/typography';
import HorizontalLine from './HorizontalLine';
import {formatNumber} from '../utils/formatNumber';
import IconButton from './IconButton';
import Space from './Space';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

type OrderNavigationProp = StackNavigationProp<RootStackParamList>;

interface CardProps {
  onDelete?: (id: string) => void;
}
const Card = ({onDelete}: CardProps) => {
  const navigation = useNavigation<OrderNavigationProp>();
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
        <View style={styles.buttonGroup}>
          <CustomButton
            textStyle={{fontSize: 18}}
            title="Edit"
            variant="solid"
            onPress={() => navigation.navigate('OrderMenage', {type: 'edit'})}
          />
          <CustomButton
            textStyle={{fontSize: 18}}
            title="Detail"
            variant="outline"
            onPress={() => navigation.navigate('OrderDetail', {orderId: ''})}
          />
          <IconButton
            onPress={() => {
              if (typeof onDelete === 'function') {
                onDelete('dsd');
              }
            }}
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
  buttonGroup: {
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
