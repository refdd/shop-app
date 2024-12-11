import React from "react";
import { HeaderButton  } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import Color from "../../constants/Color";
function CostomHeaderButton(props) {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={24}
      color={Platform.OS == "android" ? "#fff" : Color.primary}
    />
  );
}

export default CostomHeaderButton;
 