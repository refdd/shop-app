import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CostomHeaderButton from "../../components/ui/HeaderButton";
import * as cartAction from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import Color from "../../constants/Color";
function ProuductsPpverViewScreen({ navigation }) {
  const despatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const [isRefrech, setIsRefrech] = useState(false);
  const [error, setError] = useState();
  const loadProduct = useCallback(async () => {
    setError(null)
    setIsRefrech(true)
    try {
      await despatch(productActions.fethProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefrech(false)

  }, [despatch,  setError]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadProduct);
    return unsubscribe;
  }, [loadProduct , navigation]);

  useEffect(() => {
    setIsLoading(true);
    loadProduct();
    setIsLoading(false);

  }, [despatch, loadProduct , setIsLoading]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CostomHeaderButton}>
          <Item
            title="Fovorite"
            iconName="ios-cart"
            onPress={() => navigation.navigate("Cart")}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CostomHeaderButton}>
          <Item
            title="menu"
            iconName="ios-menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const products = useSelector((state) => state.products.availableProducts);
  const selectItemHendler = (id, title) =>
    navigation.navigate("Product DetailScreen", {
      productId: id,
      productTitle: title,
    });
  if (error) {
    return (
      <View style={styles.center}>
        <Text>An Error has occurred</Text>
        <Button title="try again" onPress={loadProduct} color={Color.primary} />
      </View>
    );
  }
  if (isloading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }
  if (!isloading && products.length === 0) {
    return (
      <View style={styles.center}>
        <Text> NP Products Found . Maybe Start Addding Some ..</Text>
      </View>
    );
  }
  return (
    <FlatList
    onRefresh={loadProduct}
     refreshing={isRefrech} 
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <ProductItem
          prise={item.item.price}
          UrlImage={item.item.imageUrl}
          Title={item.item.title}
          onSlected={() => {
            selectItemHendler(item.item.id, item.item.title);
          }}
        >
          <Button
            color={Color.primary}
            title="view Details"
            onPress={() => {
              selectItemHendler(item.item.id, item.item.title);
            }}
          />
          <Button
            color={Color.primary}
            title="To Cart "
            onPress={() => despatch(cartAction.addToCart(item.item))}
          />
        </ProductItem>
      )}
    />
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ProuductsPpverViewScreen;
