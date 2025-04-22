import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PokemonListScreen from '../screens/PokemonList';

export type RootStackParamList = {
  PokemonList: undefined;
  OrderMenage: {orderId?: string; type: 'add' | 'edit'};
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
          name="PokemonList"
          component={PokemonListScreen}
          options={() => ({
            title: 'Pokemon',
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
