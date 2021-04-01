import { transform } from '@babel/core';
import React, { Component } from 'react'
import { Text, View, Animated, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';



export class FlipCard extends Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0.01);

        this.fontInterpolate= this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate= this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
        })
        this.value=0;
        this.animatedValue.addListener(({value})=>{
                this.value= value;
        })
    }

    flipCard(id, index){
        let { onClick, item } = this.props;
        onClick(id, index);
        Animated.spring(this.animatedValue,{
            toValue: 180,
            friction:8,
            tension:1,
            useNativeDriver:true
        }).start();
        // if(this.value>90){
        //     //Front Side
        //     Animated.spring(this.animatedValue,{
        //         toValue: 0,
        //         friction:8,
        //         tension:1,
        //         useNativeDriver:true
        //     }).start();
        // }else{
        //     //Back Side
        //     Animated.spring(this.animatedValue,{
        //         toValue: 180,
        //         friction:8,
        //         tension:1,
        //         useNativeDriver:true
        //     }).start();
        // }
    }

    

    closeCard=()=>{
        console.log("step 6:")
        Animated.spring(this.animatedValue,{
            toValue: 100,
            friction:100,
            tension:5,
            speed:50,
            bounciness: 50,
            useNativeDriver:true,
            InteractionManager: false,
        }).start();
    }

    shouldComponentUpdate(nprops,nstate){
        console.log("nprops.item.isOpen", nprops.item.isOpen)
        if(nprops.item.isOpen){
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction:8,
                tension:1,
                delay: 500,
                restSpeedThreshold: 100, 
                restDisplacementThreshold: 100,
                useNativeDriver:true
            }).start();
        }
        return true;
    }
    

    render() {
        let { frontEnd, backEnd, item } = this.props;
        const fontAnimation={
            transform:[
                {rotateY: this.fontInterpolate}
            ]
        }
        const backAnimation={
            transform:[
                {rotateY: this.backInterpolate}
            ]
        }

        //console.log("itemmmmmmmmmmmm :", item)
        return (
            <View style={{flex:1}}>
                <TouchableOpacity activeOpacity={1} style={{flex:1, justifyContent:'space-between', alignSelf:'center'}} onPress={()=> this.flipCard(item.id, item.index)}>
                <Animated.View style={[styles.flipCard,fontAnimation]}>
                    {frontEnd}
                </Animated.View>
                <Animated.View style={[styles.flipCard,styles.flipCardBack,backAnimation]}>
                    {backEnd}
                </Animated.View>
            </TouchableOpacity>
            </View>
            
        )
    }
}

const styles =StyleSheet.create({
    flipCard:{
        backfaceVisibility:'hidden'
    },
    flipCardBack:{
        position:'absolute',
    }
})
export default FlipCard


FlipCard.propTypes = {
    frontEnd: PropTypes.object,
    backEnd: PropTypes.object,
    onClick: PropTypes.func
  };