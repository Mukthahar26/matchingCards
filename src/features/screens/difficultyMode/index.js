import React, { Component } from 'react'
import { Text, View, Appearance, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
//import global from './../../../global'
const colorScheme = Appearance.getColorScheme();


const EASY= "EASY";
const NORMAL="NORMAL";
const HARD ="HARD"
const VERYHARD = "VERYHARD"

// dark mode #434343  #000000
export class DifficultyMode extends Component {

    constructor(props){
        super(props);
        this.state={
            easyAnimation: "",
            normalAnimation: "",
            hardAnimation: "",
            veryHardAnimation: "",
        }
    }

    componentDidMount(){
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                easyAnimation: "",
                normalAnimation: "",
                hardAnimation: "",
                veryHardAnimation: "",
            })
          });
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    goToLevel=async(mode)=>{
        global.difficultyMode = mode
        if(mode===EASY) this.setState({easyAnimation: "bounceIn"});
        else if(mode===NORMAL) this.setState({normalAnimation: "bounceIn"});
        else if(mode===HARD) this.setState({hardAnimation: "bounceIn"});
        else if(mode===VERYHARD) this.setState({veryHardAnimation: "bounceIn"});
        console.log("qqqqqqqqqqqqqqqqqqq :", global.difficultyMode, mode)
        setTimeout(()=> this.props.navigation.navigate('levels',{mode}),400)
        
    }

    render() {
        let { easyAnimation, normalAnimation, hardAnimation, veryHardAnimation } = this.state;
        return (
            <LinearGradient colors={['#fdfcfb', '#e2d1c3', '#e2d1c3']} style={styles.container}>
                <Animatable.Text animation="flipInY" style={styles.title}>Difficulty Mode</Animatable.Text>
                <TouchableOpacity style={{width:'80%'}}  onPress={()=>this.goToLevel(EASY) } >
                    <Animatable.View animation={easyAnimation} style={styles.button}>
                        <Text style={styles.btnText}>Easy</Text>
                    </Animatable.View>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'80%'}}  onPress={()=> this.goToLevel(NORMAL) } >
                    <Animatable.View animation={normalAnimation} style={styles.button}>
                        <Text style={styles.btnText}>Normal</Text>
                    </Animatable.View>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'80%'}}  onPress={()=> this.goToLevel(HARD) } >
                    <Animatable.View animation={hardAnimation} style={styles.button}>
                        <Text style={styles.btnText}>Hard</Text>
                    </Animatable.View>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{width:'80%'}}  onPress={()=> this.goToLevel(VERYHARD) }>
                    <Animatable.View animation={veryHardAnimation} style={styles.button}>
                        <Text style={styles.btnText}>Very Hard</Text>
                    </Animatable.View>
                </TouchableOpacity> */}
            </LinearGradient>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        marginTop: hp("-10%"),
        marginBottom: hp("10%"),
        fontSize: wp("8%"),
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontStyle: 'italic'
    },
    button:{
        //width: '70%',
        backgroundColor:'#638ec9',
        height: hp("6%"),
        borderRadius: hp("6%")/2,
        justifyContent:'center',
        alignItems:'center',
        marginTop: hp("3"),
        elevation:10,
        borderWidth:2,
        borderColor: 'white'
    },
    
    btnText:{
        color: "#FFFFFF",
        fontSize: wp("3.5%")
    }
})

export default DifficultyMode
