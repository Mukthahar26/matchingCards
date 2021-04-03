var SQLite = require('react-native-sqlite-storage')
import global from './../global'




const dbConnections = () => {
    const db = SQLite.openDatabase({
        name: 'matchingCardsDB',
        createFromLocation: 1
    },
        () => { console.log("success") },
        error => {
            console.log("failed")
        }
    );
    return db;
}

const getRatings = async (p) => {
    let db = dbConnections();
    return new Promise((resolve, reject) => {
        db.transaction((txn) => {
            txn.executeSql('select *from levelRatings', [], (tx, results) => {
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
            txn.executeSql('update levelRatings set stars=?, isComplete=?, isUnlocked=? where level=? ', [p.star, 1, 1, p.level], (tx, results) => {
                txn.executeSql('update levelRatings set isUnlocked=? where level=?', [1, p.level+1], (tx, results) => {
                    txn.executeSql('select *from levelRatings', [], (tx, results) => {
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
            txn.executeSql('update levelRatings set isUnlocked=? where level=?', [1, p.level+1], (tx, results) => {
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
