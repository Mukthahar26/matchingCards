import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Easing, Image, requireNativeComponent } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getLevelGameTime, getLevelNoOfCards } from './../../../util/common'
import StarRating from 'react-native-star-rating';
import { vibrate } from './../../../util/common'
export class LevelCard extends Component {

    gotoGame=()=>{
        let { level, isUnlocked, navigation} = this.props;
        let  time = 120;
        let cards = 10
        time = getLevelGameTime(level);
        cards = getLevelNoOfCards(level);
        vibrate();
        isUnlocked && navigation.navigate("game",{level, cards, time})
    }

    render() {
        let { level, isComplete, stars, isUnlocked, navigation } = this.props;
        return (
            <TouchableOpacity onPress={()=> this.gotoGame()} activeOpacity={0.8} style={styles.container}>
                <View style={styles.circle}>
                    { isUnlocked ? <Text style={styles.levelNumber}>{level}</Text> : <Image style={styles.image} resizeMode="contain" source={require("./../../../assets/yellowlock.png")} />}
                    
                </View>
            <View style={styles.starRating}>
            <StarRating
                disabled={true}
                maxStars={3}
                rating={isComplete ? stars : 0}
                starSize={wp("5%")}
                starStyle={{color: isComplete ? '#ffD700' : '#616161'}}
                selectedStar={(rating) => {}}
            />
            </View>
            </TouchableOpacity>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#263952',
        margin: wp("2%"),
        padding:wp("1%"),
        paddingTop: wp("2%"),
        paddingBottom: wp("2%"),
        justifyContent:'center',
        alignItems:'center',
        borderRadius: wp("1%")
    },
    circle:{
        backgroundColor: '#263952',
        borderWidth:3,
        borderColor: "#324f75",
        height: hp("7%"),
        width: hp("7%"),
        borderRadius: hp("7%")/2,
        justifyContent:'center',
        alignItems:'center'
    },
    levelNumber:{
        fontSize:wp("5%"),
        color: 'white',
        fontWeight:'bold'
    },
    image:{
        width:wp("5%")
    },
    starRating:{
        marginTop: hp("2%")
    },
    stars:{
        
    }
})

export default LevelCard
