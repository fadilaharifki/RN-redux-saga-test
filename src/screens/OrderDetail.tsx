import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import CustomText from '../components/CustomText';
import {formatNumber} from '../utils/formatNumber';
import {getFontFamily} from '../theme/typography';
import colors from '../theme/color';
import Space from '../components/Space';
import HorizontalLine from '../components/HorizontalLine';
import {useGetOrderByIdQuery} from '../stores/services/orderApi';
import {calculateTotalOrderPrice} from '../utils/calculator';
import OrderDetailSkeleton from '../components/skeleton/OrderDetailSkeleton';

const OrderDetailScreen = ({route}: {route: {params: {orderId: string}}}) => {
  const {orderId} = route.params;
  const {data, isLoading} = useGetOrderByIdQuery({id: orderId});

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  return (
    <SafeAreaView style={styles.containerSafeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containeContent}>
          <View style={styles.containerValue}>
            <CustomText style={styles.textLabel}>Order ID</CustomText>
            <CustomText style={styles.textValue}>{data?.order_id}</CustomText>
          </View>
          <View style={styles.containerValue}>
            <CustomText style={styles.textLabel}>Customer Name</CustomText>
            <CustomText style={styles.textValue}>
              {data?.customer_name}
            </CustomText>
          </View>
          <View style={styles.containerValue}>
            <CustomText style={styles.textLabel}>Total Order Price</CustomText>
            <CustomText style={styles.textValue}>
              Rp {formatNumber(calculateTotalOrderPrice(data))}
            </CustomText>
          </View>
        </View>
        <View>
          <Space size={24} />
          <CustomText style={styles.title}>Product Detail</CustomText>
          <Space size={16} />
          <View style={styles.containerProductDetail}>
            {data?.products?.map((e, i) => {
              return (
                <View key={i}>
                  <View style={styles.containerTextProductDetail}>
                    <CustomText>Product Name</CustomText>
                    <CustomText>{e.product.name}</CustomText>
                  </View>
                  <View style={styles.containerTextProductDetail}>
                    <CustomText>Price</CustomText>
                    <CustomText>Rp. {formatNumber(e.product.price)}</CustomText>
                  </View>
                  <View style={styles.containerTextProductDetail}>
                    <CustomText>Quantity</CustomText>
                    <CustomText>Rp. {formatNumber(e.quantity)}</CustomText>
                  </View>
                  <View style={styles.containerTextProductDetail}>
                    <CustomText>Total Price</CustomText>
                    <CustomText>
                      Rp. {formatNumber(e.product.price * e.quantity)}
                    </CustomText>
                  </View>
                  <HorizontalLine />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
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
  containerProductDetail: {
    gap: 8,
  },
});

export default OrderDetailScreen;
