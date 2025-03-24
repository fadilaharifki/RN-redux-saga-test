import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import OrderListScreen from '../screens/OrderList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconButton from '../components/IconButton';
import colors from '../theme/color';

export type RootStackParamList = {
  OrderList: undefined;
  OrderMenage: undefined;
  OrderDetail: {orderId: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
        }}>
        <Stack.Screen
          name="OrderList"
          component={OrderListScreen}
          options={({navigation}) => ({
            title: 'Order',
            headerLeft: () => <IconButton name="plus" color={colors.blueSky} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
