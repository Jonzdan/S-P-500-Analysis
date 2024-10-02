require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const https = require('https')
const cookieParser = require('cookie-parser')
const inputDataLocation = "data"
const fs = require('fs')
const excel = require('node-xlsx')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: "temp",
    name: 'session-id',
    saveUninitialized: false,
    cookie: { maxAge: 1000 },
    resave: false,
}));

app.get('/data', (req, res) => {
    res.status(200).json(
        Object.fromEntries(getTotalReturns())
    )
});

function convertEpochDateToJSDate(currentDateAsNumber) {
    const epochDate = new Date(1899, 11, 30);
    return new Date(epochDate.getTime() + currentDateAsNumber * 24 * 60 * 60 * 1000);
}

function getTotalReturns() {
    let res = new Map();
    let files = fs.readdirSync(inputDataLocation, {withFileTypes: true});
    let fileNames = files
        .filter(item => !item.isDirectory())
        .map(item => item.name);

    for (let fileName of fileNames) {
        let filePath = `${inputDataLocation}\\${fileName}`;
        let workbook = excel.parse(filePath);

        let rawDataObject = workbook.find(item => item.name === 'rawdata');

        if (rawDataObject === undefined) {
            // Error handling
            continue;
        }

        let rawDataObjectData = rawDataObject.data;
        let currentTotalReturn = 1;
        for (let row of rawDataObjectData) {
            let [_, dateAsNum, dailyReturn] = row;
            if (isNaN(dailyReturn) || dailyReturn === undefined) continue;
            let currentDate = convertEpochDateToJSDate(dateAsNum);
            let addOneAsPercentSpace = 1 + (dailyReturn / 100);
            let totalReturn = currentTotalReturn * addOneAsPercentSpace - 1;
            currentTotalReturn *= addOneAsPercentSpace;
            res.set(currentDate, totalReturn);
        }
    }
    return res; 
}
         
app.listen(process.env.PORT || 4000)
