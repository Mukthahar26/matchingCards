import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { LevelCard } from './../../Screencomponents'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const levelss=[
    {level: 1,isComplete: true, stars: 1, isUnlocked: true},
    {level: 2,isComplete: true, stars: 3, isUnlocked: true},
    {level: 3,isComplete: true, stars: 2, isUnlocked: true},
    {level: 4,isComplete: true, stars: 3, isUnlocked: true},
    {level: 5,isComplete: true, stars: 2, isUnlocked: true},
    {level: 6,isComplete: true, stars: 3, isUnlocked: true},
    {level: 7,isComplete: true, stars: 1, isUnlocked: true},
    {level: 8,isComplete: true, stars: 2, isUnlocked: true},
    {level: 9,isComplete: true, stars: 3, isUnlocked: true},
    {level: 10,isComplete: true, stars: 2, isUnlocked: true},
    {level: 11,isComplete: true, stars: 2, isUnlocked: true},
    {level: 12,isComplete: true, stars: 1, isUnlocked: true},
    {level: 13,isComplete: true, stars: 3, isUnlocked: true},
    {level: 14,isComplete: true, stars: 1, isUnlocked: true},
    {level: 15,isComplete: true, stars: 2, isUnlocked: true},
    {level: 16,isComplete: true, stars: 3, isUnlocked: true},
    {level: 17,isComplete: true, stars: 3, isUnlocked: true},
    {level: 18,isComplete: true, stars: 1, isUnlocked: true},
    {level: 19,isComplete: true, stars: 2, isUnlocked: true},
    {level: 20,isComplete: false, stars: 3, isUnlocked: true},
    {level: 21,isComplete: false, stars: 3},
    {level: 22,isComplete: false, stars: 1},
    {level: 23,isComplete: false, stars: 2},
    {level: 24,isComplete: false, stars: 3},
    {level: 25,isComplete: false, stars: 3},
    {level: 26,isComplete: false, stars: 1},
    {level: 27,isComplete: false, stars: 2},
    {level: 28,isComplete: false, stars: 3},
]

export class Levels extends Component {

    constructor(props){
        super(props);
        this.state={
            reload: false
        }
    }

    componentDidMount(){
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState((prev)=>{ return{ reload: !prev.reload }});
        });
    }
    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        let { levels } = this.state;
        return (
            <LinearGradient colors={['#fdfcfb', '#e2d1c3', '#e2d1c3']} style={styles.container}>
                <FlatList
                    data={global.levelRatingsData}
                    numColumns={4}
                    renderItem={({item, index})=> <LevelCard {...item } { ...this.props } />}
                    keyExtractor={(item, index)=> index.toString()}
                />
            </LinearGradient>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: wp("4%")
    }
})

export default Levels
