import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStore , combineReducers} from "redux";
import {Provider} from "react-redux";
import productsreducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart"
import { NavigationContainer } from '@react-navigation/native';
import ShopNavigator from './navigation/ShopNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import Color from './constants/Color';
const rootReducer =combineReducers({
  products:productsreducer,
  cart: cartReducer
})
const store = createStore(rootReducer)
const Stack = createStackNavigator();
const stylesNavigator = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Color.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Color.primary,
};
export default function App() {
  return (
    <NavigationContainer>
   <Provider store={store}>
   <Stack.Navigator screenOptions={stylesNavigator}>
      <Stack.Screen options={{header: () => null}} name="Home" component={ShopNavigator} />
    </Stack.Navigator>
   </Provider>
  </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
