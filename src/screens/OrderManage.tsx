import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {View} from 'react-native';
import CustomInput from '../components/CustomInput';
import {z} from 'zod';
import {useFieldArray, useForm, useWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import colors from '../theme/color';
import HorizontalLine from '../components/HorizontalLine';
import Space from '../components/Space';
import IconButton from '../components/IconButton';
import CustomSelect from '../components/CustomSelect';
import {StackNavigationProp} from '@react-navigation/stack';
import {useGetProductsQuery} from '../stores/services/productAPI';
import {useCallback, useEffect, useMemo} from 'react';
import {
  calculateTotalAddAndCreatePrice,
  calculateTotalOrderPrice,
} from '../utils/calculator';
import {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from '../stores/services/orderApi';
import LoadingModal from '../components/Loading';
import {OrderByIdInterface} from '../interface/OrderInterface';

const schema = z.object({
  customer_name: z.string().min(1, {message: 'Customer Name is required'}),
  products: z.array(
    z.object({
      product_id: z.string().min(1, {message: 'Product Name is required'}),
      price: z.string(),
      quantity: z.string().min(1, {message: 'Quantity is required'}),
    }),
  ),
  totalPrice: z.string(),
});

type OrderMenageScreenParams = {
  type: string;
  orderId?: string;
};

type RootStackParamList = {
  OrderMenageScreen: {type: string};
};

type OrderMenageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OrderMenageScreen'
>;

export type SchemaType = z.infer<typeof schema>;

export type CalculateTotalAddAndCreatePriceInterface = SchemaType['products'];

const OrderMenageScreen = ({
  route,
  navigation,
}: {
  route: {params: OrderMenageScreenParams};
  navigation: OrderMenageScreenNavigationProp;
}) => {
  const {type, orderId} = route.params;

  const {data: dataDetail, isLoading: isLoadingDetail} = useGetOrderByIdQuery(
    {id: orderId},
    {skip: !orderId},
  );

  const {data} = useGetProductsQuery({});

  const productOptions = useMemo(() => {
    return (
      data?.data.map(product => ({
        value: product.id.toString(),
        label: product.name,
      })) || []
    );
  }, [data]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {isDirty},
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      products: [{product_id: '', price: '', quantity: ''}],
      customer_name: '',
      totalPrice: '',
    },
  });

  const transformDataToDefaultValues = useCallback(
    (data: OrderByIdInterface) => {
      return {
        customer_name: data.customer_name || '',
        totalPrice: `${calculateTotalOrderPrice(data)}`,
        products: data.products
          ? data.products.map(item => ({
              product_id: item.product.id.toString(),
              price: item.product.price.toString(),
              quantity: item.quantity.toString(),
            }))
          : [{product_id: '', price: '', quantity: ''}],
      };
    },
    [],
  );

  useEffect(() => {
    if (orderId && dataDetail) {
      console.log(transformDataToDefaultValues(dataDetail));

      reset(transformDataToDefaultValues(dataDetail) as any);
    }
  }, [orderId, dataDetail, reset, transformDataToDefaultValues]);

  const {fields, append, remove, update} = useFieldArray({
    control,
    name: 'products',
  });

  const products = useWatch({control, name: 'products'});

  const [createOrder, {isLoading}] = useCreateOrderMutation();
  const [updateOrder, {isLoading: isLoadingUpdate}] = useUpdateOrderMutation();

  useEffect(() => {
    products.forEach((item, index) => {
      const selectedProduct = data?.data.find(
        p => p.id.toString() === item.product_id,
      );

      if (!item.product_id && (item.price !== '' || item.quantity !== '')) {
        if (item.price !== '' || item.quantity !== '') {
          update(index, {...item, price: '', quantity: ''});
        }
        setValue(`products.${index}.price`, '');
        setValue(`products.${index}.quantity`, '');
        return;
      }

      if (selectedProduct && item.price !== `${selectedProduct.price}`) {
        setValue(`products.${index}.price`, `${selectedProduct.price}`);
      }
    });

    const newTotalPrice = calculateTotalAddAndCreatePrice(
      products as CalculateTotalAddAndCreatePriceInterface,
    );

    setValue('totalPrice', `${newTotalPrice}`);
  }, [JSON.stringify(products), JSON.stringify(data)]);

  const onSubmit = (data: SchemaType) => {
    const payload = {
      customer_name: data.customer_name,
      products: data.products.map(e => ({
        product_id: Number(e.product_id),
        quantity: Number(e.quantity),
      })),
    };

    if (type === 'add') {
      createOrder(payload);
    } else {
      if (orderId) {
        updateOrder({order_id: orderId, data: payload});
      }
    }
  };

  return (
    <SafeAreaView style={styles.containerSaveArea}>
      {(isLoading || isLoadingUpdate || isLoadingDetail) && (
        <LoadingModal
          isVisible={isLoading || isLoadingUpdate || isLoadingDetail}
          message="Please wait, processing..."
        />
      )}
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <CustomInput
          name="customer_name"
          label="Customer Name"
          placeholder="Input customer name"
          control={control}
          rules={{required: true}}
          disable={type === 'edit'}
        />
        <HorizontalLine />
        <Space size={16} />
        <CustomText style={styles.title}>Product Detail</CustomText>
        <Space size={25} />
        {fields.map((item, index) => {
          return (
            <View key={item.id}>
              <CustomSelect
                name={`products[${index}].product_id`}
                label="Product Name"
                placeholder="Select product name"
                control={control}
                rules={{required: true}}
                options={productOptions}
              />
              <CustomInput
                prefix="Rp"
                name={`products[${index}].price`}
                label="Price"
                placeholder="Price"
                value={products[index]?.price}
                control={control}
                type="number"
                isFormatNumber
                disable
              />
              <CustomInput
                name={`products[${index}].quantity`}
                label="Quantity"
                placeholder="Input quantity"
                control={control}
                rules={{required: true}}
                type="number"
              />
              {type !== 'edit' && (
                <>
                  <View style={styles.btnGroupAdd}>
                    {index === fields.length - 1 && (
                      <CustomButton
                        title="Add More Product"
                        onPress={() =>
                          append({product_id: '', price: '', quantity: ''})
                        }
                      />
                    )}
                    {fields.length > 1 && (
                      <IconButton
                        onPress={() => remove(index)}
                        styleContainer={[
                          styles.trashBtn,
                          fields.length > 1 && index !== fields.length - 1
                            ? {width: 40, height: 40}
                            : {},
                        ]}
                        name="trash-can"
                        color={colors.error}
                      />
                    )}
                  </View>
                  <Space size={16} />
                </>
              )}

              <HorizontalLine />
            </View>
          );
        })}

        <Space size={24} />
        <CustomInput
          prefix="Rp"
          name="totalPrice"
          label="Total Order Price"
          placeholder="Total price"
          isFormatNumber
          control={control}
          type="number"
          disable
        />
      </ScrollView>

      <View style={styles.btnGroup}>
        <CustomButton
          textStyle={{fontSize: 18}}
          title="Back"
          variant="outline"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <CustomButton
          disable={!isDirty}
          textStyle={{fontSize: 18}}
          title="Save"
          variant="solid"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSaveArea: {flex: 1, backgroundColor: 'white', padding: 20},
  btnGroup: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingTop: 20,
    bottom: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: 16,
    color: colors.grayTextTitle,
  },
  trashBtn: {
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 5,
    aspectRatio: 1 / 1,
  },
  btnGroupAdd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
});

export default OrderMenageScreen;
