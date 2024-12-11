import React, { useEffect } from 'react'
import { Button, FlatList, Text, View ,StyleSheet } from 'react-native'
import { useSelector , useDispatch } from 'react-redux'
import ProductItem from "../../components/shop/ProductItem"
import Color from '../../constants/Color';
import *  as productAction from "../../store/actions/products";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CostomHeaderButton from '../../components/ui/HeaderButton';

function UserProductsScreen({navigation}) {

  const dispatch = useDispatch()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CostomHeaderButton}>
          <Item title="Fovorite" iconName="ios-create"  onPress={() => navigation.navigate("EditeProductScreen" ,{
    productId :false
    })}  />
        </HeaderButtons>
      ),
      
    });
  }, []);
  const products = useSelector(state => state.products.userProducts)
  const selectItemHendler= (id , title) => navigation.navigate("Product DetailScreen" ,{
    productId :id,
    productTitle :title
  }) 
  const editProductHandler = ( id) =>{
    navigation.navigate("EditeProductScreen" ,{
    productId :id
    })
  }
  if(products.length === 0   ){
    return <View style={styles.centered}>
      <Text style={styles.contentText} >
        No Product Found , maybe start create some ?
      </Text>
    </View>
  }
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={(item) => (
        <ProductItem 
        prise={item.item.price}
      UrlImage={item.item.imageUrl} 
      Title={item.item.title}
      onSlected={()=>{
        editProductHandler(item.item.id) 
       }}
        >
          <Button color={Color.primary} title='Edit'  onPress={()=>{
       editProductHandler(item.item.id) 
      }} />
            <Button color={Color.primary} title='Delete '  onPress={()=> {
              dispatch(productAction.deleteProduct(item.item.id))
            }}/>
        </ProductItem>
      )}
  />
  )
}
 const styles = StyleSheet.create({
  centered:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
  ,
  contentText : {
     fontSize:16,
     color:"blue"
  }
 }) 
export default UserProductsScreen