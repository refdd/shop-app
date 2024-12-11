import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProuductsPpverViewScreen from "../screens/Shop/ProuductsPpverViewScreen";
import ProductDetailScreen from "../screens/Shop/ProductDetailScreen";
import Color from "../constants/Color";
import CartScreen from "../screens/Shop/CartScreen";
import AuthScreen from "../screens/user/AuthScreen";
import EditeProductScreen from "../screens/user/EditeProductScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersScreen from "../screens/Shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authAction from "../store/actions/auth";
import StartUpScreen from "../screens/StartUpScreen";
import { Button, SafeAreaView, View } from "react-native";
import CustomDrawerList from "./CustomDrawerList";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const stylesNavigator = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Color.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Color.primary,
};

function ShopNavigator() {
  function Root({ navigation }) {
    return (
      <Drawer.Navigator
        screenOptions={stylesNavigator}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <CustomDrawerList {...props} />
              <View style={{ flex: 1, paddingTop: 20 }}>
                <SafeAreaView>
                  <Button
                    title="logout"
                    onPress={() => {
                      dispatch(authAction.logout());
                      setIsSignedIn(false);
                    }}
                  />
                </SafeAreaView>
                {/* <DrawerItem
                    label="Logout"
                    labelStyle={{color:Color.primary , fontSize:16 }}
                    style={{width:"100%" }}
                    onPress={() => console.log('FIRE CUSTOM LOGOUT FUNCTION')}
                  /> */}
              </View>
            </DrawerContentScrollView>
          );
        }}
      >
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
  const authMode = useSelector((state) => state.auth.modeSingn);
  // console.log(authMode);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        setIsSignedIn(false);
        return;
      }
      const transformedData = JSON.parse(userData);
      const { expiryDate, mode, token, userId } = transformedData;

      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        setIsSignedIn(mode);
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      setIsSignedIn(mode);
      dispatch(authAction.authenticate(userId, token, mode, expirationTime));
    };
    tryLogin();
  }, [dispatch, authMode]);

  return (
    <Stack.Navigator screenOptions={stylesNavigator}>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="Root"
            component={Root}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Product DetailScreen"
            component={ProductDetailScreen}
          />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen
            name="EditeProductScreen"
            component={EditeProductScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="StartupScreen" component={StartUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default ShopNavigator;
