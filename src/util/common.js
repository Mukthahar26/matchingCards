import { Vibration } from 'react-native'

//============================== Easy ============================
export const getLevelNoOfCards=(level)=>{

    if(global.difficultyMode==="EASY"){
        let cards = 10; //complete
        if(level>10 && level<=20) cards = 15 //complete
        if(level>20 && level<=30) cards = 15 //complete
        return cards;
    }
   else if(global.difficultyMode==="NORMAL"){
        let cards = 15; //complete
        if(level>10 && level<=20) cards = 20 //complete
        if(level>20 && level<=30) cards = 20 //complete
        return cards;
    }
    else if(global.difficultyMode==="HARD"){
        let cards = 20; //complete
        if(level>10 && level<=20) cards = 30
        if(level>20 && level<=30) cards = 30
        return cards;
    }
    
}
//=================================================
export const getLevelGameTime=(level)=>{
    if(global.difficultyMode==="EASY"){
        let time = 120;     //complete
        if(level>10 && level<=20) time = 160 //complete 
        if(level>20 && level<=30) time=160 //complete
        return time;
    }
   else if(global.difficultyMode==="NORMAL"){
    let time = 160; //complete
    if(level>10 && level<=20) time = 360   //complete
    if(level>20 && level<=30) time=360  //complete
    return time;
    }
    else if(global.difficultyMode==="HARD"){
        let time = 360; //complete 360
        if(level>10 && level<=20) time = 600
        if(level>20 && level<=30) time=600
        return time;
    }   
}

export const noOfStarByTime=(totalTime, completedTime)=>{
    let parts = Math.floor(totalTime/3);
    if(completedTime<=parts) return 3;
    else if(completedTime<=(parts*2)) return 2;
    else if(completedTime<=(parts*3)) return 1;
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