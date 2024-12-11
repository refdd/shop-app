import React from "react";
import {
  Text,
  View,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Color from "../../constants/Color";
import CartItem from "../../components/shop/CartItem";
import * as cartAction from "../../store/actions/cart";
import * as ordersAtion from "../../store/actions/order";
import { useState } from "react";
function CartScreen() {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transfonrmCartItem = [];
    for (const key in state.cart.item) {
      transfonrmCartItem.push({
        productId: key,
        productTitle: state.cart.item[key].productTitle,
        productPrice: state.cart.item[key].productPrice,
        quanity: state.cart.item[key].quanity,
        sum: state.cart.item[key].sum,
        productPushToken: state.cart.item[key].pushToken,
      });
    }
    return transfonrmCartItem.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const despatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await despatch(ordersAtion.addOrder(cartItems, cartTotalAmount));

    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.Summery}>
        <Text style={styles.summaryText}>
          total :{" "}
          <Text style={styles.amount}>
            {" "}
            $ {Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isloading ? (
          <View style={styles.centered}>
            <ActivityIndicator size={"small"} color={Color.primary} />
          </View>
        ) : (
          <Button
            color={Color.accent}
            title=" Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              deleteAble
              onRemove={() => {
                despatch(cartAction.removeFromCart(itemData.item.productId));
              }}
              quanity={itemData.item.quanity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
            />
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  Summery: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  styles: {
    fontSize: 18,
    fontWeight: "900",
  },
  amount: {
    color: Color.primary,
  },
  centered: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
export default CartScreen;
