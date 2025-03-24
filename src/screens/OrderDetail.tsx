import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import CustomText from '../components/CustomText';
import {formatNumber} from '../utils/formatNumber';
import {getFontFamily} from '../theme/typography';
import colors from '../theme/color';
import Space from '../components/Space';
import HorizontalLine from '../components/HorizontalLine';

const OrderDetailScreen = () => {
  return (
    <SafeAreaView style={styles.containerSafeAreaView}>
      <View style={styles.containeContent}>
        <View style={styles.containerValue}>
          <CustomText style={styles.textLabel}>Order ID</CustomText>
          <CustomText style={styles.textValue}>11001100</CustomText>
        </View>
        <View style={styles.containerValue}>
          <CustomText style={styles.textLabel}>Customer Name</CustomText>
          <CustomText style={styles.textValue}>Anugrah Store</CustomText>
        </View>
        <View style={styles.containerValue}>
          <CustomText style={styles.textLabel}>Total Order Price</CustomText>
          <CustomText style={styles.textValue}>
            Rp {formatNumber(1000000)}
          </CustomText>
        </View>
      </View>
      <View>
        <Space size={24} />
        <CustomText style={styles.title}>Product Detail</CustomText>
        <Space size={16} />
        <View style={styles.containerProductDetail}>
          <View style={styles.containerTextProductDetail}>
            <CustomText>Product Name</CustomText>
            <CustomText>Hero Mie</CustomText>
          </View>
          <View style={styles.containerTextProductDetail}>
            <CustomText>Price</CustomText>
            <CustomText>Rp. {formatNumber(1000)}</CustomText>
          </View>
          <View style={styles.containerTextProductDetail}>
            <CustomText>Quantity</CustomText>
            <CustomText>Rp. {formatNumber(10)}</CustomText>
          </View>
          <View style={styles.containerTextProductDetail}>
            <CustomText>Total Price</CustomText>
            <CustomText>Rp. {formatNumber(10000)}</CustomText>
          </View>
          <HorizontalLine />
          <View style={styles.containerTextProductDetail}>
            <CustomText>Product Name</CustomText>
            <CustomText>Hero Mie</CustomText>
          </View>
          <View style={styles.containerTextProductDetail}>
            <CustomText>Price</CustomText>
            <CustomText>Rp. {formatNumber(1000)}</CustomText>
          </View>
          <View style={styles.containerTextProductDetail}>
            <CustomText>Quantity</CustomText>
            <CustomText>Rp. {formatNumber(10)}</CustomText>
          </View>
          <View style={styles.containerTextProductDetail}>
            <CustomText>Total Price</CustomText>
            <CustomText>Rp. {formatNumber(10000)}</CustomText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafeAreaView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  containeContent: {
    gap: 16,
  },
  containerValue: {
    gap: 10,
  },
  textLabel: {
    fontSize: 16,
  },
  textValue: {
    fontSize: 20,
    fontFamily: getFontFamily('700'),
  },
  title: {
    fontSize: 16,
    color: colors.grayTextTitle,
  },
  containerTextProductDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerProductDetail:{
    gap:8
  }
});

export default OrderDetailScreen;
