import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {View} from 'react-native';
import CustomInput from '../components/CustomInput';
import {z} from 'zod';
import {useFieldArray, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import colors from '../theme/color';
import HorizontalLine from '../components/HorizontalLine';
import Space from '../components/Space';
import IconButton from '../components/IconButton';
import CustomSelect from '../components/CustomSelect';
import {StackNavigationProp} from '@react-navigation/stack';

const schema = z.object({
  customerName: z.string().min(1, {message: 'Customer Name is required'}),
  productDetails: z.array(
    z.object({
      productName: z.string().min(1, {message: 'Product Name is required'}),
      price: z.string(),
      quality: z.string().min(1, {message: 'Quality is required'}),
    }),
  ),
  totalPrice: z.string(),
});

type OrderMenageScreenParams = {
  type: string;
};

type RootStackParamList = {
  OrderMenageScreen: {type: string};
};

type OrderMenageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OrderMenageScreen'
>;

type SchemaType = z.infer<typeof schema>;

const OrderMenageScreen = ({
  route,
  navigation,
}: {
  route: {params: OrderMenageScreenParams};
  navigation: OrderMenageScreenNavigationProp;
}) => {
  const {type} = route.params;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      productDetails: [{productName: '', price: '', quality: ''}],
    },
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'productDetails',
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const countries = [
    {label: 'USA', value: 'usa'},
    {label: 'Canada', value: 'canada'},
    {label: 'Australia', value: 'australia'},
    {label: 'India', value: 'india'},
    {label: 'Germany', value: 'germany'},
    {label: 'Brazil', value: 'brazil'},
    {label: 'France', value: 'france'},
  ];

  return (
    <SafeAreaView style={styles.containerSaveArea}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <CustomInput
          name="customerName"
          label="Customer Name"
          placeholder="Input customer name"
          control={control}
          rules={{required: true}}
        />
        <HorizontalLine />
        <Space size={16} />
        <CustomText style={styles.title}>Product Detail</CustomText>
        <Space size={25} />
        {fields.map((item, index) => (
          <View key={item.id}>
            <CustomSelect
              name={`productDetails[${index}].productName`}
              label="Product Name"
              placeholder="Select product name"
              control={control}
              rules={{required: true}}
              options={[
                {label: 'USA', value: 'usa'},
                {label: 'Canada', value: 'canada'},
                {label: 'Australia', value: 'australia'},
                {label: 'India', value: 'india'},
                {label: 'Germany', value: 'germany'},
                {label: 'Brazil', value: 'brazil'},
                {label: 'France', value: 'france'},
              ]}
            />
            <CustomInput
              prefix="Rp"
              name={`productDetails[${index}].price`}
              label="Price"
              placeholder="Price"
              control={control}
              type="number"
            />
            <CustomInput
              name={`productDetails[${index}].quality`}
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
                        append({productName: '', price: '', quality: ''})
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
        ))}

        <Space size={24} />
        <CustomInput
          prefix="Rp"
          name="totalPrice"
          label="Total Order Price"
          placeholder="Total price"
          isFormatNumber={true}
          control={control}
          type="number"
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
          textStyle={{fontSize: 18}}
          title="Save"
          variant="solid"
          onPress={() => {
            handleSubmit(onSubmit);
          }}
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
