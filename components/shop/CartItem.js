import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
function CartItem({ onRemove, quanity, title, amount }) {
  return (
    <View style={styles.CartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quanity}> {quanity} </Text>
        <Text style={styles.title}> {title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}> {amount.toFixed(2)} </Text>
        <TouchableOpacity onPress={onRemove} style={styles.deletebutton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            color="red"
            size={23}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  CartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quanity: {
    color: "#888",
    fontSize: 16,
  },

  title: {
    fontSize: 20,
  },
  amount: {
    fontSize: 20,
  },
  deletebutton: {
    marginLeft: 20,
  },
});
export default CartItem;
