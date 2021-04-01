import React, { Component } from 'react'
import { Text, View, Modal, StyleSheet, Easing, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomizedStarRating from 'react-native-customized-star-rating';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

export class Winner extends Component {

  constructor(props) {
    super(props);
    this.state = {
        count: 0,
    } 
  }

  componentDidMount(){
    this.setInterval =setInterval(()=>{
      this.setState((prev)=>{ return {count: prev.count+1} })
    },1200)
  }

  componentWillUnmount(){
      
  }

    render() {
      let { isVisible, onClose, navigationToLevels, navigationToNextGame } = this.props;
      let { count } =this.state;
        return (
            <LinearGradient colors={['#fdfcfb', '#e2d1c3', '#e2d1c3']} style={styles.container} style={styles.centeredView}>
              <Animatable.Text animation="rubberBand" easing="ease-out" iterationCount="3" style={[styles.text,styles.winLabel]}>Congratulations</Animatable.Text>
              <View style={styles.rowContainer}>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
                <CustomizedStarRating
                noOfStars={'3'}
                starRowStyle={styles.starRowStyle}
                starSizeStyle={styles.starSizeStyle}
                selectedStar={2}
                starAnimationScale={2.15}
                animationDuration={1000} 
                easingType={Easing.easeInCirc}
                emptyStarImagePath={require('./../../../assets/emptystar.png')}
                filledStarImagePath={require('./../../../assets/star.png')}
                onClickFunc={(i) => {}}
            />
            
            </Animatable.View>
            
            {count>=1 ?<View style={styles.row}>
              <Text style={styles.text}>Time</Text>
              <Text style={styles.text}>00:20</Text>
            </View> : null}
            {count>=2 ?<View style={styles.row}>
              <Text style={styles.text}>Stars</Text>
              <Text style={styles.text}>2</Text>
            </View> : null}
            {count>=3 ? <View style={styles.row}>
              <Text style={styles.text}>Matches</Text>
              <Text style={styles.text}>10/10</Text>
            </View> : null}
            </View>
            {count>=4 ? <Animatable.View style={{width: '60%', alignItems:'center', flexDirection:'row', justifyContent: 'space-between'}} animation="rubberBand" easing="ease-out" iterationCount="1">
            <TouchableOpacity style={styles.button} onPress={()=> navigationToLevels()}>
            <MaterialIcons name="apps" size={wp("5%")} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> alert("aaaaaaaaaaaaaaa")}>
            <Icon name="reload1" size={wp("5%")} color="#FFF" />
          </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=> navigationToNextGame()}>
              <Entypo name="chevron-small-right" size={wp("5%")} color="#FFF" />
          </TouchableOpacity>
          
            </Animatable.View> : null}
            </LinearGradient>
        )
    }
}

const styles= StyleSheet.create({
    centeredView: {
        flex: 1,
        paddingTop: hp("30%"),
        alignItems: "center",
        backgroundColor: '#27282b'
      },
      starRowStyle:{
        flexDirection:'row'
      },
      starSizeStyle:{
        width:wp("15%"),
        height:wp("15%")
      },
      subView:{
        backgroundColor: 'white',
        width: '85%',
        borderRadius: wp("1%")
      },
      rowContainer:{
        backgroundColor: 'rgba(0,0,0,0.9)', 
        width:'70%',
        elevation: 10,
        alignItems:'center',
        height: hp("30%"),
        borderRadius: wp("2%"),
        marginTop: wp("3%"),
        paddingTop: wp("4%")
      },
      row:{
        width:'65%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: wp("6%")
      },
      text:{
        color: 'white'
      },
      winLabel:{
        fontSize: wp("7%"),
        fontWeight:'bold',
        color: '#697fc9',
        marginBottom: wp("4%")
      },
      button:{
        width: hp("6%"),
        backgroundColor:'#638ec9',
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

export default Winner