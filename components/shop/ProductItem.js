import React from 'react'
import { View , StyleSheet, Image, Text, Button , TouchableOpacity ,TouchableNativeFeedback } from 'react-native'
import Color from '../../constants/Color'

function ProductItem({prise , UrlImage , Title , onSlected , onAddtoCart ,children }) {
  return (
      <View style={styles.Product}>

        <TouchableNativeFeedback onPress={onSlected} useForeground>
       <View>
        
<View style={styles.imageContainer}>
<Image  style={styles.image} source={{uri:UrlImage}}/>

</View>
        <View  style={styles.containerContent}>
        <Text style={styles.Title} > {Title}</Text>
        <Text style={styles.price} > ${prise.toFixed(2)}</Text>
        </View>
        <View style={styles.action}>
           {children}
        </View>
       </View>
    </TouchableNativeFeedback>
    </View>
  )
}

const styles= StyleSheet.create({
    Product:{
        shadowColor:"black", 
        shadowOffset:{width: 0 , height: 2},
        shadowOpacity:0.26,
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor: "white",
        height:300,
        margin:20,
        overflow:"hidden"
    },
    imageContainer:{
        width:"100%",
        height: "60%",
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:"hidden"
    },
    image:{
             width:"100%",
             height: "100%"
    }
    ,
    containerContent:{
        alignItems: "center",
        height:"17%",
        padding:10
    }
    ,
    Title:{
         fontSize:18,
    },
    price:{ 
   fontSize:14,
   color:"#888"
    }
    , 
    action:{
      flexDirection:"row",
      justifyContent:"space-between",
       alignItems:"center",
       height:"23%",
       paddingHorizontal:20
    }
})
export default ProductItem