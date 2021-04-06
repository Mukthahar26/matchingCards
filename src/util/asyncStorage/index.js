import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'


export const SOUND= "SOUND"
export const VIBRATE= "VIBRATE"


export const set=(key, value)=>{
 try{
    AsyncStorage.setItem(key, value+"")
 }catch(e){
    console.log(e)
 }
}

export const get=async(key)=>{
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        console.log("rrrrrrrrrrrrrr :", jsonValue, typeof jsonValue)
        return jsonValue;
      } catch(e) {
        console.log(e)
      }
}