import React, { Component } from 'react'
import { Text, View, Modal, StyleSheet, Easing, TouchableOpacity, BackHandler } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { getLevelGameTime, getLevelNoOfCards } from './../../../util/common'
import StarRating from 'react-native-star-rating';
import {AdMobBanner} from 'react-native-admob';

export class Winner extends Component {

  constructor(props) {
    super(props);
    this.state = {
        count: 0,
    } 
  }

  componentDidMount(){
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    this.setInterval =setInterval(()=>{
      if(this.state.count===4) clearInterval(this.setInterval)
      this.setState((prev)=>{ return {count: prev.count+1} })
    },1200)
  }

  backAction = () => {
    return true;
  };

  componentWillUnmount(){
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
}

  

    render() {
      let { level, matchingCount, time, star, cards } = this.props.route.params
      let { count } =this.state;
        return (
            <LinearGradient colors={['#fdfcfb', '#e2d1c3', '#e2d1c3']} style={styles.centeredView}>
              { star ? <Animatable.Text animation="rubberBand" easing="ease-out" iterationCount="3" style={[styles.text,styles.winLabel]}>Congratulations</Animatable.Text> 
              : <Text style={[styles.text,styles.winLabel,{color: 'red'}]}>Sorry, you lost the game</Text>}
              <View style={styles.rowContainer}>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
            <StarRating
                disabled={true}
                maxStars={3}
                rating={star}
                starSize={wp("12%")}
                starStyle={{color: '#ffD700'}}
                selectedStar={(rating) => {}}
            />
            
            </Animatable.View>
            
            {count>=1 ?<View style={styles.row}>
              <Text style={styles.text}>Time</Text>
              <Text style={styles.text}>{time}sec</Text>
            </View> : null}
            {count>=2 ?<View style={styles.row}>
              <Text style={styles.text}>Stars</Text>
              <Text style={styles.text}>{star>3 ? "3" : star}</Text>
            </View> : null}
            {count>=3 ? <View style={styles.row}>
              <Text style={styles.text}>Matches</Text>
              <Text style={styles.text}>{matchingCount+"/"+cards}</Text>
            </View> : null}
            </View>
            {count>=4 ? <Animatable.View style={{width: '60%', alignItems:'center', flexDirection:'row', justifyContent: 'space-between'}} animation="rubberBand" easing="ease-out" iterationCount="1">
            <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate('levels')}>
            <MaterialIcons name="apps" size={wp("5%")} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate('game',{level: level})}>
            <Icon name="reload1" size={wp("5%")} color="#FFF" />
          </TouchableOpacity>
              {star ? <TouchableOpacity style={styles.button} onPress={()=>{
                let time = getLevelGameTime(level+1);
                let cards = getLevelNoOfCards(level+1);
                this.props.navigation.navigate('game',{level: level+1, cards,time})
                }}>
              <Entypo name="chevron-small-right" size={wp("5%")} color="#FFF" />
          </TouchableOpacity> : null}
          </Animatable.View> : null} 
          <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', }}>
                    <AdMobBanner
                        adSize="smallBanner"
                        adUnitID="ca-app-pub-8742395058484025/1791921565"
                        // adUnitID="ca-app-pub-3940256099942544/6300978111"
                        // testDeviceID="CF583E54-34C6-453C-80FC-493D2468A51E"
                    />
                </View>
            </LinearGradient>
        )
    }
}

const styles= StyleSheet.create({
    centeredView: {
        flex: 1,
        paddingTop: hp("15%"),
        alignItems: "center",
        backgroundColor: '#27282b'
      },
      rowContainer:{
        backgroundColor: 'rgba(0,0,0,0.9)', 
        width:'70%',
        elevation: 10,
        alignItems:'center',
        height: hp("36%"),
        borderRadius: wp("2%"),
        marginTop: hp("1%"),
        paddingTop: hp("3%")
      },
      row:{
        width:'65%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: hp("3%")
      }, 
      text:{ 
        color: 'white',
        fontSize: wp("3.8%")
      },
      winLabel:{
        fontSize: wp("7%"),
        fontWeight:'bold',
        color: '#697fc9',
        marginBottom: hp("1%")
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
