const fs = require('fs/promises')
const fns = require('date-fns')
async function createLog(){
    data = {
        date_time: new Date(),
        log_total: [],
        log_succee: [],
        log_fail: [],
        total: 0,
        succee: 0,
        fail: 0
    }
}
async function writeLog(){
    let result ;
    // result.log_total = 
}
/*
{
    "date_time": "21_03_2023",
    "log": [],
    "total": "10",
    "succee": "10",
    "fail": "0"
}
*/
console.log(new Date())