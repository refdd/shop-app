import React, { useEffect } from 'react'
import { FlatList, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CostomHeaderButton from '../../components/ui/HeaderButton';
import * as cartAction  from "../../store/actions/cart";

function ProuductsPpverViewScreen({navigation , }) {
  const despatch = useDispatch()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CostomHeaderButton}>
          <Item title="Fovorite" iconName="ios-cart"  onPress={() => navigation.navigate("Cart")}  />
        </HeaderButtons>
      ),
    });
  }, []);

    const products= useSelector(state => state.products.availableProdusts )
  return (
    <FlatList data={products} keyExtractor={item => item.id } renderItem={(item => <ProductItem 
      prise={item.item.price}
      UrlImage={item.item.imageUrl}
      Title={item.item.title}
      onViewDetail={() => navigation.navigate("Product DetailScreen" ,{
        productId : item.item.id,
        productTitle : item.item.title
      }) }
      onAddtoCart={ ()=> despatch(cartAction.addToCart(item.item))}
    />)} />
  )
}

export default ProuductsPpverViewScreen