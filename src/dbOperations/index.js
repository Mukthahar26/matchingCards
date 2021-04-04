var SQLite = require('react-native-sqlite-storage')


const getTableByMode=()=>{
    if(global.difficultyMode==="EASY") return "easyModeLevels"
    else if(global.difficultyMode==="NORMAL") return "normalModeLevels"
    else if(global.difficultyMode==="HARD") return "hardModeLevels"
}


const dbConnections = () => {
    const db = SQLite.openDatabase({
        name: "matchingCardsDB",
        createFromLocation: 1
    },
        () => { console.log("success") },
        error => {
            console.log("failed", error)
        }
    );
    return db;
}

const getRatings = async (p) => {
    let db = dbConnections();
    return new Promise((resolve, reject) => {
        db.transaction((txn) => {
            txn.executeSql(`select *from ${getTableByMode()}`, [], (tx, results) => {
                let array = [];
                const rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                    array.push(rows.item(i));
                }
                resolve(array);
                
            }, (error) => console.log(error))
        });
    });
}


const insertRating = async (p) => {
    let db = dbConnections();
    return new Promise((resolve, reject) => {
        db.transaction((txn) => {
            txn.executeSql(`update ${getTableByMode()} set stars=?, isComplete=?, isUnlocked=? where level=? `, [p.star, 1, 1, p.level], (tx, results) => {
                txn.executeSql(`update ${getTableByMode()} set isUnlocked=? where level=?`, [1, p.level+1], (tx, results) => {
                    txn.executeSql(`select *from ${getTableByMode()}`, [], (tx, results) => {
                        let array = [];
                        const rows = results.rows;
                        for (let i = 0; i < rows.length; i++) {
                            array.push(rows.item(i));
                        }
                        global.isLevelrequiredLoading = true
                        resolve(array);
                    }, (error) => console.log(error))
                }, (error) => console.log(error))
            }, (error) => console.log(error))
        });
    });
}

const unlockNextLevel = async (p) => {
    let db = dbConnections();
    return new Promise((resolve, reject) => {
        db.transaction((txn) => {
            txn.executeSql(`update ${getTableByMode()} set isUnlocked=? where level=?`, [1, p.level+1], (tx, results) => {
                resolve(true);
            }, (error) => console.log(error))
        });
    });
}



export {
    getRatings,
    insertRating,
    unlockNextLevel
}
