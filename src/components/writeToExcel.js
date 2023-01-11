const path = require('path')
const ExcelJS = require("exceljs");
const isMac = process.platform === "darwin";
const isWin = process.platform === "win32";
// let prevExcelLength = 0
// let 
// let excelDate = new Date();
// let date = `${("0" + excelDate.getDate()).slice(-2)}-${("0" + (excelDate.getMonth() + 1)).slice(-2)}-${excelDate.getFullYear()}-${excelDate.getHours()}-${excelDate.getMinutes()}-${excelDate.getSeconds()}`;
const writeToExcel = async (excelDataArr, filenameDate) => {

    try {
        prevExcelLength = excelDataArr.length
        // console.log('checking prev length',prevExcelLength)
        const wifiWorkbook = new ExcelJS.Workbook();

        wifiWorksheet = wifiWorkbook.addWorksheet("wifi_Data");

        wifiWorksheet.columns = [
            { header: `Device_ID`, key: "Device_ID", width: 10 },
            { header: `Step Time`, key: "Step Time", width: 12 },
            { header: `Time Stamp`, key: "Time Stamp", width: 24 },
            { header: `Count`, key: "Count", width: 12 },
            // { header: `Location`, key: "Location", width: 45 },
            { header: `Battery`, key: "Location", width: 10 },
        ];

        // [el.deviceID, el.graphtime, el.RTC, el.count]
        // console.log('checking excellll',excelDataArr)
        // if(prevExcelLength !== excelDataArr.length){
        //     console.log('current length',excelDataArr.length)
        // }

        // excelDataArr?.map(el => {
        //     console.log('checking el =>', el)
        wifiWorksheet.addRow([excelDataArr.device_ID, excelDataArr.timeShorts, excelDataArr.UTCtoISTDate, excelDataArr.countPulse, excelDataArr.battery]);
        wifiWorksheet.eachRow(function (row, rowNumber) {
            row.eachCell(function (cell, colNumber) {
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            });
            // });
            // console.log('checking el', el)

        })

        // console.log('exceldata',excelData)
        if (isWin) {
            await wifiWorkbook.xlsx.writeFile(`${path.parse(process.cwd()).root}Wifi_Based_Logger/${filenameDate}.xlsx`);
        }
        if (isMac) {
            await wifiWorkbook.xlsx.writeFile(`${path.parse(process.cwd()).root}Wifi_Based_Logger\\${filenameDate}.xlsx`);
        }


    } catch (err) {
        console.log('error', err)
    }
}


module.exports = writeToExcel