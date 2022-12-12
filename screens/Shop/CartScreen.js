import React from "react";
import { Text, View, FlatList, Button, StyleSheet } from "react-native";
import { useSelector , useDispatch } from "react-redux";
import Color from "../../constants/Color";
import CartItem from "../../components/shop/CartItem";
import * as cartAction from "../../store/actions/cart"
function CartScreen() {

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
      });
    }
    return transfonrmCartItem.sort((a,b) => a.productId > b.productId ? 1 : -1 ) ;
  });
   const despatch =   useDispatch()
  return (
    <View style={styles.screen}>
      <View style={styles.Summery}>
        <Text style={styles.summaryText}>
          total :{" "}
          <Text style={styles.amount}> $( {cartTotalAmount.toFixed(2)})</Text>
        </Text>
        <Button
          color={Color.accent}
          title=" Order Now"
          disabled={cartItems.length === 0}
        />
      </View>
      <View>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId}
            renderItem={(itemData) => (
              <CartItem onRemove={()=> {
                despatch(cartAction.removeFromCart(itemData.item.productId))
              }} quanity={itemData.item.quanity} title={itemData.item.productTitle} amount={itemData.item.sum} />
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
});
export default CartScreen;
