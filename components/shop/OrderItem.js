import React from 'react'
import { useState } from 'react'
import { View , Text, Button , StyleSheet } from 'react-native'
import Color from '../../constants/Color'
import CartItem from './CartItem'
function OrderItem({amout, date , items}) {
    const [showDetails , setShowDetails]= useState(false)
  return (
    <View style={styles.orderItem}>
<View style={styles.summary} >
    <Text style={styles.total} >${amout.toFixed(2)}</Text>
    <Text style={styles.date}>{date}</Text>
</View>
<Button color={Color.primary} title={showDetails ? 'Hide Details' : 'Show Details'} onPress={()=>{
    setShowDetails(prevState => !prevState)
}}/>
{showDetails && <View style={styles.datelsItem}>
    {items.map(cartitem =><CartItem key={cartitem.productId} title={cartitem.productTitle} amount={cartitem.sum} quanity={cartitem.quanity} /> )}
    </View> 
    }
    </View>
  )
}
const styles = StyleSheet.create({
orderItem:{
    shadowColor:"black", 
    shadowOffset:{width: 0 , height: 2},
    shadowOpacity:0.26,
    shadowRadius:8,
    elevation:5,
    borderRadius:10,
    backgroundColor: "white",
    overflow:"hidden",
    margin:20,
    alignItems: "center",
    padding:10
},

summary:{
 flexDirection:"row",
 justifyContent:"space-between",
 alignItems:"center",
 width:"100%",
 marginBottom:15
},
total:{
fontSize:16,

},
date:{
    fontSize:16,
    color:"#888"
},
datelsItem:{
    width:"100%"
}
})
export default OrderItem