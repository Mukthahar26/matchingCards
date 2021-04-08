import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export class Loading extends Component {
    render() {
        let { isVisible= true, onClose } = this.props;
        return (
            <View style={styles.centeredView}>
                <Text style={styles.text}>Loading...</Text>
            </View>
        )
    }
}


const styles= StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent:'center',
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    text:{
        fontSize:wp("7%"),
        color: 'white',
        fontWeight: 'bold'
    }
});

export default Loading
