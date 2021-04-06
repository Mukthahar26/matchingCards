import React, { Component } from 'react'
import { Text, View, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';


export class DialogueBox extends Component {

  constructor(props){
    super(props);
    this.state={
      
    }
  }


  render() {
    let { isVisible, no, yes, title, message } = this.props;
    return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => { no() }}
        >
        <View style={styles.container} style={styles.centeredView}>      
          <LinearGradient colors={['#e2d1c3', '#e2d1c3', '#e2d1c3']} style={styles.subView}>
            <Text style={[styles.text,{marginLeft:wp("2%"), fontSize: wp("5%")}]}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={()=> no()}>
              <Text style={styles.text}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>{
              no();
              yes();
          }}>
              <Text style={styles.text}>Yes</Text>
          </TouchableOpacity>
            </View>
            
          </LinearGradient>
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
      backgroundColor: 'rgba(0,0,0,0.9)'
    },
    subView:{
      width: '85%',
      backgroundColor: '#638ec9',
      elevation: 10,
      borderRadius: wp("1%"),
      paddingTop: hp("2%"),
      paddingBottom: hp("2%"),
      borderWidth:2,
      borderColor: 'white'
    },
    text:{
      color: '#3d3d40',
      fontSize: wp("3.5%"),
      fontWeight: 'bold'
    },
    message:{
        fontSize:wp('4%'),
        margin:wp("3%"),
        lineHeight:wp("6%")
    },
    row:{
      backgroundColor:'#e2d1c3',
      flexDirection:'row',
      justifyContent:'space-between',
      margin: wp("4%"),
      marginTop: hp("0.7%"),
      marginBottom: hp("0.7%"),
      padding: wp("3%"),
      paddingLeft: wp("5%"),
      paddingRight: wp("5%"),
      elevation:10,
      borderRadius: wp("1.5%"),
      borderWidth:2,
      borderColor: 'white'
    },
    button:{
      width: wp("30%"),
      backgroundColor:'#e2d1c3',
      height: hp("5%"),
      borderRadius: hp("6%")/2,
      justifyContent:'center',
      alignItems:'center',
      elevation:10,
      borderWidth:2,
      borderColor: 'white'
    },
    buttonContainer:{
        marginTop: hp("2%"),
        flexDirection:'row',
        justifyContent:'space-around'
    }
  })

export default DialogueBox
