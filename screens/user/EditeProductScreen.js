import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { log } from "react-native-reanimated";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import CostomHeaderButton from "../../components/ui/HeaderButton";
import Input from "../../components/ui/Input";
import Color from "../../constants/Color";
import * as productsActions from "../../store/actions/products";
const FROM_INPUT_UPDATE = "FROM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FROM_INPUT_UPDATE) {
    const updateValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updateValidities = {
      ...state.inputValidition,
      [action.input]: action.isValid,
    };
    let updateFromIsvalid = true;
    for (const key in updateValidities) {
      updateFromIsvalid = updateFromIsvalid && updateValidities[key];
    }
    return {
      fromIsValid: updateFromIsvalid,
      inputValues: updateValues,
      inputValidition: updateValidities,
    };
  }
  return state;
};
const EditProductScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
 
  const prodId = route.params.productId;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();
  const [fomrState, dispatchFromState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidition: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: true,
    },
    fromIsValid: editedProduct ? true : false,
  });
  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  useEffect(() => {
    navigation.setOptions({
      title: prodId ? "edite product" : "add product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CostomHeaderButton}>
          <Item
            title="save"
            iconName="md-checkmark"
            onPress={() => submitHandler()}
          />
        </HeaderButtons>
      ),
    });
  }, [prodId , fomrState]);


  const submitHandler = async () => {
    if (!fomrState.fromIsValid) {
      Alert.alert("wrong input", " please check the error in th from ", [
        { text: "Okey!" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
try{
  if (editedProduct) {
    await  dispatch(
        productsActions.updateProduct(
          prodId,
          fomrState.inputValues.title,
          fomrState.inputValues.description,
          fomrState.inputValues.imageUrl
        )
      );
    } else {
      await dispatch(
        productsActions.createProduct(
          fomrState.inputValues.title,
          fomrState.inputValues.description,
          fomrState.inputValues.imageUrl,
          +fomrState.inputValues. price
        )
      );
    }

    navigation.goBack();
}catch (err) {
  setError(err.message);
}

setIsLoading(false);
   
  };
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFromState({
        type: FROM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFromState]
  );
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }
  return (
    <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EditProductScreen;
