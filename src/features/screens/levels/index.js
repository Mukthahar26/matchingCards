import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { LevelCard } from './../../Screencomponents'
import { Loading } from './../../../UIcomponents'
import global from './../../../global'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getRatings } from './../../../dbOperations'



export class Levels extends Component {

    constructor(props){
        super(props);
        this.state={
            reload: false,
            data:[]
        }
    }

    componentDidMount(){
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getData();
            this.setState((prev)=>{ return{ reload: !prev.reload }});
        });
    }

    getData=async()=>{
        let rows = await getRatings();
        this.setState({ data: rows})
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        let { data } = this.state;
        
        return (
            <LinearGradient colors={['#fdfcfb', '#e2d1c3', '#e2d1c3']} style={styles.container}>
                  {!data.length ? <Loading /> : <View style={{flex:1, padding: wp("4%")}}>
                    <FlatList
                    data={data}
                    numColumns={4}
                    renderItem={({item, index})=> <LevelCard {...item } { ...this.props } />}
                    keyExtractor={(item, index)=> index.toString()}
                /></View>} 
            </LinearGradient>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default Levels
