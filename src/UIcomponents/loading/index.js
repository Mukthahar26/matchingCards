import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, Modal } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export class Loading extends Component {
    render() {
        let { isVisible, onClose } = this.props;
        return (
            <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => { }}
        >
            <View style={styles.container} style={styles.centeredView}>
                <ActivityIndicator size={wp("15%")} color={"red"} />
            </View>
        </Modal>
        )
    }
}


const styles= StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent:'center',
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.7)'
    }
});

export default Loading
