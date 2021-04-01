import React, { Component } from 'react'
import { Text, View, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { GradientSwitch, DarkModeSwitch } from './../../../UIcomponents'
import * as Animatable from 'react-native-animatable';


export class Settings extends Component {

  constructor(props){
    super(props);
    this.state={
      isSoundOn: true,
      isDarkOn: true
    }
  }


  onSoundChange=()=>{
    //alert("fdjskjf")
    this.setState((prev)=>{
      return {
        isSoundOn : !prev.isSoundOn
      }
    })
  }
  onDarkModeChange=()=>{
    this.setState((prev)=>{
      return {
        isDarkOn : !prev.isDarkOn
      }
    })
  }

  render() {
    let { isSoundOn, isDarkOn } = this.state;
    let { isVisible, onClose } = this.props;
    return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => { onClose(); }}
        >
        <View style={styles.container} style={styles.centeredView}>      
          <LinearGradient colors={['#e2d1c3', '#e2d1c3', '#e2d1c3']} style={styles.subView}>
            <Text style={[styles.text,{alignSelf: 'center', fontSize: wp("5%"), marginBottom: hp("1.5%")}]}>Settings</Text>
            <View style={styles.row}>
              <Text style={styles.text}>Sound</Text>
              <TouchableOpacity activeOpacity={1} onPress={()=> this.onSoundChange()}>
            <GradientSwitch
            size={wp("12%")}
            value={isSoundOn}
            onChange={() => {}}
            animationSpeed={"fast"}
            elevation={10}
            knobColor={"white"}
            fontSize={wp("2%")}
            activeGradientColors={["#38ef7d", "#11998e"]}
            inActiveGradientColors={["#777", "#434343"]}
          />  
            </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Vibration</Text>
              <TouchableOpacity activeOpacity={1} onPress={()=> this.change()}>
            <GradientSwitch
            size={wp("12%")}
            value={true}
            onChange={() =>{}}
            animationSpeed={"fast"}
            elevation={10}
            knobColor={"white"}
            fontSize={wp("2%")}
            activeGradientColors={["#38ef7d", "#11998e"]}
            inActiveGradientColors={["#777", "#434343"]}
          />  
            </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Dark Mode</Text>
              <TouchableOpacity activeOpacity={1} onPress={()=> this.onDarkModeChange()}>
              <GradientSwitch
            size={wp("12%")}
            value={isDarkOn}
            onChange={() =>{}}
            animationSpeed={"fast"}
            elevation={10}
            knobColor={"#dcdde0"}
            knobColor={"white"}
            fontSize={wp("2%")}
            activeGradientColors={["#000", "#000"]}
            inActiveGradientColors={["#c0c0c2", "#c0c0c2"]}
          /> 
            </TouchableOpacity>
            </View>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
            <TouchableOpacity style={styles.button} onPress={()=> onClose()}>
              <Text style={styles.text}>Close</Text>
          </TouchableOpacity>
            </Animatable.View>
            
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
      width: wp("40%"),
      backgroundColor:'#e2d1c3',
      alignSelf:'center',
      height: hp("6%"),
      borderRadius: hp("6%")/2,
      justifyContent:'center',
      alignItems:'center',
      marginTop: hp("3"),
      elevation:10,
      borderWidth:2,
      borderColor: 'white'
    }
  })

export default Settings
