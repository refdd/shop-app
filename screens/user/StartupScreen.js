import React from 'react'
import { Text, View ,ActivityIndicator , StyleSheet } from 'react-native'
import  AsyncStorage from "@react-native-async-storage/async-storage"
import Color from '../../constants/Color'
function StartupScreen() {
  return (
    <View style={styles.screen}>
       <ActivityIndicator size={"large"} color={Color.primary}/>
    </View>
  )
}
 const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center', 
    }
 })
export default StartupScreen