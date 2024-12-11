import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import productsreducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/order";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Color from "./constants/Color";
import ProuductsPpverViewScreen from "./screens/Shop/ProuductsPpverViewScreen";
import ProductDetailScreen from "./screens/Shop/ProductDetailScreen";
import CartScreen from "./screens/Shop/CartScreen";
import OrdersScreen from "./screens/Shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import UserProductsScreen from "./screens/user/UserProductsScreen";
import EditeProductScreen from "./screens/user/EditeProductScreen";
import AuthScreen from "./screens/user/AuthScreen";
import { useState } from "react";
import authReducer from "./store/reducers/auth";
import { useSelector } from "react-redux";
import ShopNavigator from "./navigation/ShopNavigator";
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});
const rootReducer = combineReducers({
  products: productsreducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const stylesNavigator = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Color.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Color.primary,
};
function Root() {
  return (
    <Drawer.Navigator screenOptions={stylesNavigator}>
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-cart"
              size={size}
              color={focused ? Color.accent : Color.primary}
            />
          ),
        }}
        name="Home"
        component={ProuductsPpverViewScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-list"
              size={size}
              color={focused ? Color.accent : Color.primary}
            />
          ),
        }}
        name="orderScreen"
        component={OrdersScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-create"
              size={size}
              color={focused ? Color.accent : Color.primary}
            />
          ),
        }}
        name="User Screen"
        component={UserProductsScreen}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ShopNavigator />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
