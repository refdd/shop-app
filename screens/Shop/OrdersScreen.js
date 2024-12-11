import React , {useEffect} from 'react'
import { useState } from 'react';
import { Text , View , FlatList , StyleSheet , ActivityIndicator} from 'react-native';
import { useSelector , useDispatch } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import Color from '../../constants/Color';
import * as OrderAction from "../../store/actions/order"
function OrdersScreen() {
  const [isloading , setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orders.orders);
  useEffect(()=>{
    setIsLoading(true)
      dispatch(OrderAction.fetchOrders()).then( ()=>{
        setIsLoading(false);
      })
  },[dispatch])
  if(isloading){
    <View style={styles.centered}>
      <ActivityIndicator size={"large"} color={Color.primary}/>
    </View>
  }
  if(orderData.length === 0   ){
    return <View style={styles.centered}>
      <Text style={styles.contentText} >
        No Order Found , maybe start Ordering some products ?
      </Text>
    </View>
  }
  return (
   <FlatList data={orderData} 
    keyExtractor={item => item.id}
    renderItem={itemData =><OrderItem items={itemData.item.items} amout={itemData.item.totalAmount} date={itemData.item.readableDate} />}
   />
  
  )
}
const styles = StyleSheet.create({
  centered:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText : {
    fontSize:16,
    color:"blue"
 }
})
export default OrdersScreen