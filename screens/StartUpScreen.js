import React from 'react'
import { Text ,View  , ActivityIndicator , StyleSheet} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Color from '../constants/Color';
import { useEffect } from 'react';
import {useDispatch } from "react-redux"
import  * as authAction from "../store/actions/auth"
function StartUpScreen({navigation}) {
  const dispatch = useDispatch()
    useEffect(()=>{
         const tryLogin = async () => {
             const userData = await AsyncStorage.getItem("userData")
            if(!userData){
              navigation.navigate("AuthScreen")
                return
            }
             const transformedData = JSON.parse(userData) 
             const {expiryDate ,mode ,token , userId } = transformedData
             const expirationDate = new Date(expiryDate);
             if(expirationDate <= new Date() || !token || !userId){
              navigation.navigate("AuthScreen")
              return
             }
        //  go to shop Screen 

             dispatch(authAction.authenticate(userId,token ,mode ))
         }
         tryLogin()
    },[dispatch])
  return (
    <View style={styles.Screen}>
  <ActivityIndicator size={ "large"}  color={Color.primary}/>
    </View>
  )
} 
 const  styles = StyleSheet.create({
    Screen :{
      flex: 1,
      justifyContent: "center",
      alignItems : "center",
    }
 })
export default StartUpScreen