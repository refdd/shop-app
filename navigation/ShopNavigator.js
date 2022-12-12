import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProuductsPpverViewScreen from '../screens/Shop/ProuductsPpverViewScreen';
import ProductDetailScreen from "../screens/Shop/ProductDetailScreen"
import Color from '../constants/Color';
import CartScreen from '../screens/Shop/CartScreen';
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createStackNavigator();
const stylesNavigator = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Color.primary : "",
  
  },
  headerTintColor: Platform.OS === "android" ? "white" : Color.primary,
};
function ShopNavigator() {
  return (
    <Stack.Navigator  screenOptions={stylesNavigator}>
    <Stack.Screen name="Home" component={ProuductsPpverViewScreen} />
    <Stack.Screen name="Product DetailScreen"  component={ProductDetailScreen} />
    <Stack.Screen name="Cart"  component={CartScreen} />
  </Stack.Navigator>
  );
}

export default ShopNavigator;