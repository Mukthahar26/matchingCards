import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image, BackHandler, Alert } from 'react-native'
import { Settings } from './../../Screencomponents'
import { DialogueBox } from './../../../UIcomponents'
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES, shuffle } from './../../../util/imagesList'
import { insertRating } from './../../../dbOperations'
import { vibrate } from './../../../util/common'
const TIME = 120
export class Game extends Component {
    constructor(props){
        super(props);
        this.state={
            timer:this.props.route.params.time,
            minutes: 0,
            seconds: 0,
            flippedId: -1,
            gameImages:[],
            lastClickedIndex: -1,
            matchingCount: 0,
            isSettingsVisible: false,
            openCloseBox : false
        }
        this.childRef= []
    }

    componentDidMount(){
        // this.props.navigation.navigate('winner',{level:3, star:3, cards:10, matchingCount: 10, time: 170 })
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                timer:this.props.route.params.time,
                minutes: 0,
                seconds: 0,
                flippedId: -1,
                gameImages:[],
                lastClickedIndex: -1,
                matchingCount: 0,
                isSettingsVisible: false,
                openCloseBox: false
            })
            let cards = this.props.route.params.cards
            let arr = shuffle(IMAGES());
            let a = JSON.parse(JSON.stringify(arr.slice(0,cards)))
            let b = JSON.parse(JSON.stringify(arr.slice(0, cards)))
            let all = [...a, ...b]
        
            this.setState({ gameImages: shuffle(all)})
            this.setTimer();
        });
    }

    setTimer=()=>{
        let { level, time } = this.props.route.params
        this.timer = setInterval(()=> {
            if(this.state.timer===0){
                this.props.navigation.navigate('winner',{level, star:0, matchingCount: this.state.matchingCount, time })
                clearInterval(this.timer)
            }
            var minutes = Math.floor(this.state.timer / 60);
            var seconds = this.state.timer - minutes * 60;
            this.setState({timer: this.state.timer-1, minutes, seconds })
        },1000)
    }

    componentWillUnmount(){
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
        this.unsubscribe();
    }

    backAction = () => {
        this.setState({ openCloseBox: true})
        return true;
      };
    

    flipped=(id, index)=>{
        let { flippedId, gameImages, lastClickedIndex, matchingCount, timer, minutes, seconds } = this.state;
        let { level, cards } = this.props.route.params
        let temp = [...gameImages];
        console.log("oooooooooooo :", global.isVibrationOn)
        vibrate();
        if(!temp[index].isOpen){
            temp[index].isOpen = true
            if(flippedId!==-1 && lastClickedIndex!==index){
                if(flippedId===id){
                    this.setState({ matchingCount: matchingCount+1, flippedId: -1, lastClickedIndex: -1, gameImages: temp },()=>{
                        if(this.state.matchingCount===cards){
                            let star = Math.floor(TIME/(TIME-timer));
                            insertRating({star, level})
                            clearInterval(this.timer)
                            this.props.navigation.navigate('winner',{level, star, cards, matchingCount: this.state.matchingCount, time: TIME-timer })
                            
                            this.setState({
                                timer:TIME,
                                minutes: 0,
                                seconds: 0,
                                flippedId: -1,
                                gameImages:[],
                                lastClickedIndex: -1,
                                matchingCount: 0,
                                isSettingsVisible: false,
                                openCloseBox:false
                            })
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
        let { timer, gameImages, matchingCount, isSettingsVisible, openCloseBox, minutes, seconds } = this.state;
        let {level, cards} = this.props.route.params

        return (
            <LinearGradient colors={['#fdfcfb', '#e2d1c3', '#e2d1c3']} style={styles.container}>
                {isSettingsVisible ? <Settings isVisible = {isSettingsVisible} onClose={()=> this.setState((prev)=> { return{ isSettingsVisible: !prev.isSettingsVisible}}) } /> : null}
                <DialogueBox title={"Hold On!"} message={"Are you sure you want to exit from the game?"} isVisible={openCloseBox} no={()=> this.setState({ openCloseBox : !openCloseBox})} yes={()=>this.props.navigation.goBack(null)} />
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
                        <Text style={{marginTop: hp("2%")}}>Matches: {matchingCount+"/"+cards}</Text>
                    </View>
                </View>
                <View style={{flex:90}}>
                    <FlatList
                        data={gameImages}
                        numColumns={5}
                        columnWrapperStyle={{flex:1, justifyContent:'center', marginBottom:wp("1%")}}
                        renderItem={({item, index})=> 
                        !item.isOpen ? <TouchableOpacity style={styles.cardbtn} activeOpacity={1} onPress={()=> this.flipped(item.id, index)}><Image style={styles.image} resizeMode="contain" source={require("./../../../assets/starCard.jpg")} /></TouchableOpacity> : <TouchableOpacity activeOpacity={1} style={{...styles.cardbtn, backgroundColor:'white'}} onPress={()=> this.flipped(item.id, index)}><Image style={styles.image} resizeMode="center" source={{uri: item.image}} /></TouchableOpacity>
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
    cardbtn:{
        flex: 1,
        alignItems:'center',
        marginLeft: wp("0.5"),
        marginRight: wp("0.5")
    },
    image:{
        height: hp("9%"),
        width: hp("9%"),
    },
    text:{
        fontSize: wp("4%"),
        fontWeight:'bold'
    }
})

export default Game
