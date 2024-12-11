import React from "react";
import { useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Color from "../../constants/Color";
import * as cartAction from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CostomHeaderButton from "../../components/ui/HeaderButton";
function ProductDetailScreen({ route, navigation }) {
  const { productId, productTitle } = route.params;
  const despatch = useDispatch();
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prop) => prop.id === productId)
  );
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    navigation.setOptions({
      title: productTitle,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CostomHeaderButton}>
          <Item
            title="Fovorite"
            iconName="ios-cart"
            onPress={() => navigation.navigate("Cart")}
          />
        </HeaderButtons>
      ),
    });
  }, [productTitle]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.action}>
        <Button
          color={Color.primary}
          title="Add to Cart "
          onPress={() => despatch(cartAction.addToCart(selectedProduct))}
        />
      </View>
      <Text style={styles.price}> 4{selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
  action: {
    marginVertical: 10,
    alignContent: "center",
  },
});
export default ProductDetailScreen;
