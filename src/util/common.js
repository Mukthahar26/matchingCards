import { Vibration } from 'react-native'
import Sound from 'react-native-sound';

//============================== Easy ============================
export const getEasyLevelNoOfCards=(level)=>{
    let cards = 10;
    if(level>10 && level<=20) cards = 15
    if(level>20 && level<=30) cards = 15
    return cards;
}

export const getEasyLevelGameTime=(level)=>{
    let time = 120;
    if(level>10 && level<=20) time = 160
    if(level>20 && level<=30) time=160
    return time;
}


//============================== Normal ============================
export const getNormalLevelNoOfCards=(level)=>{
    let cards = 15;
    if(level>10 && level<=20) cards = 20
    if(level>20 && level<=30) cards = 20
    return cards;
}

export const getNormalLevelGameTime=(level)=>{
    let time = 120;
    if(level>10 && level<=20) time = 160
    if(level>20 && level<=30) time=160
    return time;
}

//============================== Hard ============================
export const getHardLevelNoOfCards=(level)=>{
    let cards = 20;
    if(level>10 && level<=20) cards = 30
    if(level>20 && level<=30) cards = 30
    return cards;
}


export const getHardLevelGameTime=(level)=>{
    let time = 140;
    if(level>10 && level<=20) time = 170
    if(level>20 && level<=30) time=170
    return time;
}


export const vibrate=()=>{
    if(global.isVibrationOn) Vibration.vibrate(50,1000,50)
}



// insert into hardModeLevels values(1,0,0,1);
// insert into hardModeLevels values(2,0,0,0);
// insert into hardModeLevels values(3,0,0,0);
// insert into hardModeLevels values(4,0,0,0);
// insert into hardModeLevels values(5,0,0,0);
// insert into hardModeLevels values(6,0,0,0);
// insert into hardModeLevels values(7,0,0,0);
// insert into hardModeLevels values(8,0,0,0);
// insert into hardModeLevels values(9,0,0,0);
// insert into hardModeLevels values(10,0,0,0);
// insert into hardModeLevels values(11,0,0,0);
// insert into hardModeLevels values(12,0,0,0);
// insert into hardModeLevels values(13,0,0,0);
// insert into hardModeLevels values(14,0,0,0);
// insert into hardModeLevels values(15,0,0,0);
// insert into hardModeLevels values(16,0,0,0);
// insert into hardModeLevels values(17,0,0,0);
// insert into hardModeLevels values(18,0,0,0);
// insert into hardModeLevels values(19,0,0,0);
// insert into hardModeLevels values(20,0,0,0);
// insert into hardModeLevels values(21,0,0,0);
// insert into hardModeLevels values(22,0,0,0);
// insert into hardModeLevels values(23,0,0,0);
// insert into hardModeLevels values(24,0,0,0);
// insert into hardModeLevels values(25,0,0,0);
// insert into hardModeLevels values(26,0,0,0);
// insert into hardModeLevels values(27,0,0,0);
// insert into hardModeLevels values(28,0,0,0);
// insert into hardModeLevels values(29,0,0,0);
// insert into hardModeLevels values(30,0,0,0);