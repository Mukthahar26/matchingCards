import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image, Vibration } from 'react-native'
import { GameInstructions, FlipCard, Settings, Winner } from './../../Screencomponents'
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES, shuffle } from './../../../util/imagesList'
import { insertRating, unlockNextLevel } from './../../../dbOperations'

const TIME = 120
export class Game extends Component {
    constructor(props){
        super(props);
        this.state={
            timer:TIME,
            minutes: 0,
            seconds: 0,
            flippedId: -1,
            gameImages:[],
            lastClickedIndex: -1,
            matchingCount: 0,
            isSettingsVisible: false,
            isWinnerVisible: true
        }
        this.childRef= []
    }

    componentDidMount(){
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                timer:TIME,
                minutes: 0,
                seconds: 0,
                flippedId: -1,
                gameImages:[],
                lastClickedIndex: -1,
                matchingCount: 0,
                isSettingsVisible: false,
                isWinnerVisible: true
            })
            let arr = shuffle(IMAGES());
            let a = JSON.parse(JSON.stringify(arr.slice(0,10)))
            let b = JSON.parse(JSON.stringify(arr.slice(0,10)))
            let all = [...a, ...b]
        
            this.setState({ gameImages: shuffle(all)})
            this.setTimer();
        });
    }

    setTimer=()=>{
        this.timer = setInterval(()=> {
            if(this.state.timer===0){
                clearInterval(this.timer)
            }
            var minutes = Math.floor(this.state.timer / 60);
            var seconds = this.state.timer - minutes * 60;
            this.setState({timer: this.state.timer-1, minutes, seconds })
        },1000)
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    flipped=(id, index)=>{
        let { flippedId, gameImages, lastClickedIndex, matchingCount, minutes, seconds } = this.state;
        let { level } = this.props.route.params
        let temp = [...gameImages];
        
        Vibration.vibrate(50,500,50)
        if(!temp[index].isOpen){
            temp[index].isOpen = true
            if(flippedId!==-1 && lastClickedIndex!==index){
                if(flippedId===id){
                    this.setState({ matchingCount: matchingCount+1, flippedId: -1, lastClickedIndex: -1, gameImages: temp },()=>{
                        console.log("sssssssssssssssss :", this.state.matchingCount)
                        if(this.state.matchingCount===10){
                            insertRating({star:3, level})
                            clearInterval(this.timer)
                            this.props.navigation.navigate('winner',{level, matchingCount: this.state.matchingCount, time: minutes +":"+seconds })
                        }
                    })
                }else{
                    if(lastClickedIndex>-1) temp[lastClickedIndex].isOpen= false;
                    this.setState({ flippedId: id, lastClickedIndex: index, gameImages: temp })
                }
                
            }else{
                this.setState({ flippedId: id, lastClickedIndex: index })
            }
        }
    }

    render() {
        let { timer, gameImages, matchingCount, isSettingsVisible, isWinnerVisible, minutes, seconds } = this.state;
        let level = this.props.route.params.level
        console.log("gameImages ", isSettingsVisible, isWinnerVisible, matchingCount, level)
    
        return (
            <LinearGradient colors={['#fdfcfb', '#e2d1c3', '#e2d1c3']} style={styles.container}>
                <Settings isVisible = {isSettingsVisible} onClose={()=> this.setState((prev)=> { return{ isSettingsVisible: !prev.isSettingsVisible}}) } />
                
                <View style={{flex:10}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={styles.text}>Level: {level}</Text>
                        <View style={{flexDirection:'row', marginLeft: wp("-14%"), alignItems:'center'}}>
                            <Image style={{width:wp("5%"), height:wp("5%"), marginRight:10}} resizeMode="contain" source={require("./../../../assets/clock.png")} />
                            <Text style={{...styles.text}}>{ minutes +":"+seconds }</Text>
                        </View>
                        <TouchableOpacity onPress={()=> this.setState((prev)=> {return{ isSettingsVisible: !prev.isSettingsVisible} })} >
                            <Icon name="settings" size={wp("5%")} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{marginTop: hp("2%")}}>Matches: {matchingCount}</Text>
                    </View>
                </View>
                <View style={{flex:90}}>
                    <FlatList
                        data={gameImages}
                        numColumns={5}
                        columnWrapperStyle={{flex:1, justifyContent:'center', marginBottom:wp("1.5%")}}
                        renderItem={({item, index})=>
                        !item.isOpen ? <TouchableOpacity activeOpacity={1} style={{flex:1, justifyContent:'space-between', alignSelf:'center'}} onPress={()=> this.flipped(item.id, index)}><Image style={styles.image} resizeMode="contain" source={require("./../../../assets/balbblack.png")} /></TouchableOpacity> : <TouchableOpacity activeOpacity={1} style={{flex:1, justifyContent:'space-between', alignSelf:'center'}} onPress={()=> this.flipped(item.id, index)}><Image style={styles.image} resizeMode="center" source={{uri: item.image}} /></TouchableOpacity>
                    }
                        keyExtractor={(item,index)=> index.toString()}
                    />
                </View>
            </LinearGradient>
        )
    }
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:wp("3%")
    },
    cardContainer:{
        flex:1
    },
    card:{
        height: 100,
        width:"100%",
    },
    image:{
        height: hp("13%"),
        width: hp("13%")
    },
    face:{
        backgroundColor:'red'
    },
    back:{
        backgroundColor:'yellow'
    },
    text:{
        fontSize: wp("4%"),
        fontWeight:'bold'
    },
    imageFlip:{
        width: 50,
        height:50
    },
    imagecontainer:{
        flex:1,
        
        margin: wp("2%"),
        justifyContent:'center',
        alignItems:'center',
        borderRadius: wp("1%")
    }
})

export default Game
